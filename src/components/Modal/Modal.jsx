import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className="modal-backdrop" onMouseDown={handleBackdropClick}>
      <div className="modal-window" role="dialog" aria-modal="true">
        <button type="button" className="modal-window__close" onClick={onClose} aria-label="Закрити">
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}