import { useLanguage } from '../../context/LanguageContext';

const featuredDishes = [
  {
    nameEn: "SIGNATURE RIBEYE",
    nameAr: "طعمك ريبعة",
    desc: "Ribeye steak, char-grilled and roasted, accompanied by a side of rice.",
    price: "₪65.00",
    image: "/assets/images/dish-ribeye.webp"
  },
  {
    nameEn: "TRUFFLE WAGYU BURGER",
    nameAr: "طبق بريجا وورغو",
    desc: "Lamb burger with truffle butter and caramelized onions.",
    price: "₪65.00",
    image: "/assets/images/dish-burger.webp"
  },
  {
    nameEn: "MEDITERRANEAN MESHWI",
    nameAr: "الذي أفرز",
    desc: "Mediterranean-inspired dishes with authentic flavors.",
    price: "₪65.00",
    image: "/assets/images/dish-meshwi.webp"
  },
  {
    nameEn: "GOLD-LEAF LAMB CHOPS",
    nameAr: "كلهل ليفر بومي",
    desc: "Grilled lamb chops with roasted potatoes and vegetables.",
    price: "₪65.00",
    image: "/assets/images/dish-lamb.webp"
  }
];

function FeaturedDishes() {
  const { t } = useLanguage();

  return (
    <section className="featured-dishes">
      <div className="container">
        <h2 className="section-title">
          <span className="title-ar">{t('featuredDishes')}</span>
          <span className="title-en">{t('featuredDishes')}</span>
        </h2>
        
        <div className="dishes-grid">
          {featuredDishes.map((dish, index) => (
            <div className="dish-card" key={index}>
              <div className="dish-image">
                <img 
                  src={dish.image} 
                  alt={dish.nameEn} 
                  onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
                />
              </div>
              <div className="dish-info">
                <h3 className="dish-name-en">{dish.nameEn}</h3>
                <p className="dish-name-ar">{dish.nameAr}</p>
                <p className="dish-desc">{dish.desc}</p>
                <div className="dish-price">{dish.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedDishes;