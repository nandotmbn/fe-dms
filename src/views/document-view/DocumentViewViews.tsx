"use client";

import DocumentView from "@/components/DocumentView/DocumentView";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function DocumentViewViews() {
	const searchParams = useSearchParams();
	const router = useRouter();

	if (!searchParams.get("documentId")) router.back();

	return (
		<div>
			<DocumentView
				updater={() => {}}
				withController={false}
				fileName={searchParams.get("documentId")!}
			/>
		</div>
	);
}

export default DocumentViewViews;
