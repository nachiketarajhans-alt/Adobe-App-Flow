"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { CardContainer } from "@/components/ui/card-container";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";
import { Loader } from "@/components/ui/loader";
import { Mail, Lock, User, LogIn, UserPlus, Sparkles } from "lucide-react";

type LoginState = "splash" | "form" | "success";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<LoginState>("splash");
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const { loading, setUserData, setIsFirstTimeUser, userData } = useUser();

  // Show splash screen for 2 seconds, then show form
  useEffect(() => {
    if (!loading && state === "splash") {
      const timer = setTimeout(() => {
        setState("form");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const finalName = name || email.split("@")[0];
    setUserName(finalName);

    // Set user data
    setUserData({
      id: "1",
      name: finalName,
      email,
      phone: "",
    });

    // If signup, mark as first time user
    if (!isLogin) {
      setIsFirstTimeUser(true);
    }

    setIsLoading(false);
    setState("success");

    // Redirect after showing success message
    setTimeout(() => {
      router.push("/view-project");
    }, 2000);
  };

  const handleSSO = async (provider: "adobe") => {
    setIsLoading(true);
    // Simulate SSO authentication
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const finalName = "Adobe User";
    setUserName(finalName);
    
    setUserData({
      id: "1",
      name: finalName,
      email: "user@adobe.com",
      phone: "",
    });

    setIsLoading(false);
    setState("success");

    // Redirect after showing success message
    setTimeout(() => {
      router.push("/view-project");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader size="lg" className="neon-pulse" message="Polishing your vibe ✨" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Theme Toggle in top right */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {state === "splash" && (
          <motion.div
            key="splash"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <CardContainer className="relative overflow-hidden text-center py-16">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-purple)]/10 dark:from-[var(--color-neon-red)]/10 to-transparent pointer-events-none" />
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10"
              >
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)] neon-pulse" />
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-purple)]/60 dark:from-[var(--color-neon-red)] dark:to-[var(--color-neon-red)]/60 bg-clip-text text-transparent">
                  Neon Edit
                </h1>
                <p className="text-muted-foreground">Making magic happen ✨</p>
              </motion.div>
            </CardContainer>
          </motion.div>
        )}

        {state === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Main Login/Signup Card */}
            <CardContainer className="relative overflow-hidden">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-purple)]/5 dark:from-[var(--color-neon-red)]/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-purple)]/60 dark:from-[var(--color-neon-red)] dark:to-[var(--color-neon-red)]/60 bg-clip-text text-transparent">
              Neon Edit
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Hop back in! 👋" : "Let's get you started 🚀"}
            </p>
          </div>

          {/* Toggle between Login and Signup */}
          <div className="flex gap-2 mb-6 p-1 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] rounded-xl shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)]">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-[var(--color-neon-purple)] dark:bg-[var(--color-neon-red)] text-white shadow-[0_0_15px_var(--color-neon-purple)] dark:shadow-[0_0_15px_var(--color-neon-red)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </div>
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-[var(--color-neon-purple)] dark:bg-[var(--color-neon-red)] text-white shadow-[0_0_15px_var(--color-neon-purple)] dark:shadow-[0_0_15px_var(--color-neon-red)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </div>
            </button>
          </div>

          {/* SSO Button */}
          <Button
            variant="outline"
            className="w-full mb-6 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] shadow-[var(--shadow-neomorph-light)] dark:shadow-[var(--shadow-neomorph-dark)] border-0 hover:shadow-[var(--shadow-neomorph-light),0_0_15px_var(--color-neon-purple)] dark:hover:shadow-[var(--shadow-neomorph-dark),0_0_15px_var(--color-neon-red)] transition-all duration-300"
            onClick={() => handleSSO("adobe")}
            disabled={isLoading}
          >
            <div className="flex items-center justify-center gap-3">
              <svg
                className="w-5 h-5 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.966 22.624l-1.226-5.034-2.214-4.902H12.5l1.214 2.488 1.214 2.487 1.214-2.487 1.214-2.488h2.214l-2.214 4.902-1.226 5.034h-1.214zm5.624-9.576h-2.43l-1.214-2.488-1.214-2.487-1.214 2.487-1.214 2.488H8.314l1.214-2.488 1.214-2.487L12.5 8.56l1.214 2.488 1.214 2.488 1.214-2.488L17.356 8.56l1.214 2.488h-1.214zM12.5 2.488L8.314 8.56h2.43l1.214-2.488L12.5 3.584l1.214 2.488 1.214 2.488h2.43L12.5 2.488z" />
              </svg>
              <span className="font-medium">Sign in with Adobe</span>
            </div>
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] px-2 text-muted-foreground">
                Or keep it classic 📧
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <InputField
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            )}
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
                error={
                  confirmPassword && password !== confirmPassword
                    ? "Passwords do not match"
                    : undefined
                }
              />
            )}

            {isLogin && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)] hover:underline"
                >
                  Oops, forgot? 😅
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading || (!isLogin && password !== confirmPassword)}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader size="sm" />
                  <span>Getting you in... ✨</span>
                </div>
              ) : (
                <span>{isLogin ? "Hop In 🚀" : "Let's Go! ✨"}</span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            {isLogin ? (
              <>
                New here?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)] hover:underline font-medium"
                >
                  Join the vibe ✨
                </button>
              </>
            ) : (
              <>
                Already vibing?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)] hover:underline font-medium"
                >
                  Hop back in 🚀
                </button>
              </>
            )}
          </p>
        </div>
      </CardContainer>
          </motion.div>
        )}

        {state === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <CardContainer className="relative overflow-hidden text-center py-16">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-purple)]/10 dark:from-[var(--color-neon-red)]/10 to-transparent pointer-events-none" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative z-10"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-neon-purple)] dark:bg-[var(--color-neon-red)] flex items-center justify-center neon-pulse">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                  Welcome back, {userName}! 🎉
                </h2>
                <p className="text-muted-foreground mb-4">Let's glow up ✨</p>
                <Loader size="sm" message="Taking you there..." />
              </motion.div>
            </CardContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
