const theme1 = {
  theme: "mono-minimal",

  background: {
    page: "#FAFAFA",
    card: "#FFFFFF",
    surface: "#F5F5F5",
    inverse: "#09090B",
    overlay: "rgba(9,9,11,0.5)",
  },

  primary: {
    subtle: "#F5F5F5",
    border: "#D4D4D4",
    default: "#09090B",
    hover: "#27272A",
    text: "#3F3F46",
  },

  secondary: {
    subtle: "#F4F4F5",
    border: "#E4E4E7",
    default: "#71717A",
    hover: "#52525B",
    text: "#3F3F46",
  },

  accent: {
    subtle: "#F4F4F5",
    border: "#A1A1AA",
    default: "#18181B",
    hover: "#09090B",
    text: "#27272A",
  },

  text: {
    primary: "#09090B",
    secondary: "#71717A",
    muted: "#A1A1AA",
    link: "#18181B",
    inverse: "#FAFAFA",
    onPrimary: "#FFFFFF",
  },

  border: {
    default: "#E4E4E7",
    strong: "#D4D4D8",
    focus: "#09090B",
  },

  sidebar: {
    bg: "#09090B",
    text: "#D4D4D8",
    muted: "#52525B",
    active: "#FFFFFF",
  },

  status: {
    success: { bg: "#F0FDF4", border: "#BBF7D0", default: "#166534" },
    warning: { bg: "#FFFBEB", border: "#FDE68A", default: "#92400E" },
    danger: { bg: "#FEF2F2", border: "#FECACA", default: "#991B1B" },
    neutral: { bg: "#F4F4F5", border: "#E4E4E7", default: "#52525B" },
  },
};

const theme2 = {
  theme: "warm-terracotta",

  background: {
    page: "#FAFAF8",
    card: "#FFFFFF",
    surface: "#FDF8F4",
    inverse: "#1C1917",
    overlay: "rgba(28,25,23,0.45)",
  },

  primary: {
    subtle: "#FDF0EB",
    border: "#F5C4A8",
    default: "#C2572B",
    hover: "#A8431F",
    text: "#7C2D12",
  },

  secondary: {
    subtle: "#F1F5F9",
    border: "#CBD5E1",
    default: "#334155",
    hover: "#1E293B",
    text: "#0F172A",
  },

  accent: {
    subtle: "#FFFBEB",
    border: "#FDE68A",
    default: "#D97706",
    hover: "#B45309",
    text: "#92400E",
  },

  text: {
    primary: "#1C1917",
    secondary: "#78716C",
    muted: "#A8A29E",
    link: "#C2572B",
    inverse: "#FAFAF8",
    onPrimary: "#FFFFFF",
  },

  border: {
    default: "#E8E2DA",
    strong: "#D4C9BC",
    focus: "#C2572B",
  },

  sidebar: {
    bg: "#1C1917",
    text: "#D6D3D1",
    muted: "#78716C",
    active: "#C2572B",
    activeBg: "#27211E",
    activeHover: "#332A26",
  },

  interactive: {
    hover: "#FDF8F4",
    selected: "#FDF0EB",
    focus: "#C2572B",
    disabled: "#A8A29E",
  },

  status: {
    success: { bg: "#F0FDF4", border: "#BBF7D0", default: "#166534" },
    warning: { bg: "#FFFBEB", border: "#FDE68A", default: "#92400E" },
    danger: { bg: "#FEF2F2", border: "#FECACA", default: "#991B1B" },
    neutral: { bg: "#F5F4F1", border: "#D3D1C7", default: "#5F5E5A" },
  },

  rent: {
    paid: { bg: "#F0FDF4", border: "#BBF7D0", default: "#166534" },
    due: { bg: "#FFFBEB", border: "#FDE68A", default: "#92400E" },
    overdue: { bg: "#FEF2F2", border: "#FECACA", default: "#991B1B" },
    vacant: { bg: "#F5F4F1", border: "#D3D1C7", default: "#5F5E5A" },
  },
};

export { theme1, theme2 };
