"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { Loader } from "@/components/ui/loader";
import { CardContainer } from "@/components/ui/card-container";
import { Modal } from "@/components/ui/modal";
import { Stepper } from "@/components/ui/stepper";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function ComponentsDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Setup", "Configure", "Review", "Complete"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 space-y-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
              Component Showcase 🎨
            </h1>

            {/* Buttons */}
            <CardContainer>
              <h2 className="text-xl font-semibold mb-4">Buttons That Hit Different 🔥</h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="neon-glow">Neon Glow</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </CardContainer>

            {/* Input Fields */}
            <CardContainer>
              <h2 className="text-xl font-semibold mb-4">Input Fields That Get It 💅</h2>
              <div className="space-y-4">
                <InputField label="Email" type="email" placeholder="Enter your email" />
                <InputField label="Password" type="password" placeholder="Enter password" />
                <InputField
                  label="With Error"
                  error="This field is required"
                  placeholder="Invalid input"
                />
              </div>
            </CardContainer>

            {/* Loader */}
            <CardContainer>
              <h2 className="text-xl font-semibold mb-4">Loaders That Vibe ✨</h2>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-sm mb-2">Spinner (Small)</p>
                  <Loader size="sm" />
                </div>
                <div>
                  <p className="text-sm mb-2">Spinner (Medium)</p>
                  <Loader size="md" />
                </div>
                <div>
                  <p className="text-sm mb-2">Spinner (Large)</p>
                  <Loader size="lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-2">Skeleton</p>
                  <Loader variant="skeleton" />
                </div>
              </div>
            </CardContainer>

            {/* Stepper */}
            <CardContainer>
              <h2 className="text-xl font-semibold mb-4">Stepper Progress 🚀</h2>
              <Stepper steps={steps} currentStep={currentStep} />
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                  disabled={currentStep === steps.length}
                >
                  Next
                </Button>
              </div>
            </CardContainer>

            {/* Modal */}
            <CardContainer>
              <h2 className="text-xl font-semibold mb-4">Modal Popups 💫</h2>
              <Modal
                open={modalOpen}
                onOpenChange={setModalOpen}
                trigger={<Button variant="neon-glow">Open Modal ✨</Button>}
                title="Neomorphic Modal"
                description="This modal hits different—neon glow borders that pop! 🔥"
                footer={
                  <>
                    <Button variant="outline" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setModalOpen(false)}>
                      Confirm
                    </Button>
                  </>
                }
              >
                <p className="text-foreground">
                  This modal demonstrates the neomorphic styling with neon glow effects.
                  The border glows with purple in light mode and red in dark mode.
                </p>
              </Modal>
            </CardContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

