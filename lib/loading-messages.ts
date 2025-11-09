export const loadingMessages = [
  "Polishing your vibe ✨",
  "Turning pixels into magic 💅",
  "Hold up—AI's cooking 🔮",
  "Spinning up the good stuff 🎨",
  "Almost there, bestie! ⚡",
  "Making it look fire 🔥",
  "Loading the vibes 🌟",
  "Cooking up something fresh 👨‍🍳",
];

export const getRandomLoadingMessage = () => {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
};

