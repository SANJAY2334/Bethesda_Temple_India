import { motion } from 'framer-motion'


export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#fff9d2]">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="absolute h-28 w-28 rounded-full border border-[#8cc0eb]/40"
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <img
  src="/Church icon.svg"
  alt="Bethesda Temple"
  className="h-20 w-20 object-contain"
/>
      </motion.div>
    </div>
  )
}