"use client";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CardContainer } from "@/components/ui/card-container";
import { Loader } from "@/components/ui/loader";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Modal } from "@/components/ui/modal";
import { useUser } from "@/contexts/user-context";
import { FileText, TrendingUp, BarChart3, TrendingDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import { mockReports, simulateApiCall, type Report } from "@/lib/mock-projects";

const onboardingSteps = ["Hop In", "Glow-Up", "Check Vibe", "Collections", "Tune It", "My Vibe"];
const onboardingRoutes = ["/login", "/create-project", "/view-project", "/reports", "/settings", "/profile"];

const reportIconMap = {
  monthly: FileText,
  performance: TrendingUp,
  analytics: BarChart3,
};

export default function ReportsPage() {
  const { isFirstTimeUser, currentOnboardingStep, setCurrentOnboardingStep, completeOnboarding, loading, isLoadingData, setIsLoadingData } = useUser();
  const router = useRouter();
  const [reports, setReports] = React.useState<Report[]>([]);
  const [activeCard, setActiveCard] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!loading && isFirstTimeUser) {
      setCurrentOnboardingStep(4);
    }
  }, [loading, isFirstTimeUser, setCurrentOnboardingStep]);

  React.useEffect(() => {
    const fetchReports = async () => {
      setIsLoadingData(true);
      await simulateApiCall(600);
      // For demo: show empty state for first-time users
      if (isFirstTimeUser) {
        setReports([]);
      } else {
        setReports(mockReports);
      }
      setIsLoadingData(false);
    };

    if (!loading) {
      fetchReports();
    }
  }, [loading, setIsLoadingData, isFirstTimeUser]);

  if (loading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader size="lg" className="neon-pulse" message="Spinning up the good stuff" />
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
        <main className="flex-1 ml-64 p-6 flex flex-col gap-4 bg-background">
          {isFirstTimeUser && (
            <div className="fixed inset-0 z-50 bg-background/80 dark:bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <CardContainer className="max-w-2xl w-full mx-4 relative">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                    Stack Your Vibes in Collections
                  </h2>
                  <p className="text-muted-foreground">
                    See how you're slaying—all the stats that matter
                  </p>
                </div>
                <Stepper steps={onboardingSteps} currentStep={currentOnboardingStep} />
                <div className="mt-6 flex gap-4 justify-end">
                  <Button variant="outline" onClick={handleSkip}>
                    Skip It
                  </Button>
                  <Button variant="primary" onClick={handleNext}>
                    {currentOnboardingStep === onboardingSteps.length ? "Let's Go" : "Next"}
                  </Button>
                </div>
              </CardContainer>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {reports.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <EmptyState
                  icon={<TrendingDown className="w-16 h-16" />}
                  title="Your glow stats will show up once you post"
                  description="Start creating projects and watch your collections grow! The stats are waiting to pop off."
                  actionLabel="Create First Project"
                  onAction={() => router.push("/create-project")}
                />
              </motion.div>
            ) : (
              <motion.div
                key="filled"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div 
                  className="rounded-xl p-6 transition-all duration-300 relative bg-card border border-[var(--color-neon-red)]/30 dark:border-[var(--color-neon-red)]/50 shadow-[0_0_20px_rgba(255,0,51,0.3)]"
                >
                  <h1 
                    className="text-2xl font-bold mb-6 text-[var(--color-neon-red)]"
                  >
                    Your Collections
                  </h1>

                  <div className="mb-4">
                    <h2 className="text-lg font-bold mb-4 text-card-foreground">Trending Edits</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {reports.map((report, index) => {
                      const cardId = report.id;
                      const cardData = {
                        id: cardId,
                        title: report.title,
                        desc: report.description,
                        date: new Date(report.generatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }),
                        type: report.type,
                      };
                      const isSelected = activeCard === cardId;
                      
                      return (
                        <motion.div
                          key={report.id}
                          className={`cursor-pointer relative transition-all duration-300 rounded-xl p-5 bg-card border-2 ${
                            isSelected 
                              ? "ring-2 ring-[var(--color-neon-red)] border-[var(--color-neon-red)]/60 dark:border-[var(--color-neon-red)]/70 shadow-[var(--shadow-card-hover-light),0_0_0_2px_var(--color-neon-red)] dark:shadow-[var(--shadow-card-hover-dark),0_0_0_2px_var(--color-neon-red)]" 
                              : "border-border/80 dark:border-border/50 shadow-[var(--shadow-card-light)] dark:shadow-[var(--shadow-card-dark)] hover:shadow-[var(--shadow-card-hover-light)] dark:hover:shadow-[var(--shadow-card-hover-dark)] hover:border-[var(--color-neon-purple)]/40 dark:hover:border-[var(--color-neon-red)]/50"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveCard(cardId)}
                        >
                          <h3 
                            className="font-bold mb-1 text-lg text-card-foreground"
                          >
                            {cardData.title}
                          </h3>
                          <p 
                            className="mb-2 text-sm text-muted-foreground"
                          >
                            {cardData.desc}
                          </p>
                          <p 
                            className="text-xs text-muted-foreground"
                          >
                            Generated {cardData.date}
                          </p>
                          {isSelected && cardData.id === "1" && (
                            <div className="mt-4">
                              <button
                                className="w-full py-2 px-4 rounded-lg font-bold text-white transition-all duration-300 bg-[var(--color-neon-purple)] dark:bg-[var(--color-neon-purple)] shadow-[0_0_20px_rgba(138,43,226,0.6)] hover:shadow-[0_0_25px_rgba(138,43,226,0.8)]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle generate report
                                }}
                              >
                                Generate Report
                              </button>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Modal for expanded metrics */}
                <Modal
                  open={!!activeCard}
                  onOpenChange={(open) => !open && setActiveCard(null)}
                  title={
                    activeCard === "1" ? "Monthly Report" :
                    activeCard === "2" ? "Performance" :
                    activeCard === "3" ? "Analytics" : ""
                  }
                  description={
                    activeCard === "1" ? "Snapshot of your monthly edit trends, engagement spikes, and project count." :
                    activeCard === "2" ? "Speed metrics, AI-assist usage, and top feature streaks." :
                    activeCard === "3" ? "Your content reach and vibe impact across sessions." : ""
                  }
                  footer={
                    <Button variant="primary" onClick={() => setActiveCard(null)}>
                      Close
                    </Button>
                  }
                >
                  <div className="text-center">
                    {activeCard === "1" && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Snapshot of your monthly edit trends, engagement spikes, and project count.
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]">
                            <div className="text-2xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">12</div>
                            <div className="text-xs text-muted-foreground mt-1">Total Edits</div>
                          </div>
                          <div className="p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]">
                            <div className="text-2xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">8</div>
                            <div className="text-xs text-muted-foreground mt-1">Active Projects</div>
                          </div>
                          <div className="p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]">
                            <div className="text-2xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">95%</div>
                            <div className="text-xs text-muted-foreground mt-1">Success Rate</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeCard === "2" && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Speed metrics, AI-assist usage, and top feature streaks.
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]">
                            <div className="text-2xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">2.3s</div>
                            <div className="text-xs text-muted-foreground mt-1">Avg Speed</div>
                          </div>
                          <div className="p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]">
                            <div className="text-2xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">45</div>
                            <div className="text-xs text-muted-foreground mt-1">AI Assists</div>
                          </div>
                          <div className="p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]">
                            <div className="text-2xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">12</div>
                            <div className="text-xs text-muted-foreground mt-1">Top Features</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeCard === "3" && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Your content reach and vibe impact across sessions.
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]">
                            <div className="text-2xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">1.2K</div>
                            <div className="text-xs text-muted-foreground mt-1">Total Reach</div>
                          </div>
                          <div className="p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]">
                            <div className="text-2xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">89%</div>
                            <div className="text-xs text-muted-foreground mt-1">Engagement</div>
                          </div>
                          <div className="p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]">
                            <div className="text-2xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">24</div>
                            <div className="text-xs text-muted-foreground mt-1">Sessions</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Modal>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

