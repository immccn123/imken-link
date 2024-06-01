import { Link } from "@/model/link";
import { getZodErrorMessages, setFieldMaker } from "@/utils";
import { useMemo, useState } from "react";
import {
	Button,
	Divider,
	Form,
	FormGroup,
	FormInput,
	Icon,
	Segment,
	Table,
	TableCell,
} from "semantic-ui-react";
import useSWR from "swr";
import { z } from "zod";

const urlSafeRegex =
	/^[a-zA-Z0-9\-\._~\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF]*$/;

export default function LinkManager() {
	const [target, setTarget] = useState("");
	const [slug, setSlug] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);

	const removeLinkMaker = (slug: string) => () =>
		fetch("/api/remove", {
			method: "DELETE",
			body: JSON.stringify({ slug }),
		}).finally(() => (mutateLink(), void 0));

	const { data: allLink, mutate: mutateLink } = useSWR(
		`/api/get?page=${pageIndex}&perPage=10000`,
		(x) => fetch(x).then((x) => x.json() as unknown as Link[]),
	);

	const targetValidate = useMemo(
		() => z.string().url().safeParse(target).error,
		[target],
	);

	const slugValidate = useMemo(
		() =>
			z
				.string()
				.regex(urlSafeRegex, {
					message: "String contains unsafe URL characters",
				})
				.safeParse(slug).error,
		[slug],
	);

	return (
		<Segment>
			<h3>Manage Links</h3>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					setIsLoading(true);
					fetch("/api/create", {
						method: "POST",
						body: JSON.stringify({ target, slug }),
					})
						.then((x) => x.json())
						.then((x) => setSlug(x.slug))
						.finally(() => (setIsLoading(false), mutateLink()));
				}}
			>
				<FormGroup widths="equal">
					<FormInput
						error={getZodErrorMessages(targetValidate)}
						fluid
						placeholder="Target URL"
						label="Target URL"
						required
						value={target}
						onChange={setFieldMaker(setTarget)}
					/>
					<FormInput
						error={getZodErrorMessages(slugValidate)}
						fluid
						placeholder="Slug"
						label="Slug (optional)"
						value={slug}
						onChange={setFieldMaker(setSlug)}
					/>
				</FormGroup>
				<Button
					fluid
					loading={isLoading}
					disabled={
						isLoading ||
						targetValidate !== undefined ||
						slugValidate !== undefined
					}
				>
					Create!
				</Button>
			</Form>

			<Divider />
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Target</Table.HeaderCell>
						<Table.HeaderCell>Slug</Table.HeaderCell>
						<Table.HeaderCell>Action</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{allLink?.map((x) => (
						<Table.Row key={x.slug}>
							<TableCell>{x.target}</TableCell>
							<TableCell>{x.slug}</TableCell>
							<TableCell>
								<Button
									circular
									onClick={removeLinkMaker(x.slug)}
									icon="trash alternate"
								/>
							</TableCell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Segment>
	);
}
