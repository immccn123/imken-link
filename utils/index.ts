import { Dispatch, SetStateAction } from "react";
import { InputOnChangeData } from "semantic-ui-react";
import { ZodError, z } from "zod";

export function abort(message: string): never {
	throw new Error(message);
}

export function toFormString(obj: Record<string, string>) {
	return Object.entries(obj)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
}

export function parseInt(value: any): number {
	return z.coerce.number().parse(value);
}

export function tryParseInt(value: any): number | undefined {
	if (value === undefined || value === null) return undefined;
	return z.coerce.number().safeParse(value).data;
}

export function setFieldMaker(setState: Dispatch<SetStateAction<string>>) {
	return (
		_: React.ChangeEvent<HTMLInputElement>,
		{ value }: InputOnChangeData,
	) => {
		setState(value);
	};
}

export const getZodErrorMessages = (err?: ZodError) =>
	err?.issues.map((x) => x.message).join();
