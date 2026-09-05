import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import {
  blurLoad,
  cardHover,
  cardVariants,
  imageHover,
  spring,
  tapEffect,
  useIsMobile,
  viewportOnce,
} from '../../animations/motionVariants';

const FEATURED_DISHES = Object.freeze([
  {
    nameAr: 'بيف برجر',
    nameEn: 'Beef Burger',
    descAr: 'برجر لحم يقدم مع البطاطا والمخللات.',
    descEn: 'Beef burger served with fries and pickles.',
    price: 30,
    image: '/assets/images/menu-items/beef-burger.webp',
  },
  {
    nameAr: 'شيش طاووق',
    nameEn: 'Shish Tawook',
    descAr: 'دجاج متبل ومشوي يقدم ساخنًا.',
    descEn: 'Marinated grilled chicken served hot.',
    price: 30,
    image: '/assets/images/menu-items/shish-tawook.webp',
  },
  {
    nameAr: 'رول مسخن',
    nameEn: 'Musakhan Roll',
    descAr: 'نكهة المسخن الفلسطيني في رول مقرمش.',
    descEn: 'Palestinian musakhan flavors in a crisp roll.',
    price: 10,
    image: '/assets/images/menu-items/musakhan-roll.webp',
  },
  {
    nameAr: 'وافل',
    nameEn: 'Waffle',
    descAr: 'وافل طازج من تشكيلة الحلويات.',
    descEn: 'Fresh waffle from our dessert selection.',
    price: 25,
    image: '/assets/images/menu-items/waffle.webp',
  },
]);

const DishCard = memo(({ dish, index, isMobile, language }) => {
  const [loaded, setLoaded] = useState(false);
  const name = language === 'ar' ? dish.nameAr : dish.nameEn;
  const secondaryName = language === 'ar' ? dish.nameEn : dish.nameAr;
  const description = language === 'ar' ? dish.descAr : dish.descEn;

  return (
    <motion.article
      className="dish-card"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce(isMobile)}
      variants={cardVariants(isMobile)}
      whileHover={isMobile ? undefined : cardHover}
      whileTap={tapEffect}
    >
      <div className="dish-image">
        <span className="dish-card-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <motion.img
          src={dish.image}
          alt={name}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          width="400"
          height="220"
          variants={blurLoad}
          initial="hidden"
          animate={loaded ? 'visible' : 'hidden'}
          whileHover={isMobile ? undefined : imageHover}
        />
      </div>
      <div className="dish-info">
        <h3>{name}</h3>
        <p className="dish-name-secondary">{secondaryName}</p>
        <p className="dish-desc">{description}</p>
        <div className="dish-price">{dish.price} ₪</div>
      </div>
    </motion.article>
  );
});

function FeaturedDishes() {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section className="featured-dishes">
      <div className="container">
        <motion.span
          className="section-kicker"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('featuredEyebrow')}
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          {t('featuredDishes')}
        </motion.h2>
        <motion.p
          className="section-intro"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, ...spring }}
        >
          {t('featuredIntro')}
        </motion.p>
        <div className="dishes-grid">
          {FEATURED_DISHES.map((dish, index) => (
            <DishCard
              key={dish.image}
              dish={dish}
              index={index}
              isMobile={isMobile}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(FeaturedDishes);
