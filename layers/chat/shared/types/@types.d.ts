export type Role = 'user' | 'assistant';

export interface ChatMessage {
	id: string;
	role: Role;
	content: string;
	createdAt: Date;
	updatedAt: Data;
}

export interface Chat {
	id: string;
	title: string;
	messages: ChatMessage[];
	projectId?: string;
	createdAt: Date;
	updatedAt: Data;
}

export interface ProjectChat extends Chat {
	projectId: string;
	project: Project | null;
}

export interface Project {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Data;
}
