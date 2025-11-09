"use client";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CardContainer } from "@/components/ui/card-container";
import { Loader } from "@/components/ui/loader";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useUser } from "@/contexts/user-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";

const onboardingSteps = ["Hop In", "Glow-Up", "Check Vibe", "Collections", "Tune It", "My Vibe"];
const onboardingRoutes = ["/login", "/create-project", "/view-project", "/reports", "/settings", "/profile"];

export default function LoginPage() {
  const { isFirstTimeUser, currentOnboardingStep, setCurrentOnboardingStep, completeOnboarding, loading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      if (isFirstTimeUser) {
        setCurrentOnboardingStep(1);
      } else {
        // Returning user - redirect to view-project
        router.push("/view-project");
      }
    }
  }, [loading, isFirstTimeUser, setCurrentOnboardingStep, router]);

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
                    Welcome! Let's get started 🎉
                  </h2>
                  <p className="text-muted-foreground">
                    We'll show you around—it's gonna be fire! 🔥
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
          
          <CardContainer>
            <h1 className="text-2xl font-semibold mb-6 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
              Hop Back In
            </h1>
            <div className="space-y-4 max-w-md">
              <InputField
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" className="w-full">
                Hop In
              </Button>
            </div>
          </CardContainer>
        </main>
      </div>
    </div>
  );
}

