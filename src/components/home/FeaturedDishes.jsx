import { memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { cardVariants, cardHover, imageHover, tapEffect, blurLoad, spring, useIsMobile, viewportOnce } from '../../animations/motionVariants';

const FEATURED_DISHES = Object.freeze([
  { nameEn: "SIGNATURE RIBEYE", nameAr: "طعمك ريبعة", desc: "Ribeye steak, char-grilled and roasted, accompanied by a side of rice.", price: "₪65.00", image: "/assets/images/dish-ribeye.webp" },
  { nameEn: "TRUFFLE WAGYU BURGER", nameAr: "طبق بريجا وورغو", desc: "Lamb burger with truffle butter and caramelized onions.", price: "₪65.00", image: "/assets/images/dish-burger.webp" },
  { nameEn: "MEDITERRANEAN MESHWI", nameAr: "الذي أفرز", desc: "Mediterranean-inspired dishes with authentic flavors.", price: "₪65.00", image: "/assets/images/dish-meshwi.webp" },
  { nameEn: "GOLD-LEAF LAMB CHOPS", nameAr: "كلهل ليفر بومي", desc: "Grilled lamb chops with roasted potatoes and vegetables.", price: "₪65.00", image: "/assets/images/dish-lamb.webp" }
]);

const DishCard = memo(({ dish, index, isMobile }) => {
  const [loaded, setLoaded] = useState(false);
  const handleError = useCallback((e) => { e.target.src = '/assets/images/placeholder.webp'; setLoaded(true); }, []);

  return (
    <motion.div className="dish-card" custom={index} initial="hidden" whileInView="visible"
      viewport={viewportOnce(isMobile)} variants={cardVariants(isMobile)}
      whileHover={isMobile ? {} : cardHover} whileTap={tapEffect}>
      <div className="dish-image">
        <motion.img src={dish.image} alt={dish.nameEn} loading="lazy" onError={handleError} onLoad={() => setLoaded(true)}
          width="400" height="180"
          variants={blurLoad} initial="hidden" animate={loaded ? "visible" : "hidden"}
          whileHover={isMobile ? {} : imageHover} />
      </div>
      <div className="dish-info">
        <h3 className="dish-name-en">{dish.nameEn}</h3>
        <p className="dish-name-ar">{dish.nameAr}</p>
        <p className="dish-desc">{dish.desc}</p>
        <div className="dish-price">{dish.price}</div>
      </div>
    </motion.div>
  );
});

function FeaturedDishes() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section className="featured-dishes">
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
          <span className="title-ar">{t('featuredDishes')}</span>
          <span className="title-en">{t('featuredDishes')}</span>
        </motion.h2>
        <div className="dishes-grid">
          {FEATURED_DISHES.map((dish, index) => <DishCard key={index} dish={dish} index={index} isMobile={isMobile} />)}
        </div>
      </div>
    </section>
  );
}

export default memo(FeaturedDishes);