import { useState, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  type PanInfo
} from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * Data structure for items displayed in the 3D Orbit Carousel.
 * Optimized for showcasing people/profiles.
 */
export interface OrbitItem {
  id: string;
  name: string;
  role: string;
  color: string;
  gallery: string[];
}

const ORBIT_ITEMS: OrbitItem[] = [
  {
    id: '1',
    name: 'Elena Rossi',
    role: 'Creative Director',
    color: 'from-blue-600 to-blue-800',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    ],
  },
  {
    id: '2',
    name: 'Sophie Chen',
    role: 'Urban Architect',
    color: 'from-cyan-600 to-blue-900',
    gallery: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
      'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    ],
  },
  {
    id: '3',
    name: 'Isabella Vance',
    role: 'Digital Strategist',
    color: 'from-purple-600 to-indigo-800',
    gallery: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
      'https://images.unsplash.com/photo-1502767089025-6572583495f9?w=800&q=80',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    ],
  },
  {
    id: '4',
    name: 'Chloe Dubois',
    role: 'Product Designer',
    color: 'from-green-600 to-emerald-800',
    gallery: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    ],
  },
  {
    id: '5',
    name: 'Amara Okafor',
    role: 'Visual Artist',
    color: 'from-orange-600 to-red-800',
    gallery: [
      'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80',
      'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=800&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    ],
  },
  {
    id: '6',
    name: 'Yuki Tanaka',
    role: 'UI/UX Researcher',
    color: 'from-indigo-600 to-purple-900',
    gallery: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    ],
  },
];

interface OrbitCardProps {
  item: OrbitItem;
  angle: number;
  isCentered: boolean;
  onClick: () => void;
  cardWidth: number;
  cardHeight: number;
  radius: number;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
}

const OrbitCard: React.FC<OrbitCardProps> = ({
  item,
  angle,
  isCentered,
  onClick,
  cardWidth,
  cardHeight,
  radius,
  isHovered,
  onHover,
  onUnhover,
}) => {
  const angleRad = (angle * Math.PI) / 180;
  const depth = Math.cos(angleRad);

  const shadowOpacity = Math.max(0.1, (depth + 1) / 2 * 0.6);
  const shadowScale = 0.5 + (depth + 1) / 2 * 0.5;
  const reflectionOpacity = Math.max(0.05, (depth + 1) / 2 * 0.2);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 cursor-pointer"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onUnhover}
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="relative w-full h-full group"
        animate={{
          scale: isCentered ? (isHovered ? 1.2 : 1.15) : (isHovered ? 1.1 : 1),
          y: isHovered ? -15 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden border border-white/10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={item.gallery[0]}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
              {item.name}
            </h3>
            <p className="text-white/70 text-xs mt-1 uppercase tracking-wider">
              {item.role}
            </p>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden flex flex-col items-center justify-between p-6 border border-white/20 bg-[#111]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(1px)',
          }}
        >
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={item.gallery[0]}
              alt=""
              className="w-full h-full object-cover opacity-30 blur-sm scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
          </div>

          <div className="relative z-10 w-full flex justify-between items-start">
          </div>

          <div className="relative z-10 text-center">
            <h4 className="text-white font-black text-xl mb-1 tracking-tight">
              {item.name}
            </h4>
            <div className="h-0.5 w-8 bg-white/40 mx-auto" />
          </div>

          <div className="relative z-10 w-full text-left">
            <p className="text-white/30 text-[8px] uppercase tracking-tighter leading-none mb-1">
              Identity
            </p>
            <p className="text-white/90 text-[10px] font-bold uppercase tracking-wider">
              {item.role}
            </p>
          </div>
        </div>

        {/* Dynamic Floor Shadow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            top: '100%',
            marginTop: '10px',
            width: `${cardWidth * 0.9}px`,
            height: '20px',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, transparent 70%)',
            filter: 'blur(8px)',
            opacity: shadowOpacity,
            transform: `scaleX(${shadowScale})`,
          }}
        />

        {/* Floor Reflection */}
        <div
          className="absolute left-0 pointer-events-none"
          style={{
            top: '100%',
            width: '100%',
            height: '100%',
            opacity: reflectionOpacity * 0.5,
            transform: 'scaleY(-1)',
            transformOrigin: 'top',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 40%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 40%)',
          }}
        >
          <div className="w-full h-full rounded-lg overflow-hidden">
            <img
              src={item.gallery[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export interface Orbit3DCarouselProps {
  items?: OrbitItem[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  containerHeight?: number;
}

export default function Orbit3DCarousel({
  items = ORBIT_ITEMS,
  cardWidth = 180,
  cardHeight = 260,
  radius = 450,
  containerHeight = 500,
}: Orbit3DCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [dragRotation, setDragRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState<OrbitItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const angleStep = 360 / items.length;

  const currentCenteredIndex = useMemo(() => {
    const normalized = ((rotation % 360) + 360) % 360;
    return Math.round(((360 - normalized) % 360) / angleStep) % items.length;
  }, [rotation, angleStep, items.length]);

  const handleDrag = (_: any, info: PanInfo) => {
    setDragRotation(info.offset.x * 0.2);
    if (hoveredId) setHoveredId(null);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x;
    const currentDrag = info.offset.x * 0.2;

    const velocityFactor = velocity * 0.1;
    const projectedRotation = rotation + currentDrag + velocityFactor;

    const snappedRotation = Math.round(projectedRotation / angleStep) * angleStep;

    setRotation(snappedRotation);
    setDragRotation(0);
  };

  const rotateCarousel = (direction: 'left' | 'right') => {
    const change = direction === 'left' ? angleStep : -angleStep;
    setRotation(prev => prev + change);
  };

  return (
    <div className="h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden relative text-white">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes initAnimation {
          0% { transform: rotateY(-16deg); }
          100% { transform: rotateY(-10deg); }
        }
        .premium-scrollbar::-webkit-scrollbar { width: 6px; }
        .premium-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .premium-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .premium-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
        .premium-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
      `}} />
      {/* Central Spotlight Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-500/10 blur-[180px] rounded-full" />
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center relative z-20">

        {/* Orbit Area */}
        <div
          className="relative w-full flex items-center justify-center mb-0"
          style={{
            perspective: '2000px',
            height: `${containerHeight}px`
          }}
        >
          <motion.div
            drag="x"
            dragElastic={0.1}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={{ rotateY: rotation + dragRotation }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 20,
              mass: 1,
              restDelta: 0.1
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {items.map((item, index) => {
                const itemAngle = index * angleStep;
                return (
                  <OrbitCard
                    key={item.id}
                    item={item}
                    angle={itemAngle}
                    isCentered={index === currentCenteredIndex}
                    onClick={() => setSelectedItem(item)}
                    cardWidth={cardWidth}
                    cardHeight={cardHeight}
                    radius={radius}
                    isHovered={hoveredId === item.id}
                    onHover={() => setHoveredId(item.id)}
                    onUnhover={() => setHoveredId(null)}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* Vignette Gradients */}
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-30" />
          <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-30" />

          {/* Controls */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-16 z-40">
            <button
              onClick={() => rotateCarousel('left')}
              className="text-white/20 hover:text-white transition-all transform hover:scale-110"
            >
              <ChevronLeft size={64} strokeWidth={1} />
            </button>
            <button
              onClick={() => rotateCarousel('right')}
              className="text-white/20 hover:text-white transition-all transform hover:scale-110"
            >
              <ChevronRight size={64} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail View Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-6xl h-[85vh] bg-neutral-900/40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
            >
              {/* Left Sidebar: Profile Details */}
              <div className={`w-full md:w-[35%] p-10 flex flex-col justify-between bg-gradient-to-br ${selectedItem.color}`}>
                <div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="mb-10 p-3 bg-black/20 hover:bg-black/40 rounded-full transition-all"
                  >
                    <X className="text-white" size={24} />
                  </button>
                  <motion.h2
                    layoutId={`name-${selectedItem.id}`}
                    className="text-5xl font-black text-white mb-6 leading-[1.1]"
                  >
                    {selectedItem.name}
                  </motion.h2>
                  <p className="text-white/70 text-lg uppercase tracking-[0.2em] font-semibold">
                    {selectedItem.role}
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="text-white/60 text-sm leading-relaxed font-medium">
                    A deep dive into the creative process and the visual world of {selectedItem.name}. Explore the curated selection of works.
                  </p>
                  <div className="h-1 w-16 bg-white/20" />
                </div>
              </div>

              {/* Right Content: Gallery Grid */}
              <div className="w-full md:w-[65%] p-6 md:p-12 overflow-y-auto bg-[#050505] premium-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {selectedItem.gallery.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 }}
                      className="aspect-[3/4] rounded-2xl overflow-hidden group relative bg-neutral-800"
                    >
                      <img
                        src={img}
                        alt={`${selectedItem.name} work ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                        <span className="text-white text-xs font-bold uppercase tracking-widest">
                          Project View {index + 1}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
