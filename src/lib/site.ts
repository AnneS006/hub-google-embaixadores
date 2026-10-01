export const site = {
  name: "Hub de Ferramentas Universitárias",
  description:
    "Licenças, créditos em nuvem e ferramentas gratuitas para estudantes, mantidos pela comunidade.",
  repo: "https://github.com/AnneS006/hub-google-embaixadores",
  branch: "main",
  contentDir: "content",
};

// Nomes de exibição das pastas de content/. A ordem aqui também é a ordem das
// seções na barra lateral. Pastas fora desta lista recebem um nome gerado a
// partir do próprio nome da pasta e vão para o fim.
export const sectionTitles: Record<string, string> = {
  guias: "Guias e Trilhas",
  "cloud-e-baas": "Cloud e BaaS",
  "dev-tools": "Dev Tools",
  "apis-de-ia": "APIs de IA",
  "gestao-e-design": "Gestão e Design",
};

export function editUrl(filePath: string) {
  return `${site.repo}/edit/${site.branch}/${site.contentDir}/${filePath}`;
}
