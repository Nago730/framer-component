import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Book data structure
interface Book {
  id: string;
  title: string;
  author: string;
  color: string;
  pages: string[]; // Array of image URLs
}

// Sample books data
const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Mountain Tales',
    author: 'John Doe',
    color: 'from-blue-600 to-blue-800',
    pages: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop',
    ],
  },
  {
    id: '2',
    title: 'Ocean Dreams',
    author: 'Jane Smith',
    color: 'from-cyan-600 to-blue-900',
    pages: [
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513553404607-988bf2703777?w=400&h=600&fit=crop',
    ],
  },
  {
    id: '3',
    title: 'Urban Stories',
    author: 'Mike Johnson',
    color: 'from-purple-600 to-indigo-800',
    pages: [
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=600&fit=crop',
    ],
  },
  {
    id: '4',
    title: 'Forest Whispers',
    author: 'Emily Brown',
    color: 'from-green-600 to-emerald-800',
    pages: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=400&h=600&fit=crop',
    ],
  },
  {
    id: '5',
    title: 'Desert Horizons',
    author: 'Alex Martinez',
    color: 'from-orange-600 to-red-800',
    pages: [
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop',
    ],
  },
];

// Page Component - Individual 3D page
interface PageProps {
  imageUrl: string;
  index: number;
  currentPage: number;
  isFlipping: boolean;
}

const Page: React.FC<PageProps> = ({ imageUrl, index, currentPage, isFlipping }) => {
  const isFlipped = index < currentPage;
  const rotation = isFlipped ? -180 : 0;
  const zIndex = isFlipping && index === currentPage - 1 ? 100 : 50 - index;

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'left center',
        zIndex,
      }}
      animate={{ rotateY: rotation }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 20,
        mass: 1,
      }}
    >
      {/* Front of the page */}
      <div
        className="absolute w-full h-full backface-hidden rounded-r-lg overflow-hidden shadow-2xl"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <motion.img
          src={imageUrl}
          alt={`Page ${index + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { delay: 0.2, duration: 0.4 },
            scale: { delay: 0.2, duration: 0.5 },
          }}
        />
        {/* Gradient overlay for light effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: [0, 1, 0] }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: 'easeInOut',
          }}
        />
        {/* Shadow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Back of the page */}
      <div
        className="absolute w-full h-full backface-hidden rounded-l-lg overflow-hidden shadow-2xl bg-gray-100"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <img
          src={imageUrl}
          alt={`Page ${index + 1} back`}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/40" />
      </div>
    </motion.div>
  );
};

// Book Component - Individual book in the row
interface BookItemProps {
  book: Book;
  isHovered: boolean;
  isOtherHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  index: number;
  totalBooks: number;
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  isHovered,
  isOtherHovered,
  onHover,
  onLeave,
  onClick,
  index,
  totalBooks,
}) => {
  // Calculate 3D fan-out rotation (center book = 0, side books rotate inward)
  const centerIndex = (totalBooks - 1) / 2;
  const distanceFromCenter = index - centerIndex;
  const fanRotation = distanceFromCenter * -8; // Rotate towards center

  // Floating bobbing animation - each book has slightly different timing
  const floatDelay = index * 0.2;

  return (
    <div className="relative group">
      {/* Main book container with reflection */}
      <motion.div
        layoutId={`book-${book.id}`}
        className="relative cursor-pointer -ml-8 first:ml-0"
        style={{
          width: '180px',
          height: '260px',
          perspective: '1200px',
        }}
        onHoverStart={onHover}
        onHoverEnd={onLeave}
        onClick={onClick}
        animate={{
          y: isHovered ? -30 : [0, -8, 0],
          rotateY: isHovered ? 0 : fanRotation,
          rotateX: isHovered ? 5 : 0,
          scale: isHovered ? 1.1 : 1,
          opacity: isOtherHovered ? 0.5 : 1,
          zIndex: isHovered ? 50 : 1,
        }}
        transition={{
          y: isHovered ? {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          } : {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: floatDelay,
          },
          rotateY: {
            type: 'spring',
            stiffness: 200,
            damping: 25,
          },
          rotateX: {
            type: 'spring',
            stiffness: 300,
            damping: 25,
          },
          scale: {
            type: 'spring',
            stiffness: 300,
            damping: 25,
          },
        }}
      >
        {/* Book with 3D transform */}
        <div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Dynamic soft shadow */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/40 blur-xl rounded-full"
            animate={{
              scale: isHovered ? 1.2 : [1, 1.1, 1],
              opacity: isHovered ? 0.6 : [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: floatDelay,
            }}
          />

          {/* Spine shadow */}
          <div className="absolute left-0 top-0 w-3 h-full bg-black/30 rounded-l-lg" />

          {/* Cover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${book.color} rounded-lg shadow-xl overflow-hidden`}
          >
            <img
              src={book.pages[0]}
              alt={book.title}
              className="w-full h-full object-cover opacity-40"
            />

            {/* Glossy shine effect on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: isHovered ? ['200% 0', '-200% 0'] : '200% 0',
              }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut',
              }}
            />

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-bold text-lg leading-tight">{book.title}</h3>
              <p className="text-white/80 text-sm mt-1">{book.author}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floor reflection */}
      <motion.div
        className="absolute top-full left-0 w-full h-full pointer-events-none overflow-hidden"
        style={{
          transform: 'scaleY(-1)',
          transformOrigin: 'top',
        }}
        animate={{
          opacity: isHovered ? 0.15 : 0.08,
        }}
      >
        <div
          className={`w-full h-full bg-gradient-to-br ${book.color} rounded-lg opacity-30`}
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%)',
          }}
        >
          <img
            src={book.pages[0]}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </motion.div>
    </div>
  );
};

// 3D Book Viewer - Expanded view with page flipping
interface BookViewerProps {
  book: Book;
  onClose: () => void;
}

const BookViewer: React.FC<BookViewerProps> = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleNextPage = () => {
    if (currentPage < book.pages.length) {
      setIsFlipping(true);
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setIsFlipping(false), 500);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setIsFlipping(true);
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => setIsFlipping(false), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        layoutId={`book-${book.id}`}
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-50"
        >
          <X size={32} />
        </button>

        {/* 3D Book Container */}
        <div
          className="relative bg-gray-900/50 rounded-xl p-8"
          style={{ perspective: '1500px' }}
        >
          {/* Book */}
          <div
            className="relative bg-white rounded-lg shadow-2xl"
            style={{
              width: '600px',
              height: '800px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Pages */}
            {book.pages.map((pageUrl, index) => (
              <Page
                key={index}
                imageUrl={pageUrl}
                index={index}
                currentPage={currentPage}
                isFlipping={isFlipping}
              />
            ))}

            {/* Last page / back cover */}
            {currentPage === book.pages.length && (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${book.color} rounded-lg flex items-center justify-center`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-4">{book.title}</h2>
                  <p className="text-xl opacity-80">{book.author}</p>
                  <p className="mt-8 text-sm opacity-60">End of Book</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-md rounded-full px-6 py-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="text-white disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-transform"
            >
              <ChevronLeft size={24} />
            </button>

            <span className="text-white font-medium min-w-[100px] text-center">
              Page {currentPage} / {book.pages.length}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === book.pages.length}
              className="text-white disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-transform"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component - Book Showcase
export default function BookShowcase() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Book Showcase</h1>
          <p className="text-gray-400 text-lg">Click any book to explore its pages in 3D</p>
        </motion.div>

        {/* Books Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-end px-12 pb-20"
        >
          {BOOKS.map((book, index) => (
            <BookItem
              key={book.id}
              book={book}
              index={index}
              totalBooks={BOOKS.length}
              isHovered={hoveredId === book.id}
              isOtherHovered={hoveredId !== null && hoveredId !== book.id}
              onHover={() => setHoveredId(book.id)}
              onLeave={() => setHoveredId(null)}
              onClick={() => setSelectedBook(book)}
            />
          ))}
        </motion.div>
      </div>

      {/* 3D Book Viewer Modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookViewer book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
