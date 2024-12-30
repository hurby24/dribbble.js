import type { Team } from "../users/types";

type Category =
	| "Graphic Designer"
	| "UI/UX Designer"
	| "Mobile Designer"
	| "Web Designer"
	| "Product Designer"
	| "Creative Director"
	| "Art Director"
	| "Interaction Designer"
	| "Motion Designer"
	| "Illustrator"
	| "Animator"
	| "Brand Designer"
	| "Mobile Developer"
	| "Front-end Developer"
	| "Other";

type RoleType = "full-time" | "part-time" | "freelance" | "contract";

export interface Job {
	id: number;
	organization_name: string;
	title: string;
	location: string;
	url: string;
	link_to_apply: string;
	description: string;
	category?: Category;
	role_type?: RoleType;
	website?: string;
	twitter?: string;
	instagram?: string;
	facebook?: string;
	created_at: string;
	updated_at: string;
	active: boolean;
	starts_at?: string;
	ends_at?: string;
	team?: Team | null;
}

export interface CreateJobParams {
	organization_name: string;
	title: string;
	location: string;
	link_to_apply: string;
	description: string;
	active?: boolean;
	team?: string | number;
	category?: Category;
	role_type?: RoleType;
	website?: string;
	twitter?: string;
	instagram?: string;
	facebook?: string;
	onsite_or_remote?: boolean;
	onsite_only?: boolean;
	remote_only?: boolean;
}

export interface UpdateJobParams {
	organization_name?: string;
	title?: string;
	location?: string;
	link_to_apply?: string;
	description?: string;
	active?: boolean;
	team?: string | number;
	category?: Category;
	role_type?: RoleType;
	website?: string;
	twitter?: string;
	instagram?: string;
	facebook?: string;
}
