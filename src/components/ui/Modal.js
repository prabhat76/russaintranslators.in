import React, { useEffect } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = '',
  style = {}
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSizeStyles = () => {
    const sizes = {
      small: {
        width: '90%',
        maxWidth: '400px'
      },
      medium: {
        width: '90%',
        maxWidth: '600px'
      },
      large: {
        width: '90%',
        maxWidth: '800px'
      },
      xlarge: {
        width: '90%',
        maxWidth: '1200px'
      },
      fullscreen: {
        width: '95%',
        height: '95%',
        maxWidth: 'none',
        maxHeight: 'none'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={handleOverlayClick}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideIn 0.3s ease-out',
          ...getSizeStyles(),
          ...style
        }}
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 2rem',
            borderBottom: '1px solid #e2e8f0'
          }}>
            {title && (
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1e293b',
                margin: 0
              }}>
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#1e293b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = '#64748b';
                }}
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto'
        }}>
          {children}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// Modal Header Component
export const ModalHeader = ({ children, className = '', style = {} }) => (
  <div 
    style={{
      padding: '1.5rem 2rem 0',
      ...style
    }}
    className={className}
  >
    {children}
  </div>
);

// Modal Body Component
export const ModalBody = ({ children, className = '', style = {} }) => (
  <div 
    style={{
      padding: '1rem 2rem',
      flex: 1,
      overflow: 'auto',
      ...style
    }}
    className={className}
  >
    {children}
  </div>
);

// Modal Footer Component
export const ModalFooter = ({ children, className = '', style = {} }) => (
  <div 
    style={{
      padding: '0 2rem 1.5rem',
      borderTop: '1px solid #e2e8f0',
      marginTop: '1rem',
      paddingTop: '1.5rem',
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      ...style
    }}
    className={className}
  >
    {children}
  </div>
);

export default Modal;
