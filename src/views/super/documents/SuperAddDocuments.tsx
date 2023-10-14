"use client";

import BackButton from "@/components/BackButton/BackButton";
import MarkdownEditor from "@/components/MarkdownEditor/MarkdownEditor";
import TokenChecker from "@/components/TokenChecker/TokenChecker";
import { MainService } from "@/services";
import { Breadcrumb, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const items = [
	{
		title: <Link href="/super/documents">Dokumen</Link>,
	},
	{
		title: <Link href="/super/documents/list">Daftar</Link>,
	},
	{
		title: <Link href="/super/documents/list/add">Tambah Dokumen</Link>,
	},
];

function SuperAddDocuments() {
	const router = useRouter();
	const [docs, _setDocs] = useState({
		title: "",
		content: "",
	});

	const setDocs = (label: string, value: any) => {
		_setDocs({
			...docs,
			[label]: value,
		});
	};

	const handleSubmit = async () => {
		MainService.Documents.create({
			isNotify: true,
			document: docs,
		}).then((res) => {
			if (res) {
				router.back();
			}
		});
	};

	return (
		<TokenChecker>
			<div className="flex flex-row gap-4 items-center">
				<BackButton className="text-xl text-red-400" />
				<Breadcrumb items={items} />
			</div>
			<h2 className="text-lg md:text-2xl text-center mt-6">Tambah Dokumen</h2>
			<div className="flex flex-col">
				<div className="w-full flex flex-col items-center m-auto md:full">
					<div className="w-full py-1 mt-8">
						<label htmlFor="title">Judul</label>
						<Input
							id="title"
							name="title"
							onChange={(e) => setDocs("title", e.target.value)}
						/>
					</div>
					<div className="w-full">
						<MarkdownEditor
							configs={[
								{
									langLabel: "Isi dokumen",
									value: docs.content,
									onValueChange(value) {
										setDocs("content", value);
									},
								},
							]}
						/>
					</div>
					<button onClick={handleSubmit} className="w-full text-center py-2 rounded-xl bg-green-400 text-white">
						Tambahkan
					</button>
				</div>
			</div>
		</TokenChecker>
	);
}

export default SuperAddDocuments;
