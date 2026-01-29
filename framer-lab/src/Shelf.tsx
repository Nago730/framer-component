import React from 'react';

// Book Component Definition
interface BookProps {
  title: React.ReactNode;
  author: string;
  image: string;
  tag?: string;
  delay?: string;
}

const Book = ({ title, author, image, tag = "BESTSELLER", delay = "0s" }: BookProps) => {
  return (
    <div className="relative group cursor-pointer" style={{ perspective: '600px' }}>
      <div
        className="book w-[200px] h-[280px] relative [transform-style:preserve-3d] [transform:rotateY(-30deg)] transition-[transform] duration-500 ease-out group-hover:[transform:rotateY(-45deg)_translateZ(40px)_rotateX(5deg)_translateY(-20px)]"
        style={{ animation: `initAnimation 1s ease ${delay} 1` }}
      >
        {/* Front Cover */}
        <div className="absolute top-0 left-0 w-full h-full z-10 [transform:translateZ(30px)] bg-[#01060f] rounded-r-[1px] shadow-[5px_5px_20px_#222] group-hover:shadow-[20px_20px_50px_rgba(0,0,0,0.6)] transition-shadow duration-500 overflow-hidden flex flex-col justify-end p-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
          <img
            src={image}
            alt="Book Cover"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="relative z-20 text-white transform translate-z-[10px]">
            {tag && <div className="text-[10px] font-bold tracking-widest text-yellow-500 mb-1">{tag}</div>}
            <h2 className="text-xl font-bold font-serif leading-tight">{title}</h2>
            <div className="mt-2 text-[10px] text-gray-400">{author}</div>
          </div>
        </div>

        {/* Right Side (Pages) */}
        <div
          className="absolute top-[2px] right-0 w-[60px] h-[276px] [transform-origin:right] [transform:rotateY(90deg)]"
          style={{
            background: `linear-gradient(90deg, 
                  #fff 0%, #f9f9f9 5%, #fff 10%, #f9f9f9 15%, 
                  #fff 20%, #f9f9f9 25%, #fff 30%, #f9f9f9 35%, 
                  #fff 40%, #f9f9f9 45%, #fff 50%, #f9f9f9 55%, 
                  #fff 60%, #f9f9f9 65%, #fff 70%, #f9f9f9 75%, 
                  #fff 80%, #f9f9f9 85%, #fff 90%, #f9f9f9 95%, #fff 100%
              )`
          }}
        />

        {/* Left Side (Spine) */}
        <div className="absolute top-0 left-0 w-[60px] h-full [transform-origin:left] [transform:rotateY(-90deg)] bg-zinc-900 border-r border-white/10 flex items-center justify-center overflow-hidden">
          {/* Spine Text (Rotated) */}
          <div className="rotate-90 text-[10px] font-bold text-gray-400 tracking-widest whitespace-nowrap opacity-50">
            {title}
          </div>
        </div>

        {/* Back Cover */}
        <div className="absolute top-0 left-0 w-full h-full [transform:translateZ(-30px)] bg-[#01060f] rounded-l-[1px] shadow-[-10px_0_50px_10px_#666]" />
      </div>
    </div>
  );
};

// Reusable Shelf Component
const Shelf = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Books Container */}
      <div className="flex items-end gap-10 px-10 relative z-10 mx-auto transform translate-y-3">
        {children}
      </div>

      {/* 3D Shelf Visuals */}
      <div className="relative w-[800px] h-[40px] z-0">
        {/* Top Face (The surface the books sit on) */}
        <div className="absolute top-0 left-[-20px] w-[840px] h-[40px] bg-[#5a3e36] origin-bottom [transform:perspective(1000px)_rotateX(60deg)] shadow-inner">
          {/* Wood Grain Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 mix-blend-multiply" />
        </div>

        {/* Front Face (The edge we see) */}
        <div className="absolute bottom-0 left-[-20px] w-[840px] h-[20px] bg-gradient-to-b from-[#4e342e] to-[#3e2723] rounded-b-md shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default function ShelfComponent() {
  return (
    <div className="min-h-screen bg-[#222] flex flex-col items-center justify-center p-10 font-sans gap-24 py-32 overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#222]" />
        <div className="absolute top-0 w-full h-[300px] bg-purple-500/5 blur-[120px]" />
      </div>

      {/* Top Shelf: 2 Books */}
      <Shelf>
        <Book
          title="NATURE"
          author="By Nature Mag"
          image="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&q=80&w=400"
          tag="SCIENCE"
          delay="0s"
        />
        <Book
          title="DESIGN"
          author="By Modernist"
          image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400"
          tag="ART"
          delay="0.2s"
        />
      </Shelf>

      {/* Bottom Shelf: 3 Books */}
      <Shelf>
        <Book
          title="PEOPLE"
          author="By Business Logic"
          image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400"
          tag="ECONOMY"
          delay="0.4s"
        />
        <Book
          title={<>ROCK <br /> MAGAZINE</>}
          author="By The Band"
          image="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=400"
          tag="MUSIC"
          delay="0.6s"
        />
        <Book
          title="ARTISTIC"
          author="By Gallery"
          image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
          tag="PHOTO"
          delay="0.8s"
        />
      </Shelf>
    </div>
  )
}
