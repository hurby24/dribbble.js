import type { Project } from "../projects/types";
import type { Team } from "../users/types";

export interface Shot {
	id: number;
	title: string;
	description: string;
	width: number;
	height: number;
	images: {
		hidpi: string | null;
		normal: string;
		one_x: string | null;
		two_x: string | null;
		four_x: string | null;
		teaser: string;
	};
	published_at: string | null;
	scheduled_for: string | null;
	updated_at: string;
	html_url: string;
	animated: boolean;
	tags: string[];
	attachments: Attachment[];
	projects: Project[];
	team: Team;
	video?: Video;
	low_profile: boolean;
}

export interface Attachment {
	id: number;
	url: string;
	thumbnail_url: string;
	size: number;
	content_type: string;
	created_at: string;
}

export interface Video {
	id: number;
	duration: number;
	video_file_name: string;
	video_file_size: number;
	width: number;
	height: number;
	silent: boolean;
	created_at: string;
	updated_at: string;
	url: string;
	small_preview_url: string;
	large_preview_url: string;
	xlarge_preview_url: string;
}

export interface UpdateShotParams {
	title?: string;
	description?: string;
	tags?: string[];
	low_profile?: boolean;
	scheduled_for?: string;
	team_id?: number;
}
