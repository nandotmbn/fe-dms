"use client";
import CommentSection from "@/components/CommentSection/CommentSection";
import DocumentView from "@/components/DocumentView/DocumentView";
import { AuthService, MainService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

function SuperViewDocuments() {
	const searchParams = useSearchParams();
	const router = useRouter();

	if (!searchParams.get("documentId")) router.back();

	const myProfile = useQuery(["myProfile"], () =>
		AuthService.me({
			isNotify: false,
		})
	);


	return (
		<div className="w-auto h-auto flex flex-col lg:flex-row gap-8">
			<div className="w-auto h-screen flex-2 overflow-auto">
				<DocumentView
					withReuploader={true}
					updater={() => {}}
					withController={true}
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<CommentSection edited={myProfile?.data?.data?.roles?.name != "STAFF"} />
			</div>
		</div>
	);
}

export default SuperViewDocuments;
