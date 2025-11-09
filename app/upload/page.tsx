"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, Loader2, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CardContainer } from "@/components/ui/card-container";
import { useUser } from "@/contexts/user-context";

export default function UploadPage() {
  const router = useRouter();
  const { isFirstTimeUser } = useUser();
  const [isReturning, setIsReturning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const returning = localStorage.getItem("isReturningUser") === "true";
    setIsReturning(returning);
    // Show modal for returning users, full page for first-timers
    if (returning && !isFirstTimeUser) {
      setShowModal(true);
    }
  }, [isFirstTimeUser]);

  const handleFileSelect = (file: File) => {
    if (!file) return;
    setFileName(file.name);
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            localStorage.setItem("isReturningUser", "true");
            router.push(`/edit?id=${encodeURIComponent(file.name)}`);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 180);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/view-project");
  };

  // Modal for returning users
  if (showModal && isReturning) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 p-6">
            <div className="fixed inset-0 z-50 bg-background/80 dark:bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
              >
                <CardContainer className="relative overflow-hidden">
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                      Quick Upload
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Drop your file or click to browse
                    </p>
                    <UploadZone
                      onFileSelect={handleFileSelect}
                      isDragging={isDragging}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      uploading={uploading}
                      uploadProgress={uploadProgress}
                      fileName={fileName}
                      fileInputRef={fileInputRef}
                      onFileInput={handleFileInput}
                    />
                  </div>
                </CardContainer>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Full page for first-time users
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center h-[80vh] text-center"
          >
            <CardContainer className="w-full max-w-2xl p-8">
              <h1 className="text-3xl font-bold mb-2 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
                Upload Your Project
              </h1>
              <p className="text-muted-foreground mb-8">
                Drop your files here or click to browse. Let's make some magic! ✨
              </p>
              <UploadZone
                onFileSelect={handleFileSelect}
                isDragging={isDragging}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                uploading={uploading}
                uploadProgress={uploadProgress}
                fileName={fileName}
                fileInputRef={fileInputRef}
                onFileInput={handleFileInput}
              />
            </CardContainer>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  uploading: boolean;
  uploadProgress: number;
  fileName: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadZone({
  onFileSelect,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  uploading,
  uploadProgress,
  fileName,
  fileInputRef,
  onFileInput,
}: UploadZoneProps) {
  return (
    <div className="w-full">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 cursor-pointer
          ${
            isDragging
              ? "border-[var(--color-neon-purple)] dark:border-[var(--color-neon-red)] bg-[var(--color-neon-purple)]/10 dark:bg-[var(--color-neon-red)]/10 shadow-[0_0_20px_var(--color-neon-purple)] dark:shadow-[0_0_20px_var(--color-neon-red)]"
              : "border-border hover:border-[var(--color-neon-purple)]/50 dark:hover:border-[var(--color-neon-red)]/50 hover:bg-accent/50"
          }
          ${uploading ? "pointer-events-none opacity-75" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={onFileInput}
          accept="image/*,video/*"
        />

        <AnimatePresence mode="wait">
          {uploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="w-12 h-12 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)] animate-spin" />
              <div className="w-full max-w-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {fileName}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-red)] rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-shimmer" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="p-4 rounded-full bg-[var(--color-neon-purple)]/10 dark:bg-[var(--color-neon-red)]/10">
                <UploadCloud className="w-12 h-12 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
              </div>
              <div>
                <p className="text-lg font-semibold mb-1">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports images and videos
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

