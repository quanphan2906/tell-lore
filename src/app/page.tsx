"use client";

import { useState, useEffect, useMemo } from "react";
import VideoPlayer from "@/components/video-player";
import ChoiceButtons from "@/components/choice-buttons";
import EndScreen from "@/components/end-screen";
import type { Story } from "@/types";
import storyDataJson from "@/assets/story.json";

const storyData = storyDataJson.scenes as Story;

export default function Home() {
	const [currentSceneId, setCurrentSceneId] = useState<string | null>(
		"scene1"
	);
	const [videoType, setVideoType] = useState<
		"scenario" | "result_choice1" | "result_choice2"
	>("scenario");
	const [showChoices, setShowChoices] = useState(false);
	const [isEnded, setIsEnded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const currentScene = useMemo(() => {
		if (!currentSceneId) return null;
		return storyData[currentSceneId];
	}, [currentSceneId]);

	useEffect(() => {
		if (currentSceneId) {
			setVideoType("scenario");
			setShowChoices(false);
			setIsEnded(false);
		}
	}, [currentSceneId]);

	const handleVideoEnded = () => {
		if (videoType === "scenario") {
			setShowChoices(true);
			return;
		}

		if (!currentSceneId) return;

		const currentScene = storyData[currentSceneId];

		if (videoType === "result_choice1") {
			setCurrentSceneId(currentScene?.choices[0].nextId);
			return;
		}

		if (videoType === "result_choice2") {
			setCurrentSceneId(currentScene?.choices[1].nextId);
			return;
		}
	};

	const handleChoiceSelected = (choiceIndex: 1 | 2) => {
		setShowChoices(false);
		setVideoType(choiceIndex === 1 ? "result_choice1" : "result_choice2");
	};

	const handleRestart = () => {
		setCurrentSceneId("scene1");
		setIsEnded(false);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen text-white">
				<div className="text-xl">Loading story...</div>
			</div>
		);
	}

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
								videoType={videoType}
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
