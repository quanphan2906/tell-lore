"use client";

import { motion } from "framer-motion";

interface EndScreenProps {
	onRestart: () => void;
}

export default function EndScreen({ onRestart }: EndScreenProps) {
	return (
		<motion.div
			className="flex flex-col items-center justify-center bg-black bg-opacity-80 rounded-lg p-8 min-h-[300px]"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<motion.h1
				className="text-4xl font-bold text-white mb-8"
				initial={{ y: -20 }}
				animate={{ y: 0 }}
				transition={{ delay: 0.5, duration: 0.5 }}
			>
				The End
			</motion.h1>

			<motion.p
				className="text-gray-300 mb-8 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 0.5 }}
			>
				Thank you for experiencing this interactive story.
			</motion.p>

			<motion.button
				className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5, duration: 0.5 }}
				onClick={onRestart}
			>
				Restart Story
			</motion.button>
		</motion.div>
	);
}
