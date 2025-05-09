import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const EBGaramond = localFont({
	src: "../assets/fonts/EBGaramond-VariableFont_wght.ttf",
	variable: "--font-ebgaramond",
	weight: "100 900",
});
const FiraSans = localFont({
	src: "../assets/fonts/FiraSans-Regular.ttf",
	variable: "--font-fira-sans",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Storytelling",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${EBGaramond.variable} ${FiraSans.variable}`}
		>
			<body className="antialiased">{children}</body>
		</html>
	);
}
