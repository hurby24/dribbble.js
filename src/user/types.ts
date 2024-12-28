export interface User {
	id: number;
	name: string;
	login: string;
	html_url: string;
	avatar_url: string;
	bio: string;
	location: string;
	links: {
		web: string;
		twitter: string;
	};
	can_upload_shot: boolean;
	pro: boolean;
	followers_count: number;
	created_at: string;
	type: string;
	teams: Team[];
}

export interface Team {
	id: number;
	name: string;
	login: string;
	html_url: string;
	avatar_url: string;
	bio: string;
	location: string;
	links: {
		web: string;
		twitter: string;
	};
	type: string;
	created_at: string;
	updated_at: string;
}
