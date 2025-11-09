"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Camera } from "lucide-react";
import { useTheme } from "next-themes";

// Camera API function - replace with your actual API endpoint
async function openCameraAPI(): Promise<void> {
  // Check if we're on mobile/device with camera access
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Camera is now open - you can handle the stream here
      // For now, we'll just log it. In production, you'd process the video stream
      console.log("Camera opened successfully");
      
      // Stop the stream after a moment (or handle it based on your use case)
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
      }, 100);
    } catch (error) {
      console.error("Error accessing camera:", error);
      // Fallback: try to open camera app on mobile
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // For mobile devices, you might want to trigger a file input or use a different approach
        alert("Please allow camera access to use Vibe Mode");
      }
    }
  } else {
    // Fallback for devices without camera API
    alert("Camera not available on this device");
  }
}

export function VibeModeToggle() {
  const [vibeMode, setVibeMode] = React.useState(false);
  const [isOpeningCamera, setIsOpeningCamera] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (vibeMode) {
      document.documentElement.classList.add("vibe-mode");
      // Open camera when Vibe Mode is turned ON
      setIsOpeningCamera(true);
      openCameraAPI()
        .then(() => {
          setIsOpeningCamera(false);
        })
        .catch((error) => {
          console.error("Failed to open camera:", error);
          setIsOpeningCamera(false);
          // Optionally turn off vibe mode if camera fails
          // setVibeMode(false);
        });
    } else {
      document.documentElement.classList.remove("vibe-mode");
    }
  }, [vibeMode]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => setVibeMode(!vibeMode)}
        className="relative overflow-hidden"
        disabled={isOpeningCamera}
      >
        <motion.div
          animate={vibeMode ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isOpeningCamera ? (
            <Camera className="w-4 h-4 mr-2 animate-pulse text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
          ) : vibeMode ? (
            <Sparkles className="w-4 h-4 mr-2 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
          ) : (
            <Zap className="w-4 h-4 mr-2" />
          )}
        </motion.div>
        <span>
          {isOpeningCamera
            ? "Opening Camera..."
            : vibeMode
            ? "Vibe Mode ON ✨"
            : "Vibe Mode"}
        </span>
        {vibeMode && !isOpeningCamera && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon-purple)]/20 dark:from-[var(--color-neon-red)]/20 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </Button>
    </motion.div>
  );
}

