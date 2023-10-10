import StaffLayout from "@/components/StaffLayout/StaffLayout";
import DocumentAllView from "@/views/staff/documents/allview/DocumentAllView";
import DocumentApprovedSupervisorViews from "@/views/staff/documents/approved/DocumentApprovedSupervisorViews";
import DocumentPendingSupervisorViews from "@/views/staff/documents/pending/DocumentPendingSupervisorViews";
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
      <DocumentAllView />
		</StaffLayout>
	);
}
