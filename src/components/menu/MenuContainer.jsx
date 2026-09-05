import { lazy, memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaImage, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import {
  blurLoad,
  menuItemVariants,
  spring,
  springSoft,
  tapEffect,
  useIsMobile,
  viewportOnce,
} from '../../animations/motionVariants';

const Modal = lazy(() => import('../common/Modal'));
const WHATSAPP_NUMBER = '970594804807';
const menuCache = new Map();

function isValidMenu(data) {
  return Boolean(
    data
    && typeof data === 'object'
    && Array.isArray(data.categories)
    && data.categories.every((category) => (
      category
      && typeof category.name === 'string'
      && Array.isArray(category.items)
      && category.items.every((item) => (
        item
        && typeof item.name === 'string'
        && (typeof item.price === 'number' || typeof item.price === 'string')
      ))
    ))
  );
}

const MenuItem = memo(({ item, onSelect, formatPrice, index, isMobile }) => (
  <motion.button
    type="button"
    className="menu-item-card"
    onClick={() => onSelect(item)}
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce(isMobile)}
    variants={menuItemVariants(isMobile)}
    whileHover={isMobile ? undefined : {
      y: -2,
      backgroundColor: 'rgba(216, 174, 94, 0.055)',
      transition: springSoft,
    }}
    whileTap={tapEffect}
    aria-label={`${item.name} - ${formatPrice(item.price)}`}
  >
    <span className="menu-item-info"><strong>{item.name}</strong></span>
    <span className="menu-item-price">{formatPrice(item.price)}</span>
  </motion.button>
));

const CategoryBlock = memo(({ category, onSelect, formatPrice, categoryIndex, isMobile }) => (
  <motion.section
    className="category-block"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewportOnce(isMobile)}
    transition={{ delay: categoryIndex * (isMobile ? 0.03 : 0.06), ...spring }}
    aria-labelledby={`category-${category.id}`}
  >
    <h2 id={`category-${category.id}`} className="category-title">{category.name}</h2>
    <div className="items-grid">
      {category.items.map((item, index) => (
        <MenuItem
          key={item.id}
          item={item}
          onSelect={onSelect}
          formatPrice={formatPrice}
          index={index}
          isMobile={isMobile}
        />
      ))}
    </div>
  </motion.section>
));

function MenuContainer() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  useEffect(() => {
    const cachedMenu = menuCache.get(language);
    if (cachedMenu) {
      setMenuData(cachedMenu);
      setLoading(false);
      setError(false);
      return undefined;
    }

    const controller = new AbortController();
    const menuFile = language === 'ar' ? '/data/menu.json' : '/data/menu-en.json';
    setLoading(true);
    setError(false);

    fetch(menuFile, { signal: controller.signal, credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw new Error('Menu request failed');
        return response.json();
      })
      .then((data) => {
        if (!isValidMenu(data.restaurant)) throw new Error('Invalid menu data');
        menuCache.set(language, data.restaurant);
        setMenuData(data.restaurant);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setMenuData(null);
          setError(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [language]);

  const formatPrice = useCallback((price) => {
    const value = String(price).trim();
    return value.includes('₪') ? value : `${value} ₪`;
  }, []);

  const orderUrl = useMemo(() => {
    if (!selectedItem) return '';
    const message = language === 'ar'
      ? `مرحبًا، أريد طلب: ${selectedItem.name} - ${formatPrice(selectedItem.price)}`
      : `Hello, I would like to order: ${selectedItem.name} - ${formatPrice(selectedItem.price)}`;
    const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
    url.searchParams.set('text', message);
    return url.toString();
  }, [selectedItem, language, formatPrice]);

  if (loading) {
    return (
      <div className="loading-spinner" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p>{t('loadingMenu')}</p>
      </div>
    );
  }

  if (error || !menuData) {
    return <p className="error-message" role="alert">{t('menuLoadError')}</p>;
  }

  return (
    <>
      {menuData.categories.map((category, index) => (
        <CategoryBlock
          key={category.id}
          category={category}
          onSelect={setSelectedItem}
          formatPrice={formatPrice}
          categoryIndex={index}
          isMobile={isMobile}
        />
      ))}

      {menuData.note && <p className="menu-note-display">{menuData.note}</p>}

      {selectedItem && (
        <Suspense fallback={null}>
          <Modal
            onClose={() => setSelectedItem(null)}
            ariaLabel={selectedItem.name}
            closeLabel={t('closeModal')}
          >
            {selectedItem.image ? (
              <motion.img
                src={`/${selectedItem.image}`}
                alt={selectedItem.name}
                loading="lazy"
                decoding="async"
                variants={blurLoad}
                initial="hidden"
                animate="visible"
              />
            ) : (
              <div className="modal-image-placeholder">
                <FaImage aria-hidden="true" />
                <span>{t('imageUnavailable')}</span>
              </div>
            )}

            <div className="gallery-modal-info">
              <h2>{selectedItem.name}</h2>
              <div className="gallery-modal-price">{formatPrice(selectedItem.price)}</div>
              <motion.a
                href={orderUrl}
                className="gallery-order-btn"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={tapEffect}
                transition={springSoft}
              >
                <FaWhatsapp aria-hidden="true" />
                <span>{t('orderViaWhatsApp')}</span>
              </motion.a>
            </div>
          </Modal>
        </Suspense>
      )}
    </>
  );
}

export default memo(MenuContainer);
