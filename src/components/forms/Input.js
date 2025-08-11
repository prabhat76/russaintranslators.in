import React, { useState } from 'react';

const Input = ({ 
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onFocus,
  onBlur,
  label,
  error,
  disabled = false,
  required = false,
  size = 'medium',
  variant = 'default',
  className = '',
  style = {},
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getSizeStyles = () => {
    const sizes = {
      small: {
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem'
      },
      medium: {
        padding: '0.75rem 1rem',
        fontSize: '1rem'
      },
      large: {
        padding: '1rem 1.25rem',
        fontSize: '1.125rem'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const getVariantStyles = () => {
    const variants = {
      default: {
        border: error ? '2px solid #ef4444' : 
                isFocused ? '2px solid #3b82f6' : 
                '1px solid #d1d5db',
        background: disabled ? '#f9fafb' : 'white',
        color: disabled ? '#9ca3af' : '#1f2937'
      },
      outline: {
        border: error ? '2px solid #ef4444' : 
                isFocused ? '2px solid #3b82f6' : 
                '2px solid #e5e7eb',
        background: 'transparent',
        color: '#1f2937'
      },
      filled: {
        border: error ? '2px solid #ef4444' : 
                isFocused ? '2px solid #3b82f6' : 
                '1px solid transparent',
        background: disabled ? '#e5e7eb' : '#f3f4f6',
        color: disabled ? '#9ca3af' : '#1f2937'
      },
      glass: {
        border: error ? '1px solid rgba(239,68,68,0.5)' : 
                isFocused ? '1px solid rgba(59,130,246,0.5)' : 
                '1px solid rgba(255,255,255,0.3)',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        color: '#1f2937'
      }
    };
    return variants[variant] || variants.default;
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const inputStyles = {
    width: '100%',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
    boxShadow: isFocused ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...style
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: error ? '#ef4444' : '#374151'
        }}>
          {label}
          {required && <span style={{ color: '#ef4444', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          style={inputStyles}
          className={className}
          {...props}
        />
        
        {error && (
          <div style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#ef4444',
            fontSize: '1rem'
          }}>
            ⚠️
          </div>
        )}
      </div>
      
      {error && (
        <p style={{
          margin: '0.25rem 0 0',
          fontSize: '0.75rem',
          color: '#ef4444'
        }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
