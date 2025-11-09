"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Edit3, 
  Save, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Share2,
  X,
  CheckCircle2
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CardContainer } from "@/components/ui/card-container";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";

export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isFirstTimeUser } = useUser();
  const [fileName, setFileName] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fileId = searchParams.get("id");
    if (fileId) {
      setFileName(decodeURIComponent(fileId));
    } else {
      router.push("/upload");
    }

    // Show modal for returning users
    const returning = localStorage.getItem("isReturningUser") === "true";
    if (returning && !isFirstTimeUser) {
      setShowModal(true);
    }
  }, [searchParams, router, isFirstTimeUser]);

  const handleSave = () => {
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/view-project");
  };

  if (!fileName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Modal for returning users
  if (showModal && !isFirstTimeUser) {
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
                className="w-full max-w-4xl"
              >
                <CardContainer className="relative overflow-hidden">
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <EditInterface
                    fileName={fileName}
                    zoom={zoom}
                    setZoom={setZoom}
                    rotation={rotation}
                    onRotate={handleRotate}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    onSave={handleSave}
                    saved={saved}
                  />
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
            className="w-full"
          >
            <CardContainer className="p-6">
              <EditInterface
                fileName={fileName}
                zoom={zoom}
                setZoom={setZoom}
                rotation={rotation}
                onRotate={handleRotate}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSave={handleSave}
                saved={saved}
              />
            </CardContainer>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

interface EditInterfaceProps {
  fileName: string;
  zoom: number;
  setZoom: (zoom: number) => void;
  rotation: number;
  onRotate: () => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onSave: () => void;
  saved: boolean;
}

function EditInterface({
  fileName,
  zoom,
  setZoom,
  rotation,
  onRotate,
  isEditing,
  setIsEditing,
  onSave,
  saved,
}: EditInterfaceProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]">
            Editing: {fileName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Make your edits and save when ready
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="gap-2"
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? "Stop Editing" : "Start Editing"}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            disabled={!isEditing}
            className="gap-2"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-border/50">
        <button
          onClick={() => setZoom(Math.max(50, zoom - 10))}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
          disabled={zoom <= 50}
        >
          <ZoomOut className="w-4 h-4 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
        </button>
        <span className="text-sm font-medium min-w-[60px] text-center">
          {zoom}%
        </span>
        <button
          onClick={() => setZoom(Math.min(200, zoom + 10))}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
          disabled={zoom >= 200}
        >
          <ZoomIn className="w-4 h-4 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
        </button>
        <div className="w-px h-6 bg-border mx-2" />
        <button
          onClick={onRotate}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <RotateCw className="w-4 h-4 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
        </button>
        <div className="w-px h-6 bg-border mx-2" />
        <button
          onClick={() => alert("Download started ⚡")}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <Download className="w-4 h-4 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
        </button>
        <button
          onClick={() => alert("Share feature coming soon 🚀")}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <Share2 className="w-4 h-4 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
        </button>
      </div>

      {/* Preview Area */}
      <div className="relative w-full h-[500px] rounded-xl border-2 border-border overflow-hidden bg-muted/20 flex items-center justify-center">
        <motion.div
          animate={{
            scale: zoom / 100,
            rotate: rotation,
          }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="w-64 h-64 rounded-lg bg-gradient-to-br from-[var(--color-neon-purple)]/20 to-[var(--color-neon-red)]/20 flex items-center justify-center border-2 border-dashed border-[var(--color-neon-purple)]/30 dark:border-[var(--color-neon-red)]/30">
            <div className="text-center">
              <Edit3 className="w-16 h-16 mx-auto mb-2 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
              <p className="text-sm font-medium">{fileName}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Preview Area
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status Message */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 rounded-lg bg-[var(--color-neon-purple)]/10 dark:bg-[var(--color-neon-red)]/10 border border-[var(--color-neon-purple)]/30 dark:border-[var(--color-neon-red)]/30"
          >
            <CheckCircle2 className="w-5 h-5 text-[var(--color-neon-purple)] dark:text-[var(--color-neon-red)]" />
            <span className="text-sm font-medium">
              Changes saved successfully! ✨
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

