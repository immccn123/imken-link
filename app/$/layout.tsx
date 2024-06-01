"use client";

import { SessionProvider } from "next-auth/react";
import { Container } from "semantic-ui-react";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionProvider>
			<Container style={{ height: "100vh" }}>{children}</Container>
		</SessionProvider>
	);
}
