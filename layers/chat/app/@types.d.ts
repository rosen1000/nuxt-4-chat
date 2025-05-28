export type Role = 'user' | 'assistant';

export interface ChatMessage {
	id: string;
	role: Role;
	content: string;
}

export interface Chat {
	id: string;
	title: string;
	messages: ChatMessage[];
	projectId?: string;
	createdAt: Date;
	updatedAt: Data;
}

export interface Project {
	id: string;
	name: string;
}
