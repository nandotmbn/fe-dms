import { MainService } from "@/services";
import DocumentViewViews from "@/views/document-view/DocumentViewViews";
import { Metadata, ResolvingMetadata } from "next";

interface IPropsGenerateMetadata {
	params: { id: string; lang: "en" | "id" };
	searchParams: { [key: string]: string };
}

export async function generateMetadata(
	props: IPropsGenerateMetadata,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const document = await MainService.Documents.getById({
		documentId: props.searchParams.documentId,
		headless: true,
	});

	return {
		title: `${document.data.title} - Document Management System`,
		description: `Written by: ${document.data.author.fullName}`,
		authors: [
			{
				name: "Orlando Pratama Tambunan",
				url: "https://orlando-portfolio.web.app/",
			},
		],
	};
}

export default async function Home() {
	return <DocumentViewViews />;
}
