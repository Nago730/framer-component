import { addPropertyControls, ControlType } from "framer"
import React, { useState } from "react"

/**
 * VariationGrid Component
 * 72가지의 프리미엄 필터 조합을 그리드 형태로 보여주는 시각적 전시 컴포넌트입니다.
 * 단순 필터를 넘어 그라데이션 오버레이와 블렌드 모드를 사용하여 
 * 전문가 수준의 사진 보정 효과를 구현합니다.
 */

// 1. 데이터 정의 (시간대 & 스타일 카테고리)
const periods = [
  { label: "Dawn", time: 5, accent: "#4A90E2" },
  { label: "Morning", time: 9, accent: "#F5A623" },
  { label: "Noon", time: 13, accent: "#FFF" },
  { label: "Evening", time: 18, accent: "#D0021B" },
  { label: "Dusk", time: 20, accent: "#9013FE" },
  { label: "Night", time: 1, accent: "#222" },
]

const styles = [
  { name: "Cinematic", id: "cine" },
  { name: "Vintage Film", id: "film" },
  { name: "Cyberpunk", id: "cyber" },
  { name: "Pastel Dream", id: "pastel" },
  { name: "Black & Gold", id: "noir" },
  { name: "Vivid Pop", id: "pop" },
]

// 2. 필터 프리셋 엔진 (CSS Filter + Blend Mode Overlay)
function getVibeStyles(periodLabel: string, styleId: string): { filter: string, overlay: string, blendMode: React.CSSProperties["mixBlendMode"] } {
  let filter = "brightness(1) contrast(1) saturate(1)"
  let overlay = "transparent"
  let blendMode: React.CSSProperties["mixBlendMode"] = "normal"

  // 스타일별 기본값
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

  // 시간대별 추가 보정 (색온도 조절)
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
  const { imageUrl, gap, borderRadius, aspectRatio, showLabels } = props
  const imageSrc = typeof imageUrl === "string" ? imageUrl : imageUrl?.src

  // 종횡비 매핑
  const ratioMap = {
    "1/1": "1 / 1",
    "4/3": "4 / 3",
    "3/4": "3 / 4",
    "16/9": "16 / 9",
    "9/16": "9 / 16",
    "2/3": "2 / 3",
  }
  const selectedRatio = ratioMap[aspectRatio] || "1 / 1"

  return (
    <div style={containerStyle}>
      {/* Header Area */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Vibe Matrix</h1>
        <p style={subtitleStyle}>Professional Photo Preset Matrix (Styles × Time)</p>
      </div>

      <div style={matrixContainerStyle}>
        {/* 상단 시간(Column) 레이블 */}
        <div style={{ ...gridRowStyle, marginBottom: 15 }}>
          <div style={cornerLabelStyle}>Vibe / Time</div>
          {periods.map((period) => (
            <div key={period.label} style={columnHeaderStyle}>
              <div style={columnHeaderPeriodStyle(period.accent)}>{period.label}</div>
              <div style={columnHeaderTimeStyle}>{period.time}h</div>
            </div>
          ))}
        </div>

        {/* 스타일(Row) 기반 그리드 생성 */}
        {styles.map((style) => (
          <div key={style.id} style={{ ...gridRowStyle, gap: gap, marginBottom: gap }}>
            {/* 좌측 스타일(Row) 레이블 */}
            <div style={rowLabelStyle}>
              {style.name}
            </div>

            {/* 실제 필터 이미지들 (Columns) */}
            {periods.map((period) => {
              const { filter, overlay, blendMode } = getVibeStyles(period.label, style.id)
              return (
                <div key={`${style.id}-${period.label}`} style={{
                  ...cardWrapperStyle,
                  aspectRatio: selectedRatio,
                  borderRadius: borderRadius,
                }}>
                  <div style={cardInnerStyle}>
                    {imageSrc ? (
                      <img
                        src={imageSrc}
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
                  </div>
                  <div className="glow-effect" style={glowStyle} />
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
                .glow-effect:hover { opacity: 1 !important; box-shadow: 0 0 20px rgba(255,255,255,0.2); }
                img:hover { transform: scale(1.08); }
            `}} />
    </div>
  )
}

// --- Styles ---

const matrixContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minWidth: "1200px", // 행렬 구조 유지를 위한 최소 너비
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
  padding: "40px",
  width: "100%",
  backgroundColor: "#050505",
  color: "white",
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  overflowY: "auto",
}

const headerStyle: React.CSSProperties = {
  marginBottom: "40px",
  borderLeft: "4px solid #fff",
  paddingLeft: "20px",
}

const titleStyle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: 800,
  margin: 0,
  letterSpacing: "-1px",
  textTransform: "uppercase",
}

const subtitleStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#666",
  margin: "8px 0 0 0",
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  width: "100%",
}

const cardWrapperStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#0d0d0d",
  border: "1px solid rgba(255,255,255,0.03)",
  transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
  cursor: "pointer",
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

const labelContainerStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
  right: "10px",
  padding: "8px 12px",
  backgroundColor: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(10px)",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  border: "1px solid rgba(255,255,255,0.1)",
}

const styleNameStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  color: "#eee",
}

const periodTagStyle = (color: string): React.CSSProperties => ({
  fontSize: "9px",
  fontWeight: 800,
  color: color,
  textTransform: "uppercase",
  letterSpacing: "1px",
})

const glowStyle: React.CSSProperties = {
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

// --- Framer Property Controls ---

addPropertyControls(VariationGrid, {
  imageUrl: {
    type: ControlType.Image,
    title: "이미지 (Image)",
  },
  aspectRatio: {
    type: ControlType.Enum,
    title: "비율 (Ratio)",
    defaultValue: "4/3",
    options: ["1/1", "4/3", "3/4", "16/9", "9/16", "2/3"],
    optionTitles: ["1:1 (Square)", "4:3 (Landscape)", "3:4 (Portrait)", "16:9 (Wide)", "9:16 (Tall)", "2:3 (Classic)"],
  },
  gap: {
    type: ControlType.Number,
    title: "간격 (Gap)",
    defaultValue: 12,
    min: 0,
    max: 40,
  },
  borderRadius: {
    type: ControlType.Number,
    title: "곡률 (Radius)",
    defaultValue: 16,
    min: 0,
    max: 40,
  },
  showLabels: {
    type: ControlType.Boolean,
    title: "라벨 표시 (Labels)",
    defaultValue: true,
  },
})
