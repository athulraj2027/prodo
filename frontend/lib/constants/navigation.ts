export interface NavItem {
  label: string;
  id: string;
}

export interface AuthNavItem {
  label: string;
  link: string;
}

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  //   { label: "About Me", id: "about" },
  //   { label: "Projects", id: "projects" },
  //   { label: "Skills", id: "skills" },
  //   { label: "Contact", id: "contact" },
];

export const AUTH_NAV_ITEMS: AuthNavItem[] = [
  { label: "Dashboard", link: "dashboard" },
  { label: "DSA", link: "dsa" },
  { label: "Analytics", link: "analytics" },
  { label: "Goals", link: "goals" },
];
