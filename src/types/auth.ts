export type Nullable<T> = T | null | undefined;

export interface AuthSession {
	session: {
		id: string;
		userId: string;
		expiresAt: Date;
		createdAt: Date;
		updatedAt: Date;
		token: string;
		ipAddress?: string | null;
		userAgent?: string | null;
	};
	user: {
		id: string;
		name: string;
		email: string;
		role?: Nullable<string>;
		image?: Nullable<string>;
	};
}
