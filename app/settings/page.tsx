"use client";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CardContainer } from "@/components/ui/card-container";
import { Loader } from "@/components/ui/loader";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useUser } from "@/contexts/user-context";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { setAudioEnabled, getAudioEnabled, initAudioContext } from "@/lib/audio-feedback";
import * as React from "react";

const onboardingSteps = ["Hop In", "Glow-Up", "Check Vibe", "Collections", "Tune It", "My Vibe"];
const onboardingRoutes = ["/login", "/create-project", "/view-project", "/reports", "/settings", "/profile"];

type SettingsState = "edit" | "success";

export default function SettingsPage() {
  const { isFirstTimeUser, currentOnboardingStep, setCurrentOnboardingStep, completeOnboarding, loading } = useUser();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [audioFeedback, setAudioFeedback] = useState(getAudioEnabled());
  const [state, setState] = useState<SettingsState>("edit");
  const router = useRouter();

  React.useEffect(() => {
    initAudioContext();
  }, []);

  React.useEffect(() => {
    if (!loading && isFirstTimeUser) {
      setCurrentOnboardingStep(5);
    }
  }, [loading, isFirstTimeUser, setCurrentOnboardingStep]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const handleNext = () => {
    if (currentOnboardingStep < onboardingSteps.length) {
      const nextStep = currentOnboardingStep + 1;
      setCurrentOnboardingStep(nextStep);
      router.push(onboardingRoutes[nextStep - 1]);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 flex flex-col gap-4">
          {isFirstTimeUser && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <CardContainer className="max-w-2xl w-full mx-4 relative">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                    Tune It Up
                  </h2>
                  <p className="text-muted-foreground">
                    Make it yours—customize everything to match your vibe!
                  </p>
                </div>
                <Stepper steps={onboardingSteps} currentStep={currentOnboardingStep} />
                <div className="mt-6 flex gap-4 justify-end">
                  <Button variant="outline" onClick={handleSkip}>
                    Skip It 😎
                  </Button>
                  <Button variant="primary" onClick={handleNext}>
                    {currentOnboardingStep === onboardingSteps.length ? "Let's Go! ✨" : "Next → 🚀"}
                  </Button>
                </div>
              </CardContainer>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {state === "edit" && (
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <CardContainer>
                  <h1 className="text-2xl font-semibold mb-6 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                    Tune It Up
                  </h1>
                  <div className="space-y-6 max-w-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Notifications</label>
                        <p className="text-xs text-muted-foreground">Stay in the loop 📱</p>
                      </div>
                      <Switch checked={notifications} onCheckedChange={setNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Email Updates</label>
                        <p className="text-xs text-muted-foreground">Get the tea in your inbox 📧</p>
                      </div>
                      <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Audio Feedback</label>
                        <p className="text-xs text-muted-foreground">Play sounds for interactions 🔊</p>
                      </div>
                      <Switch
                        checked={audioFeedback}
                        onCheckedChange={(checked) => {
                          setAudioFeedback(checked);
                          setAudioEnabled(checked);
                        }}
                      />
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setState("success");
                        setTimeout(() => setState("edit"), 2000);
                      }}
                    >
                      Save It ✨
                    </Button>
                  </div>
                </CardContainer>
              </motion.div>
            )}

            {state === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <CardContainer className="text-center py-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle2 className="w-20 h-20 mx-auto mb-4 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
                    <h2 className="text-2xl font-bold mb-2 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                      Settings updated
                    </h2>
                    <p className="text-muted-foreground">Your preferences are saved!</p>
                  </motion.div>
                </CardContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

