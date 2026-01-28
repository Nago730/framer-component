// @ts-nocheck
import { addPropertyControls, ControlType } from "framer"
import React, { useState } from "react"

/**
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 * @framerSupportedLayout fixed, relative
 * 
 * VisualPalette: Professional filter matrix component for Framer.
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

export default function VisualPalette(props) {
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
    paddingX = 24,
    paddingY = 24,
    showMobileLabels = true,
  } = props

  const imageSrc = typeof imageUrl === "string" ? imageUrl : imageUrl?.src
  const [toast, setToast] = useState<string | null>(null)

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
    <div className="visual-palette" style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      backgroundColor,
      color: textColor,
      padding: `${paddingY}px ${paddingX}px`,
      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      minHeight: "200px",
      containerType: "inline-size",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: showAxisLabels ? "0" : "10px",
      }}>
        {showAxisLabels && (
          <div className="header-row" style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginBottom: 15,
          }}>
            <div style={{
              width: "100px",
              flexShrink: 0,
              fontSize: "12px",
              fontWeight: 700,
              color: cornerTextColor,
              textAlign: "right",
              paddingRight: "12px",
              textTransform: "uppercase",
            }}>
              {cornerLabel}
            </div>
            {periods.map((period) => (
              <div key={period.label} style={{
                flex: 1,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}>
                <div style={{
                  fontSize: "10px",
                  fontWeight: 900,
                  color: period.accent,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}>{period.label}</div>
                <div style={{
                  fontSize: "12px",
                  color: textColor + "88",
                  fontWeight: 400,
                }}>{period.time}h</div>
              </div>
            ))}
          </div>
        )}

        {styles.map((style) => (
          <div key={style.id} className="grid-row" style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: gap,
            marginBottom: gap,
          }}>
            {showAxisLabels && (
              <div className="row-label" style={{
                width: "100px",
                flexShrink: 0,
                textAlign: "right",
                paddingRight: "12px",
                fontSize: "14px",
                fontWeight: 600,
                color: textColor,
                letterSpacing: "-0.5px",
              }}>
                {style.name}
              </div>
            )}

            <div className="card-container" style={{
              display: "flex",
              flex: 1,
              gap: gap,
              width: "100%",
            }}>
              {periods.map((period) => {
                const { filter, overlay, blendMode } = getVibeStyles(period.label, style.id)
                return (
                  <div
                    key={`${style.id}-${period.label}`}
                    className="card-wrapper"
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
                      flex: 1,
                      minWidth: 0,
                      position: "relative",
                      overflow: "hidden",
                      backgroundColor: "#0d0d0d",
                      border: "none",
                      transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: borderRadius,
                      minHeight: "100px",
                    }}
                  >
                    <div className="aspect-ratio-box" style={{
                      width: "100%",
                      aspectRatio: selectedRatio,
                      position: "relative",
                      overflow: "hidden",
                    }}>
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.6s ease",
                            filter: filter,
                          }}
                        />
                      ) : (
                        <div style={{
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
                        }}>Upload</div>
                      )}
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: "none",
                        background: overlay,
                        mixBlendMode: blendMode,
                      }} />
                    </div>
                    {showMobileLabels && (
                      <div className="mobile-label" style={{
                        marginTop: "8px",
                        fontSize: "9px",
                        fontWeight: 700,
                        color: textColor,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        opacity: 0.8,
                        textAlign: "center",
                      }}>
                        {period.label}
                      </div>
                    )}
                    <div className="glow-effect" style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      pointerEvents: "none",
                      border: "2px solid rgba(255,255,255,0.3)",
                    }} />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {
        toast && (
          <div style={{
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
          }}>
            {toast}
          </div>
        )
      }

      <style dangerouslySetInnerHTML={{
        __html: `
          .glow-effect:hover { 
            opacity: 1 !important; 
            box-shadow: 0 0 20px rgba(255,255,255,0.2); 
          }
          img:hover { 
            transform: scale(1.08); 
          }
          .mobile-label {
            display: none;
          }
          @keyframes toast-in {
            from { transform: translate(-50%, 20px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
          }
          
          /* --- Tablet Layout (700px to 1000px) --- */
          @container (max-width: 1000px) {
            .visual-palette .grid-row {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 12px !important;
              margin-bottom: 24px !important;
            }
            .visual-palette .row-label {
              width: 100% !important;
              text-align: left !important;
              padding-right: 0 !important;
              margin-bottom: 4px !important;
              font-size: 16px !important;
              opacity: 0.9;
            }
            .visual-palette .header-row {
              margin-left: 0 !important;
              padding-left: 0 !important;
            }
            /* Adjust corner spacer width to 0 for vertical labels */
            .visual-palette .header-row > div:first-child {
               display: none !important;
            }
          }

          /* --- Mobile Layout (Under 700px) --- */
          @container (max-width: 700px) {
            .visual-palette .header-row {
              display: none !important;
            }
            .visual-palette .card-container {
              overflow-x: auto !important;
              padding-bottom: 12px !important;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
            }
            .visual-palette .card-wrapper {
              flex-shrink: 0 !important;
              width: 160px !important;
              min-height: auto !important;
              background: transparent !important;
              overflow: visible !important;
            }
            .visual-palette .mobile-label {
              display: block !important;
            }
          }
          
          /* Hide scrollbar */
          ::-webkit-scrollbar { 
            display: none; 
          }
        `}} />
    </div >
  )
}

// --- Framer Property Controls ---

addPropertyControls(VisualPalette, {
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
  paddingX: {
    type: ControlType.Number,
    title: "Padding X",
    defaultValue: 24,
    min: 0,
    max: 100,
  },
  paddingY: {
    type: ControlType.Number,
    title: "Padding Y",
    defaultValue: 24,
    min: 0,
    max: 100,
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
