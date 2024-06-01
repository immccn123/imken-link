"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function requireSession() {
	const session = useSession();
	if (session.status === "unauthenticated") redirect("/$/login");

	return {
		user: session.data?.user,
		userId: session.data?.userId,
		update: session.update,
	};
}

export function preventSession(fallback?: string) {
	const session = useSession();
	if (session.status === "authenticated") redirect(fallback ?? "/$/dashboard");
}
