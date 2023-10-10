"use client";

import { PublicService, StaffService } from "@/services";
import { PlusOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function AddDocument() {
	const [uploading, setUploading] = useState(false);
	const router = useRouter();
	const [docs, setDocs] = useState({
		title: "",
		fileName: "",
	});

	const handleSubmit = async () => {
		StaffService.Documents.create({
			isNotify: true,
			document: docs,
		}).then((res) => {
			if (res) {
				router.back();
			}
		});
	};

	const handleUploadImage = async (imageName: string) => {
		var input = document.createElement("input");
		input.setAttribute("type", "file");

		input.onchange = async (e: any) => {
			setUploading(true);
			var file = e.target.files[0];
			const isLt10M = file.size / 1024 / 1024 < 10;
			if (!isLt10M) {
				setUploading(false);
				return message.error("File must smaller than 10MB!");
			}
			PublicService.CDN.documentUpload(file).then((res) => {
				setDocs({
					...docs,
					fileName: res?.data?.uploadName,
				});
				setUploading(false);
			});
		};

		input.click();
	};
	return (
		<div>
			<div className="flex flex-col justify-center items-center py-2">
				{uploading ? null : !docs.fileName ? (
					<button
						onClick={() => handleUploadImage("fileName")}
						className="w-full md:w-1/2 h-44 bg-gray-600 text-gray-500 rounded-xl text-sm flex flex-col items-center justify-center"
					>
						<PlusOutlined className="text-2xl" />
						<p>Ganti Dokumen</p>
					</button>
				) : (
					<div className="h-full">
						<p>{docs.fileName}</p>
						<button
							className="w-full m-auto p-1 text-red-500 border-red-500 border-2 mt-1"
							onClick={() =>
								setDocs({
									...docs,
									fileName: "",
								})
							}
						>
							Hapus Dokumen
						</button>
					</div>
				)}
				<div className="mb-2">
					<label htmlFor="title">Nama Dokumen</label>
					<Input
						onChange={(e) =>
							setDocs({
								...docs,
								title: e.target.value,
							})
						}
						id="title"
						name="title"
						placeholder="Nama Dokumen"
						value={docs.title}
					/>
				</div>
				<button
					onClick={(e) => {
						handleSubmit();
					}}
					className="bg-blue-600 rounded-lg px-2 w-24 py-2 text-white"
				>
					Submit
				</button>
			</div>
		</div>
	);
}

export default AddDocument;
