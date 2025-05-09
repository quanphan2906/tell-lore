"use client";

import { motion } from "framer-motion";

interface ChoiceButtonsProps {
	choices: string[] | undefined;
	onChoiceSelected: (choiceIndex: 1 | 2) => void;
}

export default function ChoiceButtons({
	choices,
	onChoiceSelected,
}: ChoiceButtonsProps) {
	if (!choices) return null;

	return (
		<motion.div
			className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{choices.map((choice, index) => (
				<motion.button
					key={index}
					className="px-6 py-3 bg-transparent text-white rounded-lg hover:bg-opacity-90 transition-all flex-1 max-w-xs text-center border"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => onChoiceSelected((index + 1) as 1 | 2)}
				>
					{choice}
				</motion.button>
			))}
		</motion.div>
	);
}
