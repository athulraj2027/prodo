export interface NavItem {
  label: string;
  id: string;
}

export interface AuthNavItem {
  label: string;
  link: string;
  comingSoon: boolean;
}

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  //   { label: "About Me", id: "about" },
  //   { label: "Projects", id: "projects" },
  //   { label: "Skills", id: "skills" },
  //   { label: "Contact", id: "contact" },
];

export const AUTH_NAV_ITEMS: AuthNavItem[] = [
  { label: "Dashboard", link: "dashboard", comingSoon: false },
  { label: "DSA dashboard", link: "dashboard/dsa", comingSoon: true },
  { label: "Analytics", link: "dashboard/analytics", comingSoon: true },
  { label: "Set Goals", link: "dashboard/goals", comingSoon: true },
  { label: "Daily Tasks", link: "dashboard/daily-tasks", comingSoon: true },
  { label: "Give Feedback", link: "dashboard/feedback", comingSoon: true },
];
