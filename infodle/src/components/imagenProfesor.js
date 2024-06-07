// src/components/ProfesorImage.js
import React from 'react';

const ProfesorImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-24 h-24.1 rounded-full object-cover m-4" />
);

export default ProfesorImage;
