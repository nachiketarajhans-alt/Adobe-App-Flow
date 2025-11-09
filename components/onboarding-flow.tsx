"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardContainer } from "@/components/ui/card-container";
import { Sparkles, Palette, Wand2, Rocket, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import { playClickSound, playSuccessSound, initAudioContext } from "@/lib/audio-feedback";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  illustration?: React.ReactNode;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to Neon Edit! 🎉",
    description: "Your creative hub for making magic happen. Let's get you started!",
    icon: <Sparkles className="w-12 h-12" />,
  },
  {
    id: "vibe",
    title: "Pick Your Vibe 🎨",
    description: "Choose your style and let your creativity flow. We've got all the tools you need!",
    icon: <Palette className="w-12 h-12" />,
  },
  {
    id: "test",
    title: "Test Your Edit ✨",
    description: "Try out our editing tools and see the magic happen. It's easier than you think!",
    icon: <Wand2 className="w-12 h-12" />,
  },
  {
    id: "ready",
    title: "Ready to Create? 🚀",
    description: "You're all set! Time to start creating amazing projects and let your creativity shine.",
    icon: <Rocket className="w-12 h-12" />,
  },
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();
  const { completeOnboarding } = useUser();

  useEffect(() => {
    initAudioContext();
  }, []);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      playClickSound();
    } else {
      // Final step - show confetti and redirect
      playSuccessSound();
      setShowConfetti(true);
      completeOnboarding();
      setTimeout(() => {
        router.push("/create-project");
      }, 1500);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    router.push("/view-project");
  };

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 z-10"
      >
        <X className="w-4 h-4" />
        <span>Skip to App →</span>
      </button>

      <div className="w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index <= currentStep
                  ? "bg-[var(--color-neon-purple)] dark:bg-[var(--color-neon-red)]"
                  : "bg-border"
              }`}
              initial={{ width: index === currentStep ? "2rem" : "0.5rem" }}
              animate={{
                width: index <= currentStep ? "2rem" : "0.5rem",
                opacity: index <= currentStep ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Main Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <CardContainer className="relative overflow-hidden">
              {/* Neon Border Animation */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, 
                    var(--color-neon-purple) 0%, 
                    var(--color-neon-red) 50%, 
                    var(--color-neon-purple) 100%)`,
                  backgroundSize: "200% 100%",
                  padding: "2px",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="absolute inset-[2px] rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]" />

              <div className="relative z-10 p-8 md:p-12 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="w-24 h-24 rounded-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)] flex items-center justify-center text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)] neon-pulse">
                    {currentStepData.icon}
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]"
                >
                  {currentStepData.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
                >
                  {currentStepData.description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleNext}
                    className="text-lg px-8 py-6"
                  >
                    {isLastStep ? "Let's Glow! 🚀" : "Next ✨"}
                  </Button>
                </motion.div>
              </div>
            </CardContainer>
          </motion.div>
        </AnimatePresence>

        {/* Step Indicators (Dots) */}
        <div className="flex justify-center gap-3 mt-8">
          {onboardingSteps.map((step, index) => (
            <motion.button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentStep
                  ? "bg-[var(--color-neon-purple)] dark:bg-[var(--color-neon-red)] scale-125"
                  : "bg-border hover:bg-muted-foreground"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

