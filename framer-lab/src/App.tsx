'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

export default function App() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // 각도 범위 확대 (미세 → 명확)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-25, 25]), { stiffness: 400, damping: 25 })
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), { stiffness: 400, damping: 25 })

  // 깊이 추가
  const translateZ = useTransform(x, [-0.5, 0.5], [-15, 15])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <motion.div
        ref={ref}
        className="w-96 h-72 bg-gradient-to-br from-white/20 via-blue-500/10 to-purple-500/10 backdrop-blur-3xl rounded-3xl p-10 shadow-2xl border border-white/30 relative cursor-grab active:cursor-grabbing"
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: 'preserve-3d' as const,
        }}
        onMouseMove={(e) => {
          const rect = ref.current!.getBoundingClientRect()
          x.set((e.clientX - rect.left - rect.width / 2) / rect.width)
          y.set((e.clientY - rect.top - rect.height / 2) / rect.height)
        }}
        onMouseLeave={() => { x.set(0); y.set(0) }}
        whileHover={{ scale: 1.08 }}
        drag // 드래그도 추가 (Framer-like)
        dragElastic={0.2}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* 배경 빛 레이어들 */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/30 to-pink-400/30"
          style={{ transform: 'translateZ(50px) scale(1.1)', transformStyle: 'preserve-3d' }}
        />

        {/* 콘텐츠 */}
        <div className="relative z-10 text-center">
          <motion.div
            className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-xl mx-auto mb-6 border-2 border-white/40"
            style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent drop-shadow-2xl mb-3">
            3D CARD
          </h1>
          <p className="text-white/90 text-lg tracking-wide">강한 Tilt 효과</p>
        </div>
      </motion.div>

      {/* 지시어 */}
      <p className="absolute bottom-8 text-white/70 text-sm text-center w-full max-w-md mx-auto">
        마우스를 움직여 카드를 기울여보세요 (드래그도 가능)
      </p>
    </div>
  )
}
