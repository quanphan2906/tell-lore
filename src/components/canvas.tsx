"use client";

import {
	ReactFlow,
	ReactFlowProvider,
	addEdge,
	Background,
	Controls,
	Handle,
	Position,
	useNodesState,
	useEdgesState,
	Connection,
	Edge,
	Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useCallback, useState, useEffect } from "react";
import Link from "next/link";

const SceneNode = ({
	id,
	data,
	setNodes,
	showVideo,
}: {
	id: string;
	data: {
		title: string;
		scenario: string;
		choices: { text: string; id: string; nextId?: string }[];
	};
	setNodes: (updater: (nds: any[]) => any[]) => void;
	showVideo: boolean;
}) => {
	// Local state for inputs to avoid re-render causing lost focus
	const [localTitle, setLocalTitle] = useState(data.title);
	const [localScenario, setLocalScenario] = useState(data.scenario);
	const [localChoices, setLocalChoices] = useState(data.choices);

	// Sync local state with global data when the node loads/updates externally
	useEffect(() => {
		setLocalTitle(data.title);
		setLocalScenario(data.scenario);
		setLocalChoices(data.choices);
	}, [data.title, data.scenario, data.choices]);

	// Update global node state on blur events:
	const commitFieldUpdate = (field: "title" | "scenario", value: string) => {
		setNodes((nds) =>
			nds.map((node) =>
				node.id === id
					? { ...node, data: { ...node.data, [field]: value } }
					: node
			)
		);
	};

	const commitChoiceUpdate = (index: number, value: string) => {
		const updatedChoices = localChoices.map((choice, idx) =>
			idx === index ? { ...choice, text: value } : choice
		);
		setNodes((nds) =>
			nds.map((node) => {
				if (node.id !== id) return node;
				return {
					...node,
					data: { ...node.data, choices: updatedChoices },
				};
			})
		);
	};

	return (
		<div className="p-4 rounded shadow min-w-[250px] border border-gray-300 bg-[#FDF3E6] text-[#8E5E50]">
			{showVideo && (
				<video
					src={`/assets/videos/${id}.mp4`}
					autoPlay
					muted
					loop
					playsInline
					className="mb-2 rounded w-[360px] h-[200px] object-cover"
				/>
			)}
			<input
				className="font-bold w-full mb-1"
				value={localTitle}
				onChange={(e) => setLocalTitle(e.target.value)}
				onBlur={(e) => commitFieldUpdate("title", e.target.value)}
			/>
			<textarea
				className="text-sm w-full mb-2"
				value={localScenario}
				onChange={(e) => setLocalScenario(e.target.value)}
				onBlur={(e) => commitFieldUpdate("scenario", e.target.value)}
				rows={4}
			/>
			<Handle type="target" position={Position.Left} />
			<div className="mt-3 space-y-2">
				{localChoices.map((choice, index) => (
					<div key={index}>
						<div className="p-2 border bg-[#8E5E50] rounded flex items-center gap-2">
							<input
								className="text-xs flex-1 rounded px-1 py-0.5 text-[#FDF3E6]"
								value={choice.text}
								onChange={(e) => {
									const newText = e.target.value;
									setLocalChoices((prev) =>
										prev.map((ch, i) =>
											i === index
												? { ...ch, text: newText }
												: ch
										)
									);
								}}
								onBlur={(e) =>
									commitChoiceUpdate(index, e.target.value)
								}
							/>
							<Handle
								type="source"
								position={Position.Right}
								id={choice.id}
								style={{ top: 80 + index * 30 }}
							/>
						</div>
						{index === 0 && localChoices.length > 1 && (
							<div className="text-[10px] text-center text-gray-500 my-1">
								or
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

const initialNodes: Node[] = [
	{
		id: "scene1",
		type: "sceneNode",
		position: { x: 100, y: 100 },
		data: {
			title: "The Whispering Path",
			scenario:
				"Lina steps onto a mossy forest path, her red backpack bouncing gently. A breeze carries a soft whisper from two directions — one from a shaded glade, the other from a sunlit trail.",
			choices: [
				{ text: "Follow the shaded glade", id: "choice-0" },
				{ text: "Take the sunny trail", id: "choice-1" },
			],
		},
	},
	{
		id: "scene2",
		type: "sceneNode",
		position: { x: 600, y: 30 },
		data: {
			title: "Spirit Playground",
			scenario:
				"The glade opens into a small clearing where forest spirits play tag, leaping from mushrooms to rocks. One gestures for Lina to join.",
			choices: [
				{ text: "Join the game", id: "choice-0" },
				{ text: "Sit and watch", id: "choice-1" },
			],
		},
	},
	{
		id: "scene3",
		type: "sceneNode",
		position: { x: 600, y: 300 },
		data: {
			title: "The Hat Cat’s Invitation",
			scenario:
				"The cat with the hat tilts its head and gestures toward a small garden gate. 'Picnic?' it purrs, pawing a blueberry tart.",
			choices: [
				{ text: "Join the picnic", id: "choice-0" },
				{ text: "Explore past the gate", id: "choice-1" },
			],
		},
	},
	{
		id: "scene4",
		type: "sceneNode",
		position: { x: 1100, y: 180 },
		data: {
			title: "The Meadow of Goodbyes",
			scenario:
				"No matter the path, Lina now finds herself at a golden meadow. The spirits wave. The hat cat tips his hat. A breeze lifts her hair — it’s time to return.",
			choices: [
				{ text: "Say thank you", id: "choice-0" },
				{ text: "Ask to stay longer", id: "choice-1" },
			],
		},
	},
];

const initialEdges: Edge[] = [
	// scene1 choices
	{
		id: "e-scene1-choice-0-scene2",
		source: "scene1",
		sourceHandle: "choice-0",
		target: "scene2",
	},
	{
		id: "e-scene1-choice-1-scene3",
		source: "scene1",
		sourceHandle: "choice-1",
		target: "scene3",
	},

	// scene2 choices
	{
		id: "e-scene2-choice-0-scene4",
		source: "scene2",
		sourceHandle: "choice-0",
		target: "scene4",
	},
	{
		id: "e-scene2-choice-1-scene4",
		source: "scene2",
		sourceHandle: "choice-1",
		target: "scene4",
	},

	// scene3 choices
	{
		id: "e-scene3-choice-0-scene4",
		source: "scene3",
		sourceHandle: "choice-0",
		target: "scene4",
	},
	{
		id: "e-scene3-choice-1-scene4",
		source: "scene3",
		sourceHandle: "choice-1",
		target: "scene4",
	},
];

export default function StoryCanvas() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [showVideos, setShowVideos] = useState(false);

	const onConnect = useCallback(
		(connection: Connection) => {
			setEdges((eds) => addEdge({ ...connection, animated: true }, eds));

			// Update choice.nextId in source node
			const { source, sourceHandle, target } = connection;
			setNodes((nds) =>
				nds.map((node) => {
					if (node.id !== source) return node;
					const updatedChoices = node.data.choices.map((choice) =>
						choice.id === sourceHandle
							? { ...choice, nextId: target }
							: choice
					);
					return {
						...node,
						data: { ...node.data, choices: updatedChoices },
					};
				})
			);
		},
		[setEdges, setNodes]
	);

	const addNewScene = () => {
		const newId = `scene${nodes.length + 1}`;
		const newNode = {
			id: newId,
			type: "sceneNode",
			position: { x: 250, y: 100 + nodes.length * 100 },
			data: {
				title: `Scene ${nodes.length + 1}`,
				scenario: "Describe what happens in this scene...",
				choices: [
					{ text: "Choice 1", id: "choice-0" },
					{ text: "Choice 2", id: "choice-1" },
				],
			},
		};
		setNodes((nds) => [...nds, newNode]);
	};

	const nodeTypes = {
		sceneNode: (props) => (
			<SceneNode {...props} setNodes={setNodes} showVideo={showVideos} />
		),
	};

	const handleExport = () => {
		const storyObject = Object.fromEntries(
			nodes.map((node) => [node.id, node.data])
		);

		const json = JSON.stringify(storyObject, null, 2);

		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "story2.json";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleSubmitStory = () => {
		// handleExport();

		// Delay video reveal by ~3.5 seconds
		setTimeout(() => {
			setShowVideos(true);
		}, 3500);
	};

	return (
		<div style={{ width: "100%", height: "100vh", position: "relative" }}>
			<div
				style={{
					position: "absolute",
					top: 16,
					left: 16,
					zIndex: 10,
					display: "flex",
					gap: "12px",
				}}
			>
				<button
					onClick={addNewScene}
					style={{
						padding: "8px 12px",
						border: "1px solid #ccc",
						borderRadius: "6px",
						cursor: "pointer",
						fontWeight: "bold",
					}}
					className="bg-[#8E5E50] text-[#FDF3E6]"
				>
					+ Add Scene
				</button>

				<button
					onClick={handleSubmitStory}
					style={{
						padding: "8px 12px",
						border: "1px solid #ccc",
						borderRadius: "6px",
						cursor: "pointer",
						fontWeight: "bold",
					}}
					className="bg-[#8E5E50] text-[#FDF3E6]"
				>
					Submit Story
				</button>

				<Link
					href="/"
					style={{
						padding: "8px 12px",
						border: "1px solid #ccc",
						borderRadius: "6px",
						cursor: "pointer",
						fontWeight: "bold",
					}}
					className="bg-[#8E5E50] text-[#FDF3E6]"
				>
					View Story
				</Link>
			</div>
			<ReactFlowProvider>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					fitView
				>
					<Controls />
					<Background />
				</ReactFlow>
			</ReactFlowProvider>
		</div>
	);
}
