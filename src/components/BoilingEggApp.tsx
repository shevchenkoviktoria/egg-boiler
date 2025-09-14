import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { eggTypes } from '../types/eggTypes'
import EggTimerVisual from './EggTimerVisual'
import StartScreen from './StartScreen'
import { ArrowBack } from '@mui/icons-material'

type Step = 1 | 2 | 3 // 1: Start, 2: Egg selection, 3: Timer

// Slide transition for dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const BoilingEggApp: React.FC = () => {
  const [step, setStep] = useState<Step>(1)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [totalTime, setTotalTime] = useState<number>(0)
  const [isBoiling, setIsBoiling] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    if (timeLeft === 0) {
      setIsBoiling(false)
      setOpenDialog(true) // open dialog when finished
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
    setStep(3)
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
    return <StartScreen onStart={() => setStep(2)} />
  }

  return (
    <>
      <Container maxWidth='sm'>
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
            <Box width="30px" />
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

        {/* Success Dialog */}
        <Dialog
          open={openDialog}
          slots={{
            transition: Transition,
          }}
          keepMounted
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: {
              borderRadius: '50%',
              width: 250,
              height: 250,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              p: 3,
              background: 'linear-gradient(135deg, #FFFAE5 0%, #F2D19C 100%)',
              boxShadow: '0px 8px 24px rgba(0,0,0,0.2)',
              mb: 12,
            },
          }}
          sx={{
            '& .MuiDialog-container': {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: '#53422D',
              p: 0,
              mt: 10,
            }}
          >
            I am ready! 🥚🍳
          </DialogTitle>
          <DialogContent sx={{ p: 0, mt: 1 }}>
            <Typography sx={{ color: '#615F5A' }}>
              Enjoy your perfectly boiled egg!
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 0, mt: 2 }}>
            <Button
              onClick={() => {
                setOpenDialog(false)
                setStep(2)
              }}
              variant="contained"
              sx={{
                borderRadius: '999px',
                px: 3,
                background: '#F2670C',
                '&:hover': { background: '#D95304' },
              }}
            >
              Thank you
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
}

export default BoilingEggApp
