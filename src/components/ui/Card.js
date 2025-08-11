import React from 'react';

const Card = ({ 
  children, 
  variant = 'default', 
  padding = 'medium', 
  hover = true, 
  className = '', 
  style = {},
  onClick,
  ...props 
}) => {
  const getCardStyles = () => {
    const baseStyles = {
      borderRadius: '16px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default'
    };

    // Padding variations
    const paddingStyles = {
      none: { padding: '0' },
      small: { padding: '1rem' },
      medium: { padding: '1.5rem' },
      large: { padding: '2rem' },
      xlarge: { padding: '3rem' }
    };

    // Variant styles
    const variantStyles = {
      default: {
        background: 'white',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      },
      elevated: {
        background: 'white',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      },
      glass: {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      },
      dark: {
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
      },
      gradient: {
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        border: '1px solid rgba(226,232,240,0.8)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
      },
      outline: {
        background: 'transparent',
        border: '2px solid #e2e8f0',
        boxShadow: 'none'
      },
      success: {
        background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
        border: '1px solid #a7f3d0',
        boxShadow: '0 4px 15px rgba(16,185,129,0.1)'
      },
      warning: {
        background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
        border: '1px solid #fcd34d',
        boxShadow: '0 4px 15px rgba(245,158,11,0.1)'
      },
      error: {
        background: 'linear-gradient(135deg, #fef2f2, #fecaca)',
        border: '1px solid #fca5a5',
        boxShadow: '0 4px 15px rgba(239,68,68,0.1)'
      },
      info: {
        background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
        border: '1px solid #93c5fd',
        boxShadow: '0 4px 15px rgba(59,130,246,0.1)'
      }
    };

    return {
      ...baseStyles,
      ...paddingStyles[padding],
      ...variantStyles[variant],
      ...style
    };
  };

  const handleMouseEnter = (e) => {
    if (!hover) return;
    
    switch (variant) {
      case 'default':
      case 'elevated':
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        break;
      case 'glass':
        e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
        e.currentTarget.style.transform = 'translateY(-5px)';
        break;
      case 'dark':
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
        break;
      case 'gradient':
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
        break;
      case 'outline':
        e.currentTarget.style.borderColor = '#3b82f6';
        e.currentTarget.style.background = 'rgba(59,130,246,0.05)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        break;
      case 'success':
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(16,185,129,0.2)';
        break;
      case 'warning':
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(245,158,11,0.2)';
        break;
      case 'error':
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(239,68,68,0.2)';
        break;
      case 'info':
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(59,130,246,0.2)';
        break;
      default:
        e.currentTarget.style.transform = 'translateY(-5px)';
        break;
    }
  };

  const handleMouseLeave = (e) => {
    if (!hover) return;
    
    const originalStyles = getCardStyles();
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.background = originalStyles.background;
    e.currentTarget.style.boxShadow = originalStyles.boxShadow;
    e.currentTarget.style.borderColor = originalStyles.border?.includes('solid') ? 
      originalStyles.border.split(' ')[2] : '';
  };

  return (
    <div
      style={getCardStyles()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header Component
export const CardHeader = ({ children, className = '', style = {} }) => (
  <div 
    style={{
      paddingBottom: '1rem',
      marginBottom: '1rem',
      borderBottom: '1px solid #e2e8f0',
      ...style
    }}
    className={className}
  >
    {children}
  </div>
);

// Card Body Component
export const CardBody = ({ children, className = '', style = {} }) => (
  <div 
    style={{
      flex: 1,
      ...style
    }}
    className={className}
  >
    {children}
  </div>
);

// Card Footer Component
export const CardFooter = ({ children, className = '', style = {} }) => (
  <div 
    style={{
      paddingTop: '1rem',
      marginTop: '1rem',
      borderTop: '1px solid #e2e8f0',
      ...style
    }}
    className={className}
  >
    {children}
  </div>
);

export default Card;
