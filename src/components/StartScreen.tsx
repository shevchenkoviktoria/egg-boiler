import React from 'react'
import { Container, Typography, Button } from '@mui/material'
import { yellow } from '@mui/material/colors'
import EggIcon from '@mui/icons-material/Egg'
import { motion } from 'framer-motion'

interface StartScreenProps {
  onStart: () => void
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: 'center',
        paddingY: 8,
        background: 'linear-gradient(135deg, #FFFAE5 0%, #F2D19C 100%)',
        borderRadius: 4,
        boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
      }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ marginBottom: 24 }}
      >
        <EggIcon sx={{ fontSize: 100, color: yellow[800] }} />
      </motion.div>

      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#53422D' }}
      >
        Yolked Egg Timer
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mb: 4, color: '#615F5A' }}>
        Never overboiled again
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={onStart}
        sx={{
          borderRadius: '999px',
          px: 5,
          py: 1.5,
          fontSize: '1.1rem',
          background: '#F2670C',
          color: '#fff',
          '&:hover': {
            background: '#D95304',
          },
        }}
      >
        Start
      </Button>
    </Container>
  )
}

export default StartScreen
