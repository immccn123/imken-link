import "next-auth";

declare module "next-auth" {
	export interface DefaultSession {
		userId?: string | null;
	}

	export { DefaultSession } from "next-auth";
}
