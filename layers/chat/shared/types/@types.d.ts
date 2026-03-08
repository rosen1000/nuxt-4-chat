export type Role = 'user' | 'assistant';

export interface ChatMessage {
	id: string;
	role: Role;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Chat {
	id: string;
	title: string;
	messages: ChatMessage[];
	projectId?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProjectChat extends Chat {
	projectId?: string;
	project: Project | null;
}

export interface Project {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}
