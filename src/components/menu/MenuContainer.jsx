import { useState, useEffect, useCallback, memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { menuItemVariants, spring, springSoft, tapEffect, blurLoad, useIsMobile, viewportOnce } from '../../animations/motionVariants';

// ⚡ Lazy Loading للمودال (لا يحمل إلا عند الحاجة)
const Modal = lazy(() => import('../common/Modal'));

// ⚡ مكون العنصر الواحد - memo يمنع إعادة تصيير كل العناصر
const MenuItem = memo(({ item, onSelect, formatPrice, index, isMobile }) => (
  <motion.div 
    className="menu-item-card" 
    onClick={() => onSelect(item)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce(isMobile)}
    variants={menuItemVariants(isMobile)}
    whileHover={isMobile ? {} : { x: 5, backgroundColor: '#fff', transition: springSoft }}
    whileTap={tapEffect}
  >
    <div className="menu-item-info">
      <h4>{item.name}</h4>
    </div>
    <div className="menu-item-price">
      {formatPrice(item.price)}
    </div>
  </motion.div>
));

// ⚡ مكون الفئة الواحدة - مع Blur للصورة في حال وجودها
const CategoryBlock = memo(({ category, onSelect, formatPrice, catIndex, isMobile }) => (
  <motion.div 
    className="category-block"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewportOnce(isMobile)}
    transition={{ delay: catIndex * (isMobile ? 0.05 : 0.1), ...spring }}
  >
    <motion.h3 
      className="category-title"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce(isMobile)}
      transition={{ delay: 0.1, ...spring }}
    >
      {category.name}
    </motion.h3>
    <div className="items-grid">
      {category.items.map((item, i) => (
        <MenuItem 
          key={item.id} 
          item={item} 
          onSelect={onSelect} 
          formatPrice={formatPrice} 
          index={i}
          isMobile={isMobile}
        />
      ))}
    </div>
  </motion.div>
));

// ⚡ مكون التحميل مع أنيميشن
const LoadingSpinner = memo(({ text }) => (
  <motion.div 
    className="loading-spinner"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="spinner" />
    <p>{text}</p>
  </motion.div>
));

// ⚡ مكون الخطأ
const ErrorDisplay = memo(({ message }) => (
  <motion.div 
    className="loading-spinner"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={spring}
  >
    <p style={{ color: 'red' }}>❌ {message}</p>
  </motion.div>
));

// ⚡ كاش للمنيو المحمل
let menuCache = {};

function MenuContainer() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  // ⚡ useCallback لتثبيت الدوال
  const fetchMenu = useCallback(async () => {
    // ⚡ استخدام الكاش إذا المنيو محمل مسبقاً
    if (menuCache[language]) {
      setMenuData(menuCache[language]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const menuFile = language === 'ar' ? '/data/menu.json' : '/data/menu-en.json';
      const response = await fetch(menuFile);
      if (!response.ok) throw new Error('Failed to load menu');
      const data = await response.json();
      
      // ⚡ تخزين في الكاش
      menuCache[language] = data.restaurant;
      setMenuData(data.restaurant);
    } catch (err) {
      // ⚡ Fallback للعربي إذا فشل الإنجليزي
      if (language === 'en' && !menuCache['en']) {
        try {
          const response = await fetch('/data/menu.json');
          if (!response.ok) throw new Error('Failed to load menu');
          const data = await response.json();
          menuCache['en'] = data.restaurant;
          setMenuData(data.restaurant);
        } catch (err2) {
          setError(err2.message);
        }
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // ⚡ useCallback لتثبيت دالة تنسيق السعر
  const formatPrice = useCallback((price) => {
    return typeof price === 'number' ? `${price} ₪` : price;
  }, []);

  // ⚡ useCallback لتثبيت دالة اختيار العنصر
  const handleSelectItem = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  // ⚡ useCallback لتثبيت دالة الإغلاق
  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  if (loading) return <LoadingSpinner text={t('loadingMenu')} />;
  if (error) return <ErrorDisplay message={language === 'ar' ? 'خطأ في تحميل القائمة' : 'Error loading menu'} />;
  if (!menuData) return null;

  return (
    <>
      {menuData.categories.map((category, i) => (
        <CategoryBlock 
          key={category.id} 
          category={category} 
          onSelect={handleSelectItem} 
          formatPrice={formatPrice} 
          catIndex={i}
          isMobile={isMobile}
        />
      ))}

      {menuData.note && (
        <motion.div 
          className="menu-note-display"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce(isMobile)}
          transition={spring}
        >
          <p>📌 {menuData.note}</p>
        </motion.div>
      )}

      {selectedItem && (
        <Suspense fallback={null}>
          <Modal onClose={handleCloseModal}>
            <motion.img 
              src={`/${selectedItem.image}`} 
              alt={selectedItem.name}
              loading="lazy"
              onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
              variants={blurLoad}
              initial="hidden"
              animate="visible"
              onLoad={(e) => { e.target.style.filter = 'blur(0px)'; }}
            />
            <motion.div 
              className="gallery-modal-info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...spring }}
            >
              <h3>{selectedItem.name}</h3>
              <div className="gallery-modal-price">
                {formatPrice(selectedItem.price)}
              </div>
              <motion.a 
                href="https://wa.me/+970594804807" 
                className="gallery-order-btn"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={tapEffect}
                transition={springSoft}
              >
                <i className="fab fa-whatsapp"></i> {t('orderViaWhatsApp')}
              </motion.a>
            </motion.div>
          </Modal>
        </Suspense>
      )}
    </>
  );
}

// ⚡ تصدير مع memo للمكون بالكامل
export default memo(MenuContainer);