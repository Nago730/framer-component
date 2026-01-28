import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MousePointer2, Sparkles, Zap } from 'lucide-react'
import { useRef } from 'react'

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  // 마우스 좌표를 Motion Value로 관리
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // 부드러운 애니메이션을 위한 스프링 설정
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  // 좌표에 따른 회전각 변환 (-20deg ~ 20deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    // 마우스 위치를 -0.5 ~ 0.5 범위로 정규화
    const mouseX = (event.clientX - rect.left) / rect.width - 0.5
    const mouseY = (event.clientY - rect.top) / rect.height - 0.5

    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8 overflow-hidden font-sans">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1200px' }}
        className="relative group"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
          className="relative w-96 h-64 rounded-[2.5rem] bg-zinc-900/40 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 하이라이트 레이어 */}
          <motion.div
            style={{
              x: useTransform(mouseXSpring, [-0.5, 0.5], [100, -100]),
              y: useTransform(mouseYSpring, [-0.5, 0.5], [100, -100]),
              transformStyle: 'preserve-3d',
              translateZ: '1px'
            }}
            className="absolute -inset-20 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-3xl pointer-events-none"
          />

          {/* 내부 패널 (Parallax) */}
          <div
            style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}
            className="relative flex flex-col items-center gap-4 py-8"
          >
            <motion.div
              style={{ translateZ: '80px' }}
              className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-xl"
            >
              <Sparkles className="w-10 h-10 text-blue-400" />
            </motion.div>

            <motion.div className="text-center px-8" style={{ translateZ: '40px' }}>
              <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-2 justify-center">
                3D Premium Lab <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </h1>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                Framer Motion & Tailwind v4<br />
                Next Gen Interactive Component
              </p>
            </motion.div>
          </div>

          {/* 장식 요소 */}
          <motion.div
            style={{
              translateZ: '100px',
              x: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]),
              y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]),
            }}
            className="absolute top-8 right-8"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 blur-[2px] opacity-80" />
          </motion.div>

          <motion.div
            style={{
              translateZ: '120px',
              x: useTransform(mouseXSpring, [-0.5, 0.5], [30, -30]),
              y: useTransform(mouseYSpring, [-0.5, 0.5], [30, -30]),
            }}
            className="absolute bottom-8 left-8"
          >
            <MousePointer2 className="w-6 h-6 text-white/40 -rotate-12" />
          </motion.div>

          {/* 유리 질감 */}
          <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay pointer-events-none" />
        </motion.div>

        {/* 바닥 그림자 */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            translateZ: '-100px',
            scale: 0.95,
            opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0.3, 0.5])
          }}
          className="absolute inset-0 bg-blue-600/20 blur-[80px] -z-10 rounded-full"
        />
      </div>
    </div>
  )
}
