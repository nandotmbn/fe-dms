import StaffLayout from "@/components/StaffLayout/StaffLayout";
import DocumentRevisionSupervisorViews from "@/views/staff/documents/revision/DocumentRevisionSupervisorViews";
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
		title: "Supervisor - Document Management System",
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
		<StaffLayout>
			<DocumentRevisionSupervisorViews />
		</StaffLayout>
	);
}
