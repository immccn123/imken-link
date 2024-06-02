"use server";

import { Grid, Segment } from "semantic-ui-react";

export default async function NotFound() {
	return (
		<Grid centered verticalAlign="middle" style={{ height: "100%" }}>
			<Grid.Row>
				<Grid.Column width={4}>
					<Segment>
						<h3>404 | Sorry, we cannot find that page.</h3>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							style={{ width: "100%" }}
							src="https://http.cat/404"
							alt="Not Found!"
						/>
					</Segment>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
}
