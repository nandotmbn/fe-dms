"use client";
import TableDocumentsList from "@/components/TableDocumentsList/TableDocumentsList";
import TokenChecker from "@/components/TokenChecker/TokenChecker";

function DocumentReviewedSupervisorViews() {
	return (
		<TokenChecker>
			<div className="flex flex-col md:flex-row gap-4 items-start px-1">
				<h2 className="text-lg md:text-2xl text-center">
					Daftar Dokumen Sedang Direview
				</h2>
			</div>
			<TableDocumentsList add={false} roleAs="SUPERVISOR" statusType="REVIEWED" />
		</TokenChecker>
	);
}

export default DocumentReviewedSupervisorViews;
