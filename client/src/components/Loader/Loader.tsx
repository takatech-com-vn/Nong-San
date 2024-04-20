import React from 'react';
import './Loader.css'
function Loader() {
  return (
    <div className="loader absolute top-1/2 left-1/2 w-16 h-16 rounded-full perspective-800">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
    </div>
  );
}

export default Loader;
