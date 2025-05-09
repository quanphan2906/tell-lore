"use client";

import { useState, useRef, useEffect } from "react";

interface VideoPlayerProps {
	sceneId: string;
	videoType: "scenario" | "result_choice1" | "result_choice2";
	onEnded: () => void;
}

export default function VideoPlayer({
	sceneId,
	videoType,
	onEnded,
}: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const videoSrc = `/assets/videos/${sceneId}/${videoType}.mp4`;

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		if (videoRef.current) {
			videoRef.current.load();
		}
	}, [sceneId, videoType]);

	const handleCanPlay = () => {
		setIsLoading(false);
		if (videoRef.current) {
			videoRef.current.play().catch((err) => {
				console.log(err);
				setError("Failed to play video. Please click to start.");
			});
		}
	};

	const handleError = () => {
		setIsLoading(false);
		setError(`Failed to load video: ${videoSrc}`);
	};

	const handleClick = () => {
		if (videoRef.current && videoRef.current.paused) {
			videoRef.current.play().catch((err) => {
				console.error("Failed to play on click:", err);
			});
		}
	};

	return (
		<div className="relative w-full bg-black rounded-lg overflow-hidden shadow-xl">
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
					<div className="text-white">Loading video...</div>
				</div>
			)}
			{error && (
				<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
					<div className="text-white text-center p-4">
						<p>{error}</p>
						<button
							className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
							onClick={handleClick}
						>
							Try Again
						</button>
					</div>
				</div>
			)}

			<video
				ref={videoRef}
				className="w-full aspect-video"
				onEnded={onEnded}
				onCanPlay={handleCanPlay}
				onError={handleError}
				onClick={handleClick}
				playsInline
				muted
			>
				<source src={videoSrc} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	);
}
