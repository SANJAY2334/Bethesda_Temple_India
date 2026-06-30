import { motion } from 'framer-motion'
import { pageVariants } from '@/utils/animations'

export function PageTransition({ children }) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-shell"
    >
      {children}
    </motion.main>
  )
}
