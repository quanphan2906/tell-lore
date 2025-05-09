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
			title: "The Signal in the Sky",
			scenario:
				"It's been weeks since the world went quiet. No networks. No broadcasts. Tonight, a single beam of light pulses from the distant mountains, piercing the clouds.",
			choices: [
				{ text: "Follow the light", id: "choice-0" },
				{ text: "Stay and observe", id: "choice-1" },
			],
		},
	},
	{
		id: "scene2",
		type: "sceneNode",
		position: { x: 600, y: 50 },
		data: {
			title: "Crossing the Wastes",
			scenario:
				"The highway is cracked and overgrown. You pass collapsed overpasses and rusted-out cars. A faint humming noise begins to trail you.",
			choices: [
				{ text: "Investigate the sound", id: "choice-0" },
				{ text: "Keep moving", id: "choice-1" },
			],
		},
	},
	{
		id: "scene3",
		type: "sceneNode",
		position: { x: 600, y: 300 },
		data: {
			title: "Patterns and Paranoia",
			scenario:
				"The signal pulses again, and this time, something responds — a rhythmic flicker from a nearby hilltop. You realize you may not be the only one watching.",
			choices: [
				{ text: "Climb to the hill", id: "choice-0" },
				{ text: "Leave a signal back", id: "choice-1" },
			],
		},
	},
	{
		id: "scene4",
		type: "sceneNode",
		position: { x: 1100, y: 180 },
		data: {
			title: "The Threshold",
			scenario:
				"Whether you traveled far or stayed and observed, you now stand on the edge of something vast. The light pulses steadily. A door-shaped silhouette appears before you.",
			choices: [
				{ text: "Enter the doorway", id: "choice-0" },
				{ text: "Turn away", id: "choice-1" },
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
