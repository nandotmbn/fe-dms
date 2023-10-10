"use client";
import TableDocumentsList from "@/components/TableDocumentsList/TableDocumentsList";
import TokenChecker from "@/components/TokenChecker/TokenChecker";

function DocumentRevisionSupervisorViews() {
	return (
		<TokenChecker>
			<div className="flex flex-col md:flex-row gap-4 items-start px-1">
				<h2 className="text-lg md:text-2xl text-center">
					Daftar Dokumen Sedang Direvisi
				</h2>
			</div>
			<TableDocumentsList add={false} roleAs="STAFF" statusType="REVISION" />
		</TokenChecker>
	);
}

export default DocumentRevisionSupervisorViews;
