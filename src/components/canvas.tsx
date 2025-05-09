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
			title: "Scene 1",
			scenario: "You see a strange light in the sky.",
			choices: [
				{ text: "Follow it", id: "choice-0" },
				{ text: "Ignore it", id: "choice-1" },
			],
		},
	},
	{
		id: "scene2",
		type: "sceneNode",
		position: { x: 500, y: 50 },
		data: {
			title: "Scene 2",
			scenario: "You walk into the forest.",
			choices: [],
		},
	},
	{
		id: "scene3",
		type: "sceneNode",
		position: { x: 500, y: 200 },
		data: {
			title: "Scene 3",
			scenario: "You go back to sleep.",
			choices: [],
		},
	},
];

const initialEdges: Edge[] = [];

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
