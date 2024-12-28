export interface Project {
	id: number;
	name: string;
	description: string;
	shots_count: number;
	created_at: string;
	updated_at: string;
}

export interface ProjectParams {
	name: string;
	description?: string;
}
