import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false, 
  className = '', 
  style = {},
  ...props 
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      border: 'none',
      borderRadius: '12px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      opacity: disabled ? 0.6 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      textAlign: 'center',
      outline: 'none',
      fontFamily: 'inherit'
    };

    // Size variations
    const sizeStyles = {
      small: {
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        borderRadius: '8px'
      },
      medium: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '12px'
      },
      large: {
        padding: '1rem 2rem',
        fontSize: '1.125rem',
        borderRadius: '16px'
      },
      xlarge: {
        padding: '1.25rem 2.5rem',
        fontSize: '1.25rem',
        borderRadius: '20px'
      }
    };

    // Variant styles
    const variantStyles = {
      primary: {
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(59,130,246,0.3)'
      },
      secondary: {
        background: 'transparent',
        color: '#3b82f6',
        border: '2px solid #3b82f6'
      },
      outline: {
        background: 'transparent',
        color: '#64748b',
        border: '2px solid #e2e8f0'
      },
      ghost: {
        background: 'transparent',
        color: '#64748b',
        border: 'none'
      },
      success: {
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(16,185,129,0.3)'
      },
      warning: {
        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(245,158,11,0.3)'
      },
      danger: {
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(239,68,68,0.3)'
      }
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...style
    };
  };

  const handleMouseEnter = (e) => {
    if (disabled) return;
    
    switch (variant) {
      case 'primary':
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(59,130,246,0.4)';
        break;
      case 'secondary':
        e.currentTarget.style.background = 'rgba(59,130,246,0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        break;
      case 'outline':
        e.currentTarget.style.borderColor = '#3b82f6';
        e.currentTarget.style.color = '#3b82f6';
        e.currentTarget.style.transform = 'translateY(-2px)';
        break;
      case 'ghost':
        e.currentTarget.style.background = 'rgba(100,116,139,0.1)';
        e.currentTarget.style.color = '#1e293b';
        break;
      case 'success':
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(16,185,129,0.4)';
        break;
      case 'warning':
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(245,158,11,0.4)';
        break;
      case 'danger':
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(239,68,68,0.4)';
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = (e) => {
    if (disabled) return;
    
    const originalStyles = getButtonStyles();
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.background = originalStyles.background;
    e.currentTarget.style.boxShadow = originalStyles.boxShadow || 'none';
    e.currentTarget.style.borderColor = originalStyles.border?.includes('solid') ? 
      originalStyles.border.split(' ')[2] : '';
    e.currentTarget.style.color = originalStyles.color;
  };

  return (
    <button
      style={getButtonStyles()}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
