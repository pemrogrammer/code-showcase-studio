"use client";

import { createContext, useContext } from "react";
import type { AuthSession } from "@/types/auth";

const SessionContext = createContext<AuthSession | null>(null);

export function SessionProvider({
	value,
	children,
}: {
	value: AuthSession | null;
	children: React.ReactNode;
}) {
	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
}

export function useSession() {
	return useContext(SessionContext);
}
