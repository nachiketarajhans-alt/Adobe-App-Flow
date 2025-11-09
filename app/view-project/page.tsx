"use client";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CardContainer } from "@/components/ui/card-container";
import { Loader } from "@/components/ui/loader";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useUser } from "@/contexts/user-context";
import { FolderKanban, Calendar, Users, Image as ImageIcon, Upload, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import { mockProjects, simulateApiCall, type Project } from "@/lib/mock-projects";

const onboardingSteps = ["Hop In", "Glow-Up", "Check Vibe", "Collections", "Tune It", "My Vibe"];
const onboardingRoutes = ["/login", "/create-project", "/view-project", "/reports", "/settings", "/profile"];

const iconMap = {
  FolderKanban,
  Calendar,
  Users,
};

type ViewState = "empty" | "grid" | "preview";

export default function ViewProjectPage() {
  const { isFirstTimeUser, currentOnboardingStep, setCurrentOnboardingStep, completeOnboarding, loading, isLoadingData, setIsLoadingData, userData } = useUser();
  const router = useRouter();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  // Extract first name from user's full name
  const firstName = userData?.name?.split(" ")[0] || "Your";

  React.useEffect(() => {
    if (!loading && isFirstTimeUser) {
      setCurrentOnboardingStep(3);
    }
  }, [loading, isFirstTimeUser, setCurrentOnboardingStep]);

  React.useEffect(() => {
    const fetchProjects = async () => {
      setIsLoadingData(true);
      await simulateApiCall(800);
      // For demo: show empty state for first-time users, otherwise show projects
      if (isFirstTimeUser) {
        setProjects([]);
      } else {
        setProjects(mockProjects);
      }
      setIsLoadingData(false);
    };

    if (!loading) {
      fetchProjects();
    }
  }, [loading, setIsLoadingData, isFirstTimeUser]);

  if (loading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader size="lg" className="neon-pulse" message="Hold up—AI's cooking 🔮" />
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
                    Check Your Vibe
                  </h2>
                  <p className="text-muted-foreground">
                    All your projects in one place—looking fire! 🔥
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
            {projects.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <EmptyState
                  icon={<ImageIcon className="w-16 h-16" />}
                  title="No edits yet — drop your first selfie 🔥"
                  description="Your projects will appear here once you start creating. Time to make some magic! ✨"
                  actionLabel="Create First Project 🚀"
                  onAction={() => router.push("/create-project")}
                />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-semibold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]"
                  >
                    {firstName}'s Photos
                  </motion.h1>
                  
                  {/* Upload + Edit Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3 mt-4 mb-6"
                  >
                    <button
                      data-slot="button"
                      onClick={() => router.push("/upload")}
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[&>svg]:px-2.5 relative overflow-hidden hover:shadow-[0_0_8px_var(--color-neon-purple)] dark:hover:shadow-[0_0_8px_var(--color-neon-red)]"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </button>
                    <button
                      data-slot="button"
                      onClick={() => router.push("/edit?id=demo")}
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[&>svg]:px-2.5 relative overflow-hidden hover:shadow-[0_0_8px_var(--color-neon-purple)] dark:hover:shadow-[0_0_8px_var(--color-neon-red)]"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                  </motion.div>

                  {/* Image Cards Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {projects.map((project, index) => {
                      const isHovered = hoveredProject === project.id;
                      // Map project names to emoji icons
                      const projectEmoji = project.name.includes("Anime") ? "🎨" : 
                                          project.name.includes("Cartoon") ? "🖼️" : 
                                          project.name.includes("Painting") ? "🎭" : 
                                          project.name.includes("Photos") ? "📷" : "✨";
                      
                      return (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                          onHoverStart={() => setHoveredProject(project.id)}
                          onHoverEnd={() => setHoveredProject(null)}
                          className="relative"
                        >
                          <div
                            className="bg-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.02] relative border-2 border-border/80 dark:border-border/50 shadow-[var(--shadow-card-light)] dark:shadow-[var(--shadow-card-dark)] hover:shadow-[var(--shadow-card-hover-light)] dark:hover:shadow-[var(--shadow-card-hover-dark)] hover:border-[var(--color-neon-purple)]/40 dark:hover:border-[var(--color-neon-red)]/50"
                            style={{ borderRadius: "16px" }}
                          >
                            {/* Top Visual Area - Red Maroon Background */}
                            <div 
                              className="w-full h-48 flex items-center justify-center relative bg-[#4A0000] dark:bg-[#6A0000]"
                              style={{ 
                                borderTopLeftRadius: "16px",
                                borderTopRightRadius: "16px"
                              }}
                            >
                              <div className="text-6xl">{projectEmoji}</div>
                            </div>
                            
                            {/* Content Area - Theme-aware Background */}
                            <div className="p-4 bg-card">
                              {/* Project Title */}
                              <h3 className="text-lg font-bold text-card-foreground mb-1 flex items-center gap-2">
                                <span>{project.name} {projectEmoji}</span>
                              </h3>
                              
                              {/* Description */}
                              <p className="text-sm text-muted-foreground mb-3 mt-1">
                                {project.description}
                              </p>
                              
                              {/* Progress Section */}
                              <div className="mt-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full rounded-full transition-all bg-[var(--color-neon-red)]"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${project.progress}%` }}
                                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                    />
                                  </div>
                                  <span className="text-xs text-card-foreground font-normal whitespace-nowrap">{project.progress}%</span>
                                </div>
                                <span className="text-xs text-muted-foreground font-normal mt-1 block">
                                  {project.tasks} edits done
                                </span>
                              </div>
                            </div>
                          </div>
                          
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

