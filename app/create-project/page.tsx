"use client";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CardContainer } from "@/components/ui/card-container";
import { Loader } from "@/components/ui/loader";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { EmptyState } from "@/components/ui/empty-state";
import { Shimmer } from "@/components/ui/shimmer";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { useUser } from "@/contexts/user-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";
import { playClickSound, initAudioContext } from "@/lib/audio-feedback";
import * as React from "react";

const onboardingSteps = ["Hop In", "Glow-Up", "Check Vibe", "Collections", "Tune It", "My Vibe"];
const onboardingRoutes = ["/login", "/create-project", "/view-project", "/reports", "/settings", "/profile"];

type CreateState = "empty" | "creating";

export default function CreateProjectPage() {
  const { isFirstTimeUser, currentOnboardingStep, setCurrentOnboardingStep, completeOnboarding, loading } = useUser();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState<CreateState>("empty");
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  React.useEffect(() => {
    initAudioContext();
    if (!loading && isFirstTimeUser) {
      setCurrentOnboardingStep(2);
    }
  }, [loading, isFirstTimeUser, setCurrentOnboardingStep]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" message="Turning pixels into magic 💅" />
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

  // Show onboarding flow for first-time users
  if (isFirstTimeUser && !loading) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 flex flex-col gap-4">
          
          <AnimatePresence mode="wait">
            {state === "empty" && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <EmptyState
                  icon={<Wand2 className="w-16 h-16" />}
                  title="Let's build your first magic board 🪄"
                  description="Create something amazing—your first project is waiting to glow up!"
                  actionLabel="Start Creating ✨"
                  onAction={() => setState("creating")}
                />
              </motion.div>
            )}

            {state === "creating" && (
              <motion.div
                key="creating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <CardContainer>
                  <h1 className="text-2xl font-semibold mb-6 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                    Start a Glow-Up
                  </h1>
                  <div className="space-y-4 max-w-md">
                    <InputField
                      label="Project Name"
                      type="text"
                      placeholder="What's this project called? 🤔"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      helperText="Make it catchy—this is your moment! ✨"
                    />
                    <InputField
                      label="Description"
                      type="text"
                      placeholder="Tell us what you're building..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      helperText="Drag-n-drop, don't overthink it 😎"
                    />
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Creating your project...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] rounded-full shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)] overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--color-neon-purple)] dark:bg-[var(--color-neon-red)] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setProgress(0);
                        const interval = setInterval(() => {
                          setProgress((prev) => {
                            if (prev >= 100) {
                              clearInterval(interval);
                              setTimeout(() => router.push("/view-project"), 500);
                              return 100;
                            }
                            return prev + 10;
                          });
                        }, 200);
                      }}
                    >
                      Let's Build It
                    </Button>
                  </div>
                </CardContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

