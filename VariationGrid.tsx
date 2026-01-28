// @ts-nocheck
import { addPropertyControls, ControlType } from "framer"
import React, { useState } from "react"

/**
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 * @framerSupportedLayout fixed, relative
 * 
 * VariationGrid: Professional filter matrix component for Framer.
 */

// Default Data
const defaultPeriods = [
  { label: "Dawn", time: 5, accent: "#4A90E2" },
  { label: "Morning", time: 9, accent: "#F5A623" },
  { label: "Noon", time: 13, accent: "#FFF" },
  { label: "Evening", time: 18, accent: "#D0021B" },
  { label: "Dusk", time: 20, accent: "#9013FE" },
  { label: "Night", time: 1, accent: "#222" },
]

const defaultStyles = [
  { name: "Cinematic", id: "cine" },
  { name: "Vintage Film", id: "film" },
  { name: "Cyberpunk", id: "cyber" },
  { name: "Pastel Dream", id: "pastel" },
  { name: "Black & Gold", id: "noir" },
  { name: "Vivid Pop", id: "pop" },
]

// Filter Presets & Engine
function getVibeStyles(periodLabel, styleId) {
  let filter = "brightness(1) contrast(1) saturate(1)"
  let overlay = "transparent"
  let blendMode = "normal"

  switch (styleId) {
    case "cine":
      filter = "brightness(0.9) contrast(1.2) saturate(0.8) sepia(0.2)"
      overlay = "linear-gradient(45deg, rgba(0,20,40,0.4), transparent)"
      blendMode = "multiply"
      break
    case "film":
      filter = "brightness(1.1) contrast(0.9) saturate(0.7) sepia(0.4)"
      overlay = "rgba(255, 200, 150, 0.1)"
      blendMode = "overlay"
      break
    case "cyber":
      filter = "brightness(1.2) contrast(1.4) saturate(2) hue-rotate(-20deg)"
      overlay = "linear-gradient(to top, rgba(255,0,255,0.3), rgba(0,255,255,0.2))"
      blendMode = "screen"
      break
    case "pastel":
      filter = "brightness(1.1) contrast(0.8) saturate(1.2)"
      overlay = "linear-gradient(135deg, rgba(255,182,193,0.3), rgba(173,216,230,0.3))"
      blendMode = "soft-light"
      break
    case "noir":
      filter = "brightness(0.8) contrast(1.5) grayscale(1)"
      overlay = "radial-gradient(circle, rgba(255,215,0,0.1), black)"
      blendMode = "color-burn"
      break
    case "pop":
      filter = "brightness(1.1) contrast(1.2) saturate(2.5)"
      overlay = "transparent"
      break
  }

  if (periodLabel === "Dawn" || periodLabel === "Dusk") {
    filter += " hue-rotate(20deg) brightness(0.8)"
  } else if (periodLabel === "Evening") {
    filter += " sepia(0.5) contrast(1.1)"
  } else if (periodLabel === "Night") {
    filter += " brightness(0.5) contrast(1.2) saturate(0.5)"
  }

  return { filter, overlay, blendMode }
}

export default function VariationGrid(props) {
  const {
    imageUrl,
    gap = 8,
    borderRadius = 8,
    aspectRatio,
    periods = defaultPeriods,
    styles = defaultStyles,
    onFilterSelect,
    backgroundColor = "#050505",
    textColor = "#ececec",
    showAxisLabels = true,
    cornerLabel = "Style / Time",
    cornerTextColor = "#444444",
    paddingTop = 40,
    paddingRight = 40,
    paddingBottom = 40,
    paddingLeft = 40,
    showMobileLabels = true,
  } = props
  const imageSrc = typeof imageUrl === "string" ? imageUrl : imageUrl?.src

  const [containerWidth, setContainerWidth] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (!containerRef.current) return

    // Initial measurement
    setContainerWidth(containerRef.current.offsetWidth)

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = Math.round(entry.contentRect.width)
        // Only update if change is significant (> 10px) to prevent resize loops
        // Especially important when scrollbars toggle or layout shifts
        setContainerWidth((prev) => {
          if (prev === null) return newWidth
          return Math.abs(prev - newWidth) > 10 ? newWidth : prev
        })
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Use a fallback or wait for measurement to prevent layout jump on mount
  const isMobile = containerWidth !== null ? containerWidth < 800 : false

  const themedContainerStyle: React.CSSProperties = {
    ...containerStyle,
    backgroundColor: backgroundColor,
    color: textColor,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
  }

  // Ratio Mapping
  const ratioMap: Record<string, string> = {
    "1/1": "1 / 1",
    "4/3": "4 / 3",
    "3/4": "3 / 4",
    "16/9": "16 / 9",
    "9/16": "9 / 16",
    "2/3": "2 / 3",
  }
  const selectedRatio = ratioMap[aspectRatio] || "1 / 1"

  return (
    <div ref={containerRef} style={themedContainerStyle}>
      <div style={{
        ...matrixContainerStyle,
        marginTop: showAxisLabels ? "0" : "10px",
      }}>
        {showAxisLabels && !isMobile && (
          <div style={{ ...gridRowStyle, marginBottom: 15 }}>
            <div style={{ ...cornerLabelStyle, color: cornerTextColor }}>
              {cornerLabel}
            </div>
            {periods.map((period) => (
              <div key={period.label} style={columnHeaderStyle}>
                <div style={columnHeaderPeriodStyle(period.accent)}>{period.label}</div>
                <div style={{ ...columnHeaderTimeStyle, color: textColor + "88" }}>{period.time}h</div>
              </div>
            ))}
          </div>
        )}

        {styles.map((style) => (
          <div key={style.id} style={{
            ...gridRowStyle,
            gap: gap,
            marginBottom: gap,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
          }}>
            {showAxisLabels && (
              <div style={{
                ...rowLabelStyle,
                color: textColor,
                textAlign: isMobile ? "left" : "right",
                width: isMobile ? "auto" : "140px",
                marginBottom: isMobile ? "8px" : "0",
              }}>
                {style.name}
              </div>
            )}

            <div style={{
              display: "flex",
              flex: 1,
              gap: gap,
              width: "100%",
              overflowX: isMobile ? "auto" : "visible",
              paddingBottom: isMobile ? "10px" : "0",
            }}>
              {periods.map((period) => {
                const { filter, overlay, blendMode } = getVibeStyles(period.label, style.id)
                return (
                  <div
                    key={`${style.id}-${period.label}`}
                    onClick={() => {
                      const filterData = `filter: ${filter};`
                      navigator.clipboard.writeText(filterData)
                      setToast(`${style.name} - ${period.label} Copied!`)
                      setTimeout(() => setToast(null), 2000)
                      if (onFilterSelect) {
                        onFilterSelect({ style: style.name, period: period.label, filter, overlay })
                      }
                    }}
                    style={{
                      ...cardWrapperStyle,
                      aspectRatio: selectedRatio,
                      borderRadius: borderRadius,
                      flexShrink: isMobile ? 0 : 1,
                      width: isMobile ? "140px" : "auto",
                    }}
                  >
                    <div style={cardInnerStyle}>
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          key={imageSrc} // Help React stabilize the image element
                          style={{
                            ...imageStyle,
                            filter: filter
                          }}
                        />
                      ) : (
                        <div style={placeholderStyle}>Upload</div>
                      )}
                      <div style={{
                        ...overlayLayerStyle,
                        background: overlay,
                        mixBlendMode: blendMode
                      }} />
                      {/* On mobile, show labels inside cards if enabled and it's mobile view */}
                      {isMobile && showMobileLabels && (
                        <div style={mobileLabelOverlayStyle}>
                          {period.label}
                        </div>
                      )}
                    </div>
                    <div className="glow-effect" style={glowStyle} />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div style={toastStyle}>
          {toast}
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
                .glow-effect:hover { opacity: 1 !important; box-shadow: 0 0 20px rgba(255,255,255,0.2); }
                img:hover { transform: scale(1.08); }
                @keyframes toast-in {
                  from { transform: translate(-50%, 20px); opacity: 0; }
                  to { transform: translate(-50%, 0); opacity: 1; }
                }
                ::-webkit-scrollbar { display: none; }
            `}} />
    </div>
  )
}

// --- Styles ---

const matrixContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
}

const cardWrapperStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#0d0d0d",
  border: "none",
  transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
  cursor: "pointer",
  display: "flex",
}

const cardInnerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
}

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.6s ease",
}

const overlayLayerStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
}

const gridRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  width: "100%",
}

const cornerLabelStyle: React.CSSProperties = {
  width: "140px",
  flexShrink: 0,
  fontSize: "12px",
  fontWeight: 700,
  color: "#444",
  textAlign: "right",
  paddingRight: "20px",
  textTransform: "uppercase",
}

const columnHeaderStyle: React.CSSProperties = {
  flex: 1,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
}

const columnHeaderPeriodStyle = (color: string): React.CSSProperties => ({
  fontSize: "10px",
  fontWeight: 900,
  color: color,
  textTransform: "uppercase",
  letterSpacing: "1px",
})

const columnHeaderTimeStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#666",
  fontWeight: 400,
}

const rowLabelStyle: React.CSSProperties = {
  width: "140px",
  flexShrink: 0,
  textAlign: "right",
  paddingRight: "20px",
  fontSize: "14px",
  fontWeight: 600,
  color: "#eee",
  letterSpacing: "-0.5px",
}

// --- Styles ---

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: "#050505",
  color: "white",
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  overflowX: "hidden",
}

const glowStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  transition: "opacity 0.3s ease",
  pointerEvents: "none",
  border: "2px solid rgba(255,255,255,0.3)",
}

const placeholderStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  fontWeight: 600,
  color: "#333",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  background: "linear-gradient(135deg, #111 0%, #0a0a0a 100%)",
}

const toastStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#fff",
  color: "#000",
  padding: "12px 24px",
  borderRadius: "100px",
  fontSize: "13px",
  fontWeight: 700,
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  zIndex: 1000,
  animation: "toast-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
}

const mobileLabelOverlayStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "6px",
  left: "6px",
  fontSize: "8px",
  fontWeight: 800,
  color: "#fff",
  textTransform: "uppercase",
  backgroundColor: "rgba(0,0,0,0.5)",
  padding: "3px 6px",
  borderRadius: "4px",
  pointerEvents: "none",
  zIndex: 1,
  backdropFilter: "blur(8px)",
  letterSpacing: "0.05em",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
}

// --- Framer Property Controls ---

addPropertyControls(VariationGrid, {
  imageUrl: {
    type: ControlType.Image,
    title: "Image",
  },
  styles: {
    type: ControlType.Array,
    title: "Styles (Rows)",
    control: {
      type: ControlType.Object,
      controls: {
        name: { type: ControlType.String, title: "Name" },
        id: {
          type: ControlType.Enum,
          title: "Preset",
          options: ["cine", "film", "cyber", "pastel", "noir", "pop"],
          defaultValue: "cine"
        },
      }
    },
    defaultValue: defaultStyles,
  },
  periods: {
    type: ControlType.Array,
    title: "Periods (Cols)",
    control: {
      type: ControlType.Object,
      controls: {
        label: { type: ControlType.String, title: "Label" },
        time: { type: ControlType.Number, title: "Time (h)" },
        accent: { type: ControlType.Color, title: "Accent Color" },
      }
    },
    defaultValue: defaultPeriods,
  },
  aspectRatio: {
    type: ControlType.Enum,
    title: "Ratio",
    defaultValue: "1/1",
    options: ["1/1", "4/3", "3/4", "16/9", "9/16", "2/3"],
    optionTitles: ["1:1 (Square)", "4:3 (Landscape)", "3:4 (Portrait)", "16:9 (Wide)", "9:16 (Tall)", "2:3 (Classic)"],
  },
  gap: {
    type: ControlType.Number,
    title: "Gap",
    defaultValue: 8,
    min: 0,
    max: 40,
  },
  borderRadius: {
    type: ControlType.Number,
    title: "Radius",
    defaultValue: 8,
    min: 0,
    max: 40,
  },
  paddingTop: {
    type: ControlType.Number,
    title: "Top",
    defaultValue: 40,
    group: "Padding",
  },
  paddingRight: {
    type: ControlType.Number,
    title: "Right",
    defaultValue: 40,
    group: "Padding",
  },
  paddingBottom: {
    type: ControlType.Number,
    title: "Bottom",
    defaultValue: 40,
    group: "Padding",
  },
  paddingLeft: {
    type: ControlType.Number,
    title: "Left",
    defaultValue: 40,
    group: "Padding",
  },
  showAxisLabels: {
    type: ControlType.Boolean,
    title: "Show Labels",
    defaultValue: true,
  },
  showMobileLabels: {
    type: ControlType.Boolean,
    title: "Mobile Labels",
    defaultValue: true,
    visible: (props) => props.showAxisLabels,
  },
  cornerLabel: {
    type: ControlType.String,
    title: "Corner Text",
    defaultValue: "Style / Time",
    visible: (props) => props.showAxisLabels,
  },
  cornerTextColor: {
    type: ControlType.Color,
    title: "Corner Color",
    defaultValue: "#444444",
    visible: (props) => props.showAxisLabels,
  },
  // Theme Group
  backgroundColor: {
    type: ControlType.Color,
    title: "Background",
    defaultValue: "#050505",
    group: "Theme",
  },
  textColor: {
    type: ControlType.Color,
    title: "Text",
    defaultValue: "#ececec",
    group: "Theme",
  },
  onFilterSelect: {
    type: ControlType.EventHandler,
  }
})
