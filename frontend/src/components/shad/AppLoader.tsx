import { motion } from "framer-motion"

const AppLoader = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex items-center justify-center">
        <motion.span
          animate={{ scale: [1, 2, 2, 1], opacity: [0.6, 0, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-12 w-12 rounded-full bg-primary/20"
        />
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-5 w-5 rounded-full bg-primary"
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-6 text-sm font-medium text-foreground"
      >
        {message}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="mt-1 text-xs text-muted-foreground"
      >
        Please wait a moment
      </motion.p>
    </motion.div>
  )
}

export default AppLoader
