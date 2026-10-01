export type Doc = {
  slug: string[];
  title: string;
  description?: string;
  content: string;
  /** Caminho relativo a content/, com barras normais. */
  filePath: string;
};

export type NavItem = {
  title: string;
  href: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};
