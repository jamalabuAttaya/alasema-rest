import { lazy, memo, Suspense, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { blurLoad, spring, tapEffect, useIsMobile, viewportOnce } from '../../animations/motionVariants';

const Modal = lazy(() => import('../common/Modal'));

const GALLERY_ITEMS = Object.freeze([
  {
    titleAr: 'دجاج مكسيكي حار',
    titleEn: 'Spicy Mexican Chicken',
    descAr: 'ساندويش دجاج بنكهة مكسيكية حارة.',
    descEn: 'Chicken sandwich with spicy Mexican flavors.',
    price: 30,
    image: '/assets/images/menu-items/mexican-chicken.webp',
  },
  {
    titleAr: 'تشيكن برجر',
    titleEn: 'Chicken Burger',
    descAr: 'برجر دجاج يقدم مع البطاطا والمخللات.',
    descEn: 'Chicken burger served with fries and pickles.',
    price: 30,
    image: '/assets/images/menu-items/chicken-burger.webp',
  },
  {
    titleAr: 'لقيمات',
    titleEn: 'Luqaimat',
    descAr: 'لقيمات طازجة من قائمة الحلويات.',
    descEn: 'Fresh luqaimat from our dessert menu.',
    price: 20,
    image: '/assets/images/menu-items/luqaimat.webp',
  },
  {
    titleAr: 'كوكتيل فواكه',
    titleEn: 'Fruit Cocktail',
    descAr: 'كوكتيل فواكه بارد ومنعش.',
    descEn: 'A cold and refreshing fruit cocktail.',
    price: 15,
    image: '/assets/images/menu-items/cocktail.webp',
  },
]);

const GalleryImage = memo(({ item, onSelect, index, isMobile, language }) => {
  const [loaded, setLoaded] = useState(false);
  const title = language === 'ar' ? item.titleAr : item.titleEn;

  return (
    <motion.button
      type="button"
      className="gallery-item"
      onClick={() => onSelect(item)}
      aria-label={title}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce(isMobile)}
      transition={{ delay: index * 0.06, ...spring }}
      whileHover={isMobile ? undefined : { scale: 1.02 }}
      whileTap={tapEffect}
    >
      <motion.img
        src={item.image}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        variants={blurLoad}
        initial="hidden"
        animate={loaded ? 'visible' : 'hidden'}
      />
      <span className="gallery-overlay">
        <strong>{title}</strong>
        <span>{item.price} ₪</span>
      </span>
    </motion.button>
  );
});

function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const closeModal = useCallback(() => setSelectedImage(null), []);

  const selectedTitle = selectedImage
    ? (language === 'ar' ? selectedImage.titleAr : selectedImage.titleEn)
    : '';
  const selectedDescription = selectedImage
    ? (language === 'ar' ? selectedImage.descAr : selectedImage.descEn)
    : '';
  const selectedOrderUrl = selectedImage
    ? `https://wa.me/970594804807?text=${encodeURIComponent(
        language === 'ar'
          ? `مرحباً، أود طلب ${selectedTitle}`
          : `Hello, I would like to order ${selectedTitle}`
      )}`
    : 'https://wa.me/970594804807';

  return (
    <>
      <div className="gallery-grid">
        {GALLERY_ITEMS.map((item, index) => (
          <GalleryImage
            key={item.image}
            item={item}
            onSelect={setSelectedImage}
            index={index}
            isMobile={isMobile}
            language={language}
          />
        ))}
      </div>

      {selectedImage && (
        <Suspense fallback={null}>
          <Modal onClose={closeModal} ariaLabel={selectedTitle} closeLabel={t('closeModal')}>
            <motion.img
              src={selectedImage.image}
              alt={selectedTitle}
              loading="lazy"
              decoding="async"
              variants={blurLoad}
              initial="hidden"
              animate="visible"
            />
            <div className="gallery-modal-info">
              <h2>{selectedTitle}</h2>
              <p>{selectedDescription}</p>
              <div className="gallery-modal-price">{selectedImage.price} ₪</div>
              <div className="gallery-modal-contact">
                <p><FaEnvelope aria-hidden="true" /> asemarest@gmail.com</p>
                <p><FaPhone aria-hidden="true" /> +970 59 480 4807</p>
              </div>
              <a
                href={selectedOrderUrl}
                className="gallery-order-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp aria-hidden="true" />
                <span>{t('orderNow')}</span>
              </a>
            </div>
          </Modal>
        </Suspense>
      )}
    </>
  );
}

export default memo(GalleryGrid);
