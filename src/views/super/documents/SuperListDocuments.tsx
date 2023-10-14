import BackButton from "@/components/BackButton/BackButton";
import TableDocumentsList from "@/components/TableDocumentsList/TableDocumentsList";
import TableUsersList from "@/components/TableUsersList/TableUsersList";
import TokenChecker from "@/components/TokenChecker/TokenChecker";
import { Breadcrumb } from "antd";
import Link from "next/link";
import React from "react";

const items = [
	{
		title: <Link href="/super/documents">Dokumen</Link>,
	},
	{
		title: <Link href="/super/documents/list">Daftar</Link>,
	},
];

function SuperListDocuments() {
	return (
		<TokenChecker>
			<div className="flex flex-row gap-4 items-center">
				<BackButton className="text-xl text-red-400" />
				<Breadcrumb items={items} />
			</div>

			<div className="flex flex-col md:flex-row gap-4 items-start px-1">
				<h2 className="text-lg md:text-2xl text-center">
					Daftar Dokumen
				</h2>
			</div>
			<TableDocumentsList add={true} />
		</TokenChecker>
	);
}

export default SuperListDocuments;
