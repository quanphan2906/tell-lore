"use client";

import { useState, useMemo } from "react";
import VideoPlayer from "@/components/video-player";
import ChoiceButtons from "@/components/choice-buttons";
import EndScreen from "@/components/end-screen";
import type { Story } from "@/types";
import storyDataJson from "@/assets/story.json";

const storyData = storyDataJson as Story;

export default function Home() {
	const [currentSceneId, setCurrentSceneId] = useState<string | null>(
		"scene1"
	);
	const currentScene = useMemo(() => {
		if (!currentSceneId) return null;
		return storyData[currentSceneId];
	}, [currentSceneId]);
	const [showChoices, setShowChoices] = useState(false);
	const [isEnded, setIsEnded] = useState(false);

	const handleVideoEnded = () => {
		setShowChoices(true);
	};

	const handleChoiceSelected = (choiceIndex: 1 | 2) => {
		setShowChoices(false);
		setCurrentSceneId(
			currentScene?.choices[choiceIndex - 1].nextId ?? null
		);
	};

	const handleRestart = () => {
		setCurrentSceneId("scene1");
		setIsEnded(false);
	};

	return (
		<main className="flex flex-col items-center justify-center ">
			<div className="w-full">
				{isEnded ? (
					<EndScreen onRestart={handleRestart} />
				) : (
					currentSceneId && (
						<>
							<VideoPlayer
								sceneId={currentSceneId}
								onEnded={handleVideoEnded}
							/>
							{showChoices && (
								<ChoiceButtons
									choices={currentScene?.choices.map(
										(choice) => choice.text
									)}
									onChoiceSelected={handleChoiceSelected}
								/>
							)}
						</>
					)
				)}
			</div>
		</main>
	);
}
