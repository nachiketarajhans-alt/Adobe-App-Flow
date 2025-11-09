"use client";

// Audio feedback utility for micro-interactions
// Uses Web Audio API to generate subtle click/tap sounds

let audioContext: AudioContext | null = null;
let isEnabled = true;

export function initAudioContext() {
  if (typeof window !== "undefined" && !audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
}

export function playClickSound() {
  if (!isEnabled || !audioContext) return;

  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.warn("Audio feedback error:", error);
  }
}

export function playSuccessSound() {
  if (!isEnabled || !audioContext) return;

  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.warn("Audio feedback error:", error);
  }
}

export function setAudioEnabled(enabled: boolean) {
  isEnabled = enabled;
  if (enabled && !audioContext) {
    initAudioContext();
  }
}

export function getAudioEnabled() {
  return isEnabled;
}

