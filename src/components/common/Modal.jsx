import { memo, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const PORTAL_ID = 'modal-root';

function getPortalRoot() {
  let portalRoot = document.getElementById(PORTAL_ID);

  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = PORTAL_ID;
    document.body.appendChild(portalRoot);
  }

  return portalRoot;
}

function Modal({ children, onClose, ariaLabel, closeLabel }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleBackdropClick = useCallback((event) => {
    if (event.target === event.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div className="gallery-modal show" onMouseDown={handleBackdropClick}>
      <div
        ref={dialogRef}
        className="gallery-modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="gallery-modal-close"
          onClick={onClose}
          aria-label={closeLabel}
        >
          <FaTimes aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>,
    getPortalRoot()
  );
}

export default memo(Modal);
