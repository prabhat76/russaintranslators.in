import React from 'react';

export const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClass = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  }[size];

  return (
    <div className={`loading-spinner ${sizeClass}`}>
      <div className="spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export const SkeletonLoader = ({ type = 'text', count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div key={i} className={`skeleton skeleton-${type}`}></div>
  ));

  return <div className="skeleton-container">{skeletons}</div>;
};

export const ErrorMessage = ({ message, onRetry, type = 'error' }) => {
  return (
    <div className={`error-message error-${type}`}>
      <div className="error-icon">
        {type === 'error' ? '⚠️' : type === 'warning' ? '⚠️' : 'ℹ️'}
      </div>
      <div className="error-content">
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-sm btn-outline">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-message">{message}</span>
      <button onClick={onClose} className="toast-close">×</button>
    </div>
  );
};
