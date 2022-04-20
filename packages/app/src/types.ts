export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	photoURL?: string;
	role?: string;
	online: boolean;
}

export interface Role {
	id: string;
	name: string;
	permissions: string[];
}
