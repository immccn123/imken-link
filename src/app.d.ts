// See https://kit.svelte.dev/docs/types#app

import type { z, ZodError } from "zod";

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			validateErr?: ZodError
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Session {
			userId?: number;
			isHuman: boolean;
		}

		interface ErrorResponse {
			type: 'duplicateSlug' | 'linkNotFound'
		}
	}
}

export { };
