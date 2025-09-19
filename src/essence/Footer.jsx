import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-white text-center p-6">
      <p className="text-lg font-semibold">Assam Essence</p>
      <p className="text-sm mt-2">
        © {year} Assam Essence. All rights reserved.
      </p>
      <p className="text-xs mt-2 max-w-2xl mx-auto">
        Prices and product availability are subject to change without prior
        notice. The information provided on this site is for educational
        purposes only and is not intended as medical advice. Please consult a
        healthcare professional before using essential oils.
      </p>
      <p className="text-sm mt-4 italic">
        Crafted with care • Inspired by nature 🌿
      </p>
    </footer>
  );
}

export default Footer;
