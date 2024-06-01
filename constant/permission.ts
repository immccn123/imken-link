export const PERMISSION_TABLE = {
	LOGIN: 1 << 0,
	ADD_USER: 1 << 1,
	CREATE_LINK: 1 << 2,
};

export const OAUTH_INTERNAL_ERROR_MESSAGE = "Sorry, we met an internal issue.";
export const OAUTH_UNKNOWN_ERROR_MESSAGE = "Sorry, we met an unknown issue.";

export const OAUTH_ERROR_MAP: Record<string, string> = {
	OAuthSignin: OAUTH_INTERNAL_ERROR_MESSAGE,
	OAuthCallback:
		"Error in handling the response from an GitHub. Please try again.",
	AccessDenied: "Sorry, you are not allowed to login to this site.",
};
