import React, { useEffect } from 'react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <i class="fas fa-check-circle" style={{ color: '#10B981' }}></i>;
      case 'danger':
        return <i class="fas fa-exclamation-triangle" style={{ color: '#EF4444' }}></i>;
      case 'warning':
        return <i class="fas fa-exclamation-circle" style={{ color: '#F59E0B' }}></i>;
      case 'info':
      default:
        return <i class="fas fa-info-circle" style={{ color: '#3B82F6' }}></i>;
    }
  };

  return (
    <div className={`toast-notification ${toast.type || 'info'}`}>
      {getIcon()}
      <span>{toast.message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#9CA3AF',
          cursor: 'pointer',
          marginLeft: '8px',
          fontSize: '1rem'
        }}
      >
        &times;
      </button>
    </div>
  );
}
