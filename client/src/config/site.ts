
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TaskFlow",
  description: "Organize your projects with TaskFlow - A powerful, intuitive task management tool. Create boards, manage tasks, and collaborate with your team efficiently.",
  url: "https://taskflownow.vercel.app",
  keywords: ["task management", "project management", "kanban board", "taskflow", "productivity", "team collaboration", "project planning"],

  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/3T3OTA",
    docs: "https://heroui.com",
  },
  sidebar: [
    {
      label: "Boards",
      href: "/u/boards",
      icon: "boards",
    },
    {
      label: "Account",
      href: "/u/profile",
      icon: "user",
    },
  ]
};
