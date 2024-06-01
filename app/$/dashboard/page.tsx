"use client";

import { requireSession } from "@/utils/auth/client";
import { Grid, Placeholder, Segment } from "semantic-ui-react";
import LinkManager from "./LinkManager";
import Header from "./Header";

export default function Dashboard() {
	const { user, userId } = requireSession();

	if (!user) {
		return <Placeholder></Placeholder>;
	}

	return (
		<>
			<Grid padded>
				<Grid.Row>
					<Grid.Column>
						<Header user={user} />
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<LinkManager />
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Segment>
							<h3>Manage Users</h3>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	);
}
