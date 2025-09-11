import React, { useState, useEffect, useRef } from 'react'
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Icon,
  IconButton,
} from '@mui/material'
import { eggTypes } from '../types/eggTypes'
import EggTimerVisual from './EggTimerVisual'
import StartScreen from './StartScreen'
import { ArrowBack } from '@mui/icons-material'

type Step = 1 | 2 | 3 // 1: Start, 2: Egg selection, 3: Timer

const BoilingEggApp: React.FC = () => {
  const [step, setStep] = useState<Step>(1)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [totalTime, setTotalTime] = useState<number>(0)
  const [isBoiling, setIsBoiling] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/sounds/timer-done.mp3')
  }, [])

  const unlockAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        audioRef.current?.pause()
        audioRef.current!.currentTime = 0
      })
    }
  }

  const playSound = () => {
    audioRef.current?.play()
  }

  useEffect(() => {
    if (timeLeft === 0) {
      setIsBoiling(false)
      playSound()
      alert('Your egg is ready! 🥚🍳')
    }

    if (isBoiling && timeLeft && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, isBoiling])

  const startBoiling = (time: number) => {
    setTotalTime(time)
    setTimeLeft(time)
    setIsBoiling(true)
    setStep(3) // move to Timer screen
  }

  const progress =
    isBoiling && totalTime > 0 && timeLeft !== null
      ? (totalTime - timeLeft) / totalTime
      : 0

  const handleBack = () => {
    if (step === 3) {
      setIsBoiling(false)
      setTimeLeft(null)
      setStep(2)
    } else if (step === 2) {
      setStep(1)
    }
  }

  if (step === 1) {
    return (
      <StartScreen
        onStart={() => {
          unlockAudio()
          setStep(2)
        }}
      />
    )
  }

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          textAlign: 'center',
          py: 6,
          px: 3,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #FFFAE5 0%, #F2D19C 100%)',
          boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
        }}
      >
        {/* Top Row: Title + Back Button */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <IconButton
            size="medium"
            sx={{ color: '#53422D' }}
            onClick={handleBack}
          >
            <ArrowBack />
          </IconButton>

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#53422D',
              textAlign: 'center',
              flex: 1,
            }}
          >
            Yolked Egg Timer
          </Typography>
          {/* Empty Box to balance the Back button */}
          <Box width="64px" />
        </Box>

        <EggTimerVisual
          progress={progress}
          timeLeft={timeLeft ?? totalTime}
          size={250}
        />

        {isBoiling && timeLeft !== null ? (
          <Typography variant="h6" sx={{ color: '#7A7E7C', mt: 2 }}>
            Boiling... {timeLeft}s left
          </Typography>
        ) : (
          <Box mt={4}>
            <Typography variant="h6" sx={{ color: '#615F5A', mb: 2 }}>
              Choose your egg:
            </Typography>
            {eggTypes.map((egg) => (
              <Button
                key={egg.time}
                variant="contained"
                sx={{
                  m: 1,
                  px: 3,
                  py: 1.5,
                  borderRadius: '999px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  background: '#F2670C',
                  '&:hover': {
                    background: '#D95304',
                  },
                }}
                onClick={() => startBoiling(egg.time)}
              >
                {egg.label}
              </Button>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default BoilingEggApp
