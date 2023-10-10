"use client";
import DocumentView from "@/components/DocumentView/DocumentView";
import { SupervisorService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import CommentSection from "./partials/CommentSection/CommentSection";

function DocumentAllView() {
	const searchParams = useSearchParams();
	const router = useRouter();

	if (!searchParams.get("documentId")) router.back();

	const docs = useQuery(["documentById"], () =>
		SupervisorService.Documents.getById({
			isNotify: false,
			documentId: searchParams.get("documentId")!,
		})
	);

	return (
		<div className="w-auto h-auto flex flex-col lg:flex-row gap-8">
			<div className="w-auto h-screen flex-2 overflow-auto">
				<DocumentView
					updater={() => docs.refetch()}
					withController={true}
					fileName={docs?.data?.data?.fileName}
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<CommentSection />
			</div>
		</div>
	);
}

export default DocumentAllView;
