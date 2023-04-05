export interface UserProfile {
	_id: string;
	roles: string[];
	email: string;
	login: string;
	image?: string | null;
}
