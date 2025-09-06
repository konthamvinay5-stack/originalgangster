import React from 'react';

export function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-2xl font-semibold shadow-sm hover:shadow-md transition inline-block ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl bg-white shadow p-4 ${className}`}>
      {children}
    </div>
  );
}
