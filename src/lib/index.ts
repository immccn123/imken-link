export class PanicError extends Error { }

export function panic(message: string): never {
	throw new PanicError(message);
}
