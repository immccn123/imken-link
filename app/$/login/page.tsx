"use client";

import {
	OAUTH_ERROR_MAP,
	OAUTH_UNKNOWN_ERROR_MESSAGE,
} from "@/constant/permission";
import { preventSession } from "@/utils/auth/client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import {
	Button,
	Card,
	Grid,
	GridColumn,
	GridRow,
	Icon,
	Message,
} from "semantic-ui-react";

function ErrorMessage() {
	const param = useSearchParams();
	const error = param.get("error");

	return error ? (
		<Message error>
			{OAUTH_ERROR_MAP[error] ?? OAUTH_UNKNOWN_ERROR_MESSAGE}
		</Message>
	) : null;
}

export default function LoginPage() {
	preventSession();

	return (
		<Grid centered verticalAlign="middle" style={{ height: "100%" }}>
			<GridRow>
				<GridColumn width={4}>
					<Suspense>
						<ErrorMessage />
					</Suspense>
					<Card style={{ textAlign: "center" }}>
						<Card.Content>
							<Card.Header>Imken.Link - Login</Card.Header>
							<Card.Description>Login to your account</Card.Description>
						</Card.Content>
						<Button color="black" onClick={() => signIn("github")}>
							<Icon name="github" />
							Continue with GitHub
						</Button>
					</Card>
				</GridColumn>
			</GridRow>
		</Grid>
	);
}
