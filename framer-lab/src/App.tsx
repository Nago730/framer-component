import { motion } from "framer-motion";

export default function App() {
  return (
    // Tailwind 4의 강력한 유틸리티 클래스 활용
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-white">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex size-48 cursor-pointer items-center justify-center rounded-3xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500"
      >
        <h1 className="text-2xl font-black italic tracking-tighter">V4 LAB</h1>
      </motion.div>
    </div>
  );
}