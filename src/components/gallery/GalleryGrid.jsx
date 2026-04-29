import { useState, useCallback, memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { blurLoad, tapEffect, useIsMobile, viewportOnce, spring } from '../../animations/motionVariants';

const Modal = lazy(() => import('../common/Modal'));

const galleryItems = [
  { title: "Wagyu Ribeye Steak", desc: "مخازن لحم ريبو في كوفيد", price: "₪65.00", img: "/assets/images/gallery-1.webp" },
  { title: "Grilled Lamb Chops", desc: "كلهل ليفر بومي", price: "₪65.00", img: "/assets/images/gallery-2.webp" },
  { title: "Mediterranean Meshwi", desc: "الذي أفرز", price: "₪65.00", img: "/assets/images/gallery-3.webp" },
  { title: "Truffle Wagyu Burger", desc: "طبق بريجا وورغو", price: "₪65.00", img: "/assets/images/gallery-4.webp" }
];

const GalleryImage = memo(({ item, onSelect, index, isMobile }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div className="gallery-item" onClick={() => onSelect(item)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(item)} aria-label={item.title}
      initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce(isMobile)} transition={{ delay: index * 0.08, ...spring }}
      whileHover={isMobile ? {} : { scale: 1.03 }} whileTap={tapEffect}>
      <motion.img src={item.img} alt={item.title} loading="lazy" decoding="async"
        onLoad={() => setLoaded(true)} onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; setLoaded(true); }}
        variants={blurLoad} initial="hidden" animate={loaded ? "visible" : "hidden"}
        whileHover={isMobile ? {} : { scale: 1.08 }} />
      <div className="gallery-overlay"><h4>{item.title}</h4><p>{item.price}</p></div>
    </motion.div>
  );
});

const ModalContent = memo(({ selectedImage, t }) => (
  <>
    <motion.img src={selectedImage.img} alt={selectedImage.title} loading="lazy" decoding="async"
      onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
      variants={blurLoad} initial="hidden" animate="visible" />
    <div className="gallery-modal-info">
      <h3>{selectedImage.title}</h3><p>{selectedImage.desc}</p>
      <div className="gallery-modal-price">{selectedImage.price}</div>
      <div className="gallery-modal-contact">
        <p><i className="fas fa-envelope"></i> asemarest@gmail.com</p>
        <p><i className="fas fa-phone"></i> +970594804807</p>
      </div>
      <motion.a href="https://wa.me/+970594804807" className="gallery-order-btn" target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }} whileTap={tapEffect}>
        <i className="fab fa-whatsapp"></i> {t('orderNow')}
      </motion.a>
    </div>
  </>
));

function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const handleSelect = useCallback((item) => setSelectedImage(item), []);
  const handleClose = useCallback(() => setSelectedImage(null), []);

  return (
    <>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => <GalleryImage key={index} item={item} onSelect={handleSelect} index={index} isMobile={isMobile} />)}
      </div>
      {selectedImage && <Suspense fallback={null}><Modal onClose={handleClose}><ModalContent selectedImage={selectedImage} t={t} /></Modal></Suspense>}
    </>
  );
}

export default memo(GalleryGrid);