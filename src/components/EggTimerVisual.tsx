import React from 'react'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import EggIcon from '@mui/icons-material/Egg'

type EggTimerVisualProps ={
  progress: number
  timeLeft: number
  size?: number
}

const EggTimerVisual: React.FC<EggTimerVisualProps> = ({
  progress,
  size = 200,
}) => {
  const strokeWidth = 10
  const radius = 50 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  return (
    <Box
      position="relative"
      width={size}
      height={size}
      mx="auto"
      my={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Progress ring */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#FFC107"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={(1 - progress) * circumference}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>

      <motion.div
        style={{
          width: size * 0.5,
          height: size * 0.5,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <EggIcon sx={{ width: '100%', height: '100%', color: '#F2B134' }} />
      </motion.div>
    </Box>
  )
}

export default EggTimerVisual
