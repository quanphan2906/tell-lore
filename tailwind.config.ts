// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
	theme: {
		extend: {
			colors: {
				cream: "#FDF3E6",
				cocoa: "#8E5E50",
				terracotta: "#E2725B",
			},
			fontFamily: {
				sans: ["var(--font-sans)", "sans-serif"],
				serif: ["var(--font-serif)", "serif"],
			},
		},
	},
};

export default config;
