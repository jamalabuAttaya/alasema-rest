import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Modal from '../common/Modal';

const galleryItems = [
  { title: "Wagyu Ribeye Steak", desc: "مخازن لحم ريبو في كوفيد", price: "₪65.00", img: "/assets/images/gallery-1.webp" },
  { title: "Grilled Lamb Chops", desc: "كلهل ليفر بومي", price: "₪65.00", img: "/assets/images/gallery-2.webp" },
  { title: "Mediterranean Meshwi", desc: "الذي أفرز", price: "₪65.00", img: "/assets/images/gallery-3.webp" },
  { title: "Truffle Wagyu Burger", desc: "طبق بريجا وورغو", price: "₪65.00", img: "/assets/images/gallery-4.webp" }
];

function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLanguage();

  return (
    <>
      <div className="gallery-grid" id="galleryGrid">
        {galleryItems.map((item, index) => (
          <div className="gallery-item" key={index} onClick={() => setSelectedImage(item)}>
            <img 
              src={item.img} 
              alt={item.title}
              onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
            />
            <div className="gallery-overlay">
              <h4>{item.title}</h4>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal onClose={() => setSelectedImage(null)}>
          <img 
            src={selectedImage.img} 
            alt={selectedImage.title}
            id="gallery-modal-img"
            onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
          />
          <div className="gallery-modal-info">
            <h3 id="gallery-modal-title">{selectedImage.title}</h3>
            <p id="gallery-modal-desc">{selectedImage.desc}</p>
            <div className="gallery-modal-price" id="gallery-modal-price">{selectedImage.price}</div>
            <div className="gallery-modal-contact">
              <p><i className="fas fa-envelope"></i> asemarest@gmail.com</p>
              <p><i className="fas fa-phone"></i> +970594804807</p>
            </div>
            <a href="https://wa.me/+970594804807" className="gallery-order-btn">
              <i className="fab fa-whatsapp"></i> {t('orderNow')}
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}

export default GalleryGrid;