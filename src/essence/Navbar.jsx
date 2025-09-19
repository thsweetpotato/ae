import { useState } from "react";
import { Circle, CircleEllipsis } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["Home", "About", "Products", "Contact"];

  const handleScroll = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
    } 
    };

  // Node size (radius in px)
  const nodeRadius = 36; // w-18 h-18 → diameter 72px, radius 36px

  // Positions relative to a central origin (0,0)
  const positions = [
    { x: 0, y: 0 },     // center node
    { x: 120, y: -60 }, // top-right
    { x: 120, y: 60 },  // bottom-right
    { x: -120, y: 0 },  // left
  ];

  const bonds = [
    { from: 0, to: 1 }, // center -> top-right
    { from: 0, to: 2 }, // center -> bottom-right
    { from: 0, to: 3 }, // center -> left (double bond)
  ];

  // SVG center reference point
  const centerX = 150;
  const centerY = 100;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white text-white px-6 py-4 flex items-center justify-between">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-[#2E7D32] cursor-pointer hover:text-amber-600"
           onClick={() => handleScroll('home')}>
        ae
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-sm font-bold uppercase text-[#2E7D32]">
        {menuItems.map((item, index) => (
          <li key={index} className="hover:text-green-900 cursor-pointer"
            onClick={() => handleScroll(item.toLowerCase())}>
            {item}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <Circle size={28} className="text-[#2E7D32] hover:text-amber-600" />
        ) : (
          <CircleEllipsis
            size={28}
            className="text-[#2E7D32] hover:text-amber-600"
          />
        )}
      </button>

      {/* Molecular Menu with Blur */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blur overlay (excluding navbar) */}
            <motion.div
              className="fixed top-16 left-0 right-0 bottom-0 backdrop-blur-sm md:backdrop-blur-none z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Molecular Menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-28 left-1/2 transform -translate-x-1/2 flex items-center justify-center md:hidden z-20"
            >
              <div className="relative w-[300px] h-[200px]">
                {/* SVG Bonds */}
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {bonds.map((bond, bondIndex) => {
                    const from = positions[bond.from];
                    const to = positions[bond.to];

                    // double bond for left node
                    function getOffsets(bond) {
                      if (bond.from === 0 && bond.to === 3) return [-5, 5];
                      return [0];
                    }

                    const offsets = getOffsets(bond);

                    return offsets.map((offset, offsetIndex) => {
                        // vector from → to
                        const dx = to.x - from.x;
                        const dy = to.y - from.y;
                        const length = Math.sqrt(dx * dx + dy * dy);

                        // normalized vector
                        const ux = dx / length;
                        const uy = dy / length;

                        // move start/end points outwards by nodeRadius
                        const startX = centerX + from.x + ux * nodeRadius;
                        const startY = centerY + from.y + uy * nodeRadius + offset;

                        const endX = centerX + to.x - ux * nodeRadius;
                        const endY = centerY + to.y - uy * nodeRadius + offset;

                        return (
                        <motion.line
                            key={`${bondIndex}-${offsetIndex}`}
                            x1={startX}
                            y1={startY}
                            x2={endX}
                            y2={endY}
                            stroke="#D97706"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            exit={{ pathLength: 0 }}
                            transition={{
                            delay: bond.to * 0.15 + offsetIndex * 0.05,
                            duration: 0.4,
                            }}
                        />
                        );
                    });
                    })}
                </svg>

                {/* Nodes */}
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="absolute w-18 h-18 rounded-full flex items-center justify-center border border-green-700 bg-white/70 text-green-700 shadow-sm cursor-pointer hover:scale-105 hover:shadow-md hover:bg-green-50 transition-all text-xs uppercase font-medium"
                    style={{
                      left: `calc(50% + ${positions[index].x}px - ${nodeRadius}px)`,
                      top: `calc(50% + ${positions[index].y}px - ${nodeRadius}px)`,
                    }}
                    onClick={() => handleScroll(item.toLowerCase())}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
