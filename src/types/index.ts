export interface Choice {
	text: string;
	nextId: string | null;
	media?: string;
}

export type Scene = {
	id: string;
	title: string;
	scenario: string;
	choices: Choice[];
	media?: string;
};

export type Story = Record<string, Scene>;
