export interface User {
	uid: string;
	email: string;
	firstName: string;
	lastName: string;
	photoURL?: string;
	role?: string;
	online: boolean;
}

export interface Role {
	name: string;
	editTours: boolean;
	editPanels: boolean;
	editRoles: boolean;
	manageUsers: boolean;
}
