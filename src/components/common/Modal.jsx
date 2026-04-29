import { useEffect, memo, useCallback } from 'react';
import { createPortal } from 'react-dom';

// ⚡ معرّف فريد للـ portal
const PORTAL_ID = 'modal-root';

// ⚡ دالة مساعدة لإنشاء عنصر portal مرة واحدة
function getPortalRoot() {
  let portalRoot = document.getElementById(PORTAL_ID);
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = PORTAL_ID;
    document.body.appendChild(portalRoot);
  }
  return portalRoot;
}

function Modal({ children, onClose }) {
  // ⚡ useCallback لتثبيت الدوال
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    // ⚡ استخدام passive listener لتحسين الأداء
    document.addEventListener('keydown', handleKeyDown, { passive: true });
    
    // ⚡ حفظ overflow الأصلي
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleKeyDown]);

  // ⚡ استخدام createPortal لتصيير المودال خارج شجرة DOM الرئيسية
  // هذا يمنع إعادة التصيير الكاملة للصفحة
  return createPortal(
    <div 
      className="gallery-modal show" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="gallery-modal-content" onClick={stopPropagation}>
        <span 
          className="gallery-modal-close" 
          onClick={onClose}
          role="button"
          tabIndex={0}
          aria-label="Close modal"
          onKeyDown={(e) => e.key === 'Enter' && onClose()}
        >
          &times;
        </span>
        {children}
      </div>
    </div>,
    getPortalRoot()
  );
}

// ⚡ memo يمنع إعادة التصيير إذا لم تتغير props
export default memo(Modal);