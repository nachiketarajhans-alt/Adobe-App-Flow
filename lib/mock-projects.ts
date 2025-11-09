export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "scheduled" | "completed" | "on-hold";
  tasks: number;
  progress: number;
  dueDate?: string;
  teamSize?: number;
  icon?: string;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Anime Edit",
    description: "Making anime magic happen ✨",
    status: "active",
    tasks: 5,
    progress: 65,
    dueDate: "2024-12-15",
    teamSize: 3,
    icon: "FolderKanban",
  },
  {
    id: "2",
    name: "Cartoon Edit",
    description: "Scheduled for next week 🎨",
    status: "scheduled",
    tasks: 8,
    progress: 0,
    dueDate: "2024-12-20",
    teamSize: 5,
    icon: "Calendar",
  },
  {
    id: "3",
    name: "Painting Edit",
    description: "Team collab going crazy 🔥",
    status: "active",
    tasks: 12,
    progress: 45,
    dueDate: "2024-12-30",
    teamSize: 8,
    icon: "Users",
  },
  {
    id: "4",
    name: "My Photos",
    description: "High priority—this is fire! 💯",
    status: "active",
    tasks: 15,
    progress: 80,
    dueDate: "2024-12-10",
    teamSize: 4,
    icon: "FolderKanban",
  },
  {
    id: "5",
    name: "Anime Vibes",
    description: "On hold—waiting for approval ⏸️",
    status: "on-hold",
    tasks: 3,
    progress: 20,
    teamSize: 2,
    icon: "Calendar",
  },
  {
    id: "6",
    name: "Cartoon Magic",
    description: "Completed and looking fire! 🎉",
    status: "completed",
    tasks: 10,
    progress: 100,
    dueDate: "2024-11-30",
    teamSize: 6,
    icon: "Users",
  },
];

export interface Report {
  id: string;
  title: string;
  description: string;
  type: "monthly" | "performance" | "analytics";
  generatedAt: string;
  data?: any;
}

export const mockReports: Report[] = [
  {
    id: "1",
    title: "Monthly Report",
    description: "View this month's activity",
    type: "monthly",
    generatedAt: "2024-12-01",
  },
  {
    id: "2",
    title: "Performance",
    description: "Track your metrics",
    type: "performance",
    generatedAt: "2024-12-05",
  },
  {
    id: "3",
    title: "Analytics",
    description: "Detailed insights",
    type: "analytics",
    generatedAt: "2024-12-08",
  },
];

// Simulate API call delay
export const simulateApiCall = (delay: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

