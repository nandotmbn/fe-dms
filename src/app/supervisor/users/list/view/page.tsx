import AdminLayout from "@/components/AdminLayout/AdminLayout";
import ViewViews from "@/views/supervisor/users/View/ViewViews";
import { Metadata, ResolvingMetadata } from "next";

interface IPropsGenerateMetadata {
	params: { id: string; lang: "en" | "id" };
	searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
	props: IPropsGenerateMetadata,
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {
		title: "Superintendent - Document Management System",
		description: "This is Greenfields - Document Management System",
		authors: [
			{
				name: "Orlando Pratama Tambunan",
				url: "https://orlando-portfolio.web.app/",
			},
		],
	};
}

export default async function Home() {
	return (
		<AdminLayout>
			<ViewViews />
		</AdminLayout>
	);
}
