"use client";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CardContainer } from "@/components/ui/card-container";
import { Loader } from "@/components/ui/loader";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { Modal } from "@/components/ui/modal";
import { useUser } from "@/contexts/user-context";
import { User, Edit3, BarChart3, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";

const onboardingSteps = ["Hop In", "Glow-Up", "Check Vibe", "Collections", "Tune It", "My Vibe"];

type ProfileState = "minimal" | "edit" | "stats";

export default function ProfilePage() {
  const { isFirstTimeUser, currentOnboardingStep, setCurrentOnboardingStep, completeOnboarding, loading, userData, setUserData } = useUser();
  const [name, setName] = useState(userData?.name || "John Doe");
  const [email, setEmail] = useState(userData?.email || "john.doe@example.com");
  const [phone, setPhone] = useState(userData?.phone || "+1 (555) 123-4567");
  const [state, setState] = useState<ProfileState>("minimal");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && isFirstTimeUser) {
      setCurrentOnboardingStep(6);
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
    completeOnboarding();
    router.push("/view-project");
  };

  const handleSkip = () => {
    completeOnboarding();
    router.push("/view-project");
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
                    My Vibe
                  </h2>
                  <p className="text-muted-foreground">
                    Last step! Make your pic Insta-ready in one tap 📸
                  </p>
                </div>
                <Stepper steps={onboardingSteps} currentStep={currentOnboardingStep} />
                <div className="mt-6 flex gap-4 justify-end">
                  <Button variant="outline" onClick={handleSkip}>
                    Skip It 😎
                  </Button>
                  <Button variant="primary" onClick={handleNext}>
                    {currentOnboardingStep === onboardingSteps.length ? "We're Done! 🎉" : "Next → 🚀"}
                  </Button>
                </div>
              </CardContainer>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {state === "minimal" && (
              <motion.div
                key="minimal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <CardContainer>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                      My Vibe
                    </h1>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditModalOpen(true)}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setState("stats")}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Stats
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)] flex items-center justify-center">
                      <User className="w-10 h-10 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{name}</h2>
                      <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                  </div>
                </CardContainer>
              </motion.div>
            )}

            {state === "stats" && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <CardContainer>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                      My Stats
                    </h1>
                    <Button variant="outline" size="sm" onClick={() => setState("minimal")}>
                      Back
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CardContainer variant="elevated" className="text-center py-6">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
                      <div className="text-3xl font-bold mb-1">12</div>
                      <div className="text-sm text-muted-foreground">Edits done</div>
                    </CardContainer>
                    <CardContainer variant="elevated" className="text-center py-6">
                      <Sparkles className="w-12 h-12 mx-auto mb-3 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
                      <div className="text-3xl font-bold mb-1">8</div>
                      <div className="text-sm text-muted-foreground">Templates used</div>
                    </CardContainer>
                    <CardContainer variant="elevated" className="text-center py-6">
                      <BarChart3 className="w-12 h-12 mx-auto mb-3 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
                      <div className="text-3xl font-bold mb-1">95%</div>
                      <div className="text-sm text-muted-foreground">Success rate</div>
                    </CardContainer>
                  </div>
                </CardContainer>
              </motion.div>
            )}
          </AnimatePresence>

          <Modal
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            title="Edit Profile"
            description="Update your profile information"
            footer={
              <>
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setUserData({
                      id: userData?.id || "1",
                      name,
                      email,
                      phone,
                    });
                    setIsEditModalOpen(false);
                  }}
                >
                  Save My Vibe ✨
                </Button>
              </>
            }
          >
            <div className="space-y-4">
              <InputField
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                helperText="Make your pic Insta-ready in one tap"
              />
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText="Keep it fresh, keep it real."
              />
              <InputField
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                helperText="Just in case we need to slide into your DMs."
              />
            </div>
          </Modal>
        </main>
      </div>
    </div>
  );
}

