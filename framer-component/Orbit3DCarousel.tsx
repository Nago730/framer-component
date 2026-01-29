// @ts-nocheck
import { addPropertyControls, ControlType } from "framer"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 * @framerSupportedLayout fixed, relative
 */

// Simplified Icons
const ChevronLeft = ({ size = 24, strokeWidth = 2, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const ChevronRight = ({ size = 24, strokeWidth = 2, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const X = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

const DEFAULT_ITEMS = [
  { id: "1", name: "Elena Rossi", role: "Creative Director", color: "linear-gradient(135deg, #2563eb, #1e40af)", image: "", gallery: [] },
  { id: "2", name: "Sophie Chen", role: "Urban Architect", color: "linear-gradient(135deg, #0891b2, #1e3a8a)", image: "", gallery: [] },
  { id: "3", name: "Isabella Vance", role: "Digital Strategist", color: "linear-gradient(135deg, #9333ea, #4f46e5)", image: "", gallery: [] },
  { id: "4", name: "Chloe Dubois", role: "Product Designer", color: "linear-gradient(135deg, #059669, #064e3b)", image: "", gallery: [] },
  { id: "5", name: "Amara Okafor", role: "Visual Artist", color: "linear-gradient(135deg, #ea580c, #991b1b)", image: "", gallery: [] },
  { id: "6", name: "Yuki Tanaka", role: "UI/UX Researcher", color: "linear-gradient(135deg, #4f46e5, #581c87)", image: "", gallery: [] },
]


const getImgSrc = (img) => {
  if (!img) return ""
  if (typeof img === "string") return img
  return img.src || ""
}

const OrbitCard = ({ item, angle, isCentered, onClick, cardWidth, cardHeight, radius, isHovered, onHover, onUnhover, showBackText }) => {
  if (!item) return null
  const angleRad = (angle * Math.PI) / 180
  const depth = Math.cos(angleRad) // Not strictly needed for positioning but used for opacity logic if desired, keeping simple for now
  const cardImg = getImgSrc(item.image || (item.gallery && item.gallery[0]))

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        cursor: "pointer",
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        // Replaced complicated transform with simpler structure from Test 7
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        // backfaceVisibility: "hidden" // Optional: decide if backface should be hidden
      }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onUnhover}
    >
      <motion.div
        style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        animate={{ scale: isCentered ? (isHovered ? 1.2 : 1.15) : isHovered ? 1.1 : 1, y: isHovered ? -15 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "12px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.1)", backfaceVisibility: "hidden" }}>
          {cardImg ? (
            <img src={cardImg} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", transform: isHovered ? "scale(1.05)" : "scale(1)" }} />
          ) : (
            <div style={{
              width: "100%",
              height: "100%",
              background: item.color || "linear-gradient(135deg, #222, #000)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
              }} />
              <div style={{
                color: "white",
                fontSize: "40px",
                fontWeight: 900,
                opacity: 0.1,
                userSelect: "none"
              }}>
                {item.name ? item.name.charAt(0) : "P"}
              </div>
            </div>
          )}

          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px" }}>
            <h3 style={{ color: "white", fontWeight: "bold", fontSize: "18px", margin: 0 }}>{item.name}</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "10px", margin: 0, textTransform: "uppercase" }}>{item.role}</p>
          </div>
        </div>
        {/* Backface content - Updated */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#111",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // Centered content since top part is removed
          padding: "24px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg) translateZ(1px)",
          overflow: "hidden"
        }}>
          {/* Background Image & Overlay */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            {cardImg && <img
              src={cardImg}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.3,
                filter: "blur(4px)",
                transform: "scale(1.1)"
              }}
            />}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), rgba(0,0,0,0.3))" }} />
          </div>

          {showBackText && (
            <>
              <div style={{ textAlign: "center", position: "relative", zIndex: 1, marginBottom: "20px" }}>
                <h4 style={{ color: "white", fontWeight: 900, fontSize: "20px", margin: 0 }}>{item.name}</h4>
                <div style={{ height: "2px", width: "32px", background: "white", margin: "8px auto" }} />
              </div>

              <div style={{ width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}> {/* Centered text alignment looks better without top part */}
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "8px", margin: 0, textTransform: "uppercase" }}>Identity</p>
                <p style={{ color: "white", fontSize: "10px", fontWeight: "bold", margin: 0, textTransform: "uppercase" }}>{item.role}</p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Orbit3DCarousel(props) {
  const { items = DEFAULT_ITEMS, cardWidth = 180, cardHeight = 260, radius = 250, containerHeight = 500, backgroundColor = "#0a0a0a", showControls = true, accentColor = "#4f46e5", showBackText = true } = props
  const [rotation, setRotation] = useState(0)
  const [dragRotation, setDragRotation] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  const validItems = items && items.length > 0 ? items : DEFAULT_ITEMS
  const angleStep = 360 / validItems.length

  const currentCenteredIndex = useMemo(() => {
    const normalized = ((rotation % 360) + 360) % 360
    return Math.round(((360 - normalized) % 360) / angleStep) % validItems.length
  }, [rotation, angleStep, validItems.length])

  const handleDrag = (_, info) => {
    setDragRotation(info.offset.x * 0.2)
    if (hoveredId) setHoveredId(null)
  }

  const handleDragEnd = (_, info) => {
    const velocity = info.velocity.x
    const currentDrag = info.offset.x * 0.2
    const projectedRotation = rotation + currentDrag + velocity * 0.1
    const snappedRotation = Math.round(projectedRotation / angleStep) * angleStep
    setRotation(snappedRotation)
    setDragRotation(0)
  }

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "1000px", height: "1000px", background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`, filter: "blur(100px)", borderRadius: "50%" }} />
      </div>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2 }}>
        <div style={{ position: "relative", width: "100%", height: `${containerHeight}px`, perspective: "2000px", display: "flex", alignItems: "center", justifyContent: "center" }}>

          {/* Main 3D Container - Test 7 Structure */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={{ rotateY: rotation + dragRotation }}
            transition={{ type: "spring", stiffness: 70, damping: 20 }}
            style={{
              position: "relative", // Changed from absolute to relative to size correctly in flex
              width: cardWidth, // Explicit width
              height: cardHeight, // Explicit height
              cursor: "grab",
              transformStyle: "preserve-3d"
            }}
          >
            {validItems.map((item, index) => (
              <OrbitCard
                key={item.id || index}
                item={item}
                angle={index * angleStep}
                isCentered={index === currentCenteredIndex}
                onClick={() => setSelectedItem(item)}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                radius={radius}
                isHovered={hoveredId === (item.id || index)}
                onHover={() => setHoveredId(item.id || index)}
                onUnhover={() => setHoveredId(null)}
                showBackText={showBackText}
              />
            ))}
          </motion.div>


          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "15%", background: `linear-gradient(to right, ${backgroundColor}, transparent)`, pointerEvents: "none", zIndex: 3 }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "15%", background: `linear-gradient(to left, ${backgroundColor}, transparent)`, pointerEvents: "none", zIndex: 3 }} />
          {showControls && (
            <div style={{ position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "60px", zIndex: 4 }}>
              <button onClick={() => setRotation(r => r + angleStep)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer" }}><ChevronLeft size={48} /></button>
              <button onClick={() => setRotation(r => r - angleStep)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer" }}><ChevronRight size={48} /></button>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}>
            <div onClick={() => setSelectedItem(null)} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)" }} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ position: "relative", width: "100%", maxWidth: "1000px", height: "80vh", background: "#111", borderRadius: "32px", overflow: "hidden", display: "flex" }}>
              <div style={{ width: "35%", padding: "40px", background: selectedItem.color || "#222", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <button onClick={() => setSelectedItem(null)} style={{ background: "rgba(0,0,0,0.2)", border: "none", borderRadius: "50%", padding: "10px", color: "white", cursor: "pointer" }}><X size={20} /></button>
                  <h2 style={{ fontSize: "36px", color: "white", margin: "32px 0 16px" }}>{selectedItem.name}</h2>
                  <p style={{ color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>{selectedItem.role}</p>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: "1.6", fontWeight: 500 }}>
                    A deep dive into the creative process and the visual world of {selectedItem.name}. Explore the curated selection of works.
                  </p>
                  <div style={{ height: "4px", width: "64px", background: "rgba(255,255,255,0.2)", marginTop: "24px" }} />
                </div>
              </div>
              <div style={{ width: "65%", padding: "40px", overflowY: "auto", background: "#050505" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                  {(selectedItem.gallery || []).map((img, i) => (
                    <div key={i} style={{ aspectRatio: "3/4", borderRadius: "16px", overflow: "hidden", background: "#222" }}>
                      {getImgSrc(img) && <img src={getImgSrc(img)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

addPropertyControls(Orbit3DCarousel, {
  items: { type: ControlType.Array, title: "Items", control: { type: ControlType.Object, controls: { name: { type: ControlType.String }, role: { type: ControlType.String }, color: { type: ControlType.Color }, image: { type: ControlType.Image }, gallery: { type: ControlType.Array, control: { type: ControlType.Image } } } }, defaultValue: DEFAULT_ITEMS },
  cardWidth: { type: ControlType.Number, title: "Card Width", defaultValue: 180 },
  cardHeight: { type: ControlType.Number, title: "Card Height", defaultValue: 260 },
  radius: { type: ControlType.Number, title: "Orbit Radius", defaultValue: 250 },
  containerHeight: { type: ControlType.Number, title: "Height", defaultValue: 500 },
  backgroundColor: { type: ControlType.Color, title: "Background", defaultValue: "#0a0a0a" },
  accentColor: { type: ControlType.Color, title: "Ambience", defaultValue: "#4f46e5" },
  showControls: { type: ControlType.Boolean, title: "Nav Buttons", defaultValue: true },
  showBackText: { type: ControlType.Boolean, title: "Back Text", defaultValue: true },
})
