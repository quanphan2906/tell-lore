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
import { useCallback } from "react";

const SceneNode = ({
	data,
}: {
	data: {
		title: string;
		scenario: string;
		choices: { text: string; id: string }[];
	};
}) => {
	return (
		<div className="p-4 bg-white rounded shadow min-w-[200px] border border-gray-300">
			<div className="font-bold">{data.title}</div>
			<div className="text-sm text-gray-700 my-2">{data.scenario}</div>
			<Handle type="target" position={Position.Left} />
			{data.choices?.map((choice, index) => (
				<div key={index} className="mt-2 flex items-center">
					<span className="text-xs">{choice.text}</span>
					<Handle
						type="source"
						position={Position.Right}
						id={choice.id}
						style={{ top: 80 + index * 20 }}
					/>
				</div>
			))}
		</div>
	);
};

const nodeTypes = {
	sceneNode: SceneNode,
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

	const onConnect = useCallback(
		(connection: Connection) => {
			setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
		},
		[setEdges]
	);

	return (
		<div style={{ width: "100%", height: "100vh" }}>
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
