export type Doc = {
  slug: string[];
  title: string;
  description?: string;
  /** Posição na barra lateral (menor primeiro); sem order, vai para o fim. */
  order?: number;
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

export type Heading = {
  id: string;
  text: string;
};
