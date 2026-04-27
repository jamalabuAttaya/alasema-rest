import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Modal from '../common/Modal';

function MenuContainer() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        // تحميل المنيو حسب اللغة
        const menuFile = language === 'ar' ? '/data/menu.json' : '/data/menu-en.json';
        const response = await fetch(menuFile);
        if (!response.ok) throw new Error('Failed to load menu');
        const data = await response.json();
        setMenuData(data.restaurant);
      } catch (err) {
        setError(err.message);
        // في حالة فشل تحميل المنيو الإنجليزي، جرب العربي
        if (language === 'en') {
          try {
            const response = await fetch('/data/menu.json');
            if (!response.ok) throw new Error('Failed to load menu');
            const data = await response.json();
            setMenuData(data.restaurant);
          } catch (err2) {
            setError(err2.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [language]); // إعادة تحميل المنيو عند تغيير اللغة

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>{t('loadingMenu')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-spinner">
        <p style={{color: 'red'}}>❌ {language === 'ar' ? 'خطأ في تحميل القائمة' : 'Error loading menu'}</p>
      </div>
    );
  }

  if (!menuData) return null;

  return (
    <>
      {menuData.categories.map((category) => (
        <div className="category-block" key={category.id}>
          <h3 className="category-title">{category.name}</h3>
          <div className="items-grid">
            {category.items.map((item) => (
              <div 
                className="menu-item-card" 
                key={item.id}
                onClick={() => setSelectedItem(item)}
              >
                <div className="menu-item-info">
                  <h4>{item.name}</h4>
                </div>
                <div className="menu-item-price">
                  {typeof item.price === 'number' ? `${item.price} ₪` : item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {menuData.note && (
        <div className="menu-note-display">
          <p>📌 {menuData.note}</p>
        </div>
      )}

      {selectedItem && (
        <Modal onClose={() => setSelectedItem(null)}>
          <img 
            src={`/${selectedItem.image}`} 
            alt={selectedItem.name}
            onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
          />
          <div className="gallery-modal-info">
            <h3 id="modal-name">{selectedItem.name}</h3>
            <div className="gallery-modal-price" id="modal-price">
              {typeof selectedItem.price === 'number' ? `${selectedItem.price} ₪` : selectedItem.price}
            </div>
            <a href="https://wa.me/+970594804807" className="gallery-order-btn">
              <i className="fab fa-whatsapp"></i> {t('orderViaWhatsApp')}
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}

export default MenuContainer;