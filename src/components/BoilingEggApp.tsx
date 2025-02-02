import React, { useState, useEffect } from "react";
import { Container, Typography, Button, CircularProgress } from "@mui/material";
import EggIcon from "@mui/icons-material/Egg";
import { motion } from "framer-motion";
import { eggTypes } from "../types/eggTypes";

const BoilingEggApp: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isBoiling, setIsBoiling] = useState(false);

  const playSound = () => {
    const audio = new Audio("/sounds/timer-done.mp3");
    audio.play();
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setIsBoiling(false);
      playSound();
      alert("Your egg is ready! 🥚🍳");
    }

    if (isBoiling && timeLeft && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isBoiling]);

  const startBoiling = (time: number) => {
    setTimeLeft(time);
    setIsBoiling(true);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
        padding: 4,
        backgroundColor: "#FFFAE5",
        borderRadius: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        🥚 Cute Egg Boiler
      </Typography>
      <motion.div
        animate={{ rotate: isBoiling ? 360 : 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <EggIcon sx={{ fontSize: 100, color: "#FFC107" }} />
      </motion.div>
      {isBoiling && timeLeft !== null ? (
        <>
          <Typography variant="h6" mt={2}>
            Boiling... {timeLeft}s left
          </Typography>
          <CircularProgress
            variant="determinate"
            value={(timeLeft / 10) * 100}
            sx={{ marginTop: 2 }}
          />
        </>
      ) : (
        <>
          <Typography variant="h6" mt={2}>
            Choose your egg:
          </Typography>
          {eggTypes.map((egg) => (
            <Button
              key={egg.time}
              variant="contained"
              sx={{ m: 1 }}
              onClick={() => startBoiling(egg.time)}
            >
              {egg.label}
            </Button>
          ))}
        </>
      )}
    </Container>
  );
};

export default BoilingEggApp;
