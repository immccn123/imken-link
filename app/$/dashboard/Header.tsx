import { signOut } from "next-auth/react";
import { Button, Icon } from "semantic-ui-react";

export default function Header({
	user,
}: {
	user?: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}) {
	return (
		<>
			<h2>
				Welcome back, {user?.name}.{" "}
				<Button size="mini" onClick={() => signOut()}>
					<Icon name="sign-out" /> Sign Out
				</Button>
			</h2>
		</>
	);
}
