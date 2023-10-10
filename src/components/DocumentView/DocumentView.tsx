/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { PublicService, StaffService } from "@/services";
import { message } from "antd";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

function DocumentView({
	children,
	withController = true,
	withReuploader = false,
	fileName,
	title,
	status,
	updater
}: {
	children?: any;
	withController?: boolean;
	withReuploader?: boolean;
	status?: string;
	updater: () => void;
	title?: string;
	fileName?: string;
}) {
	const [show, setShow] = useState(true);
	const router = useRouter();
	const searchParams = useSearchParams();
	const [uploading, setUploading] = useState(false);

	const handleSubmit = async (fileName: string) => {
		StaffService.Documents.update({
			isNotify: true,
			document: {
				title: title?.toString()!,
				isArchived: false,
				status: status?.toString()!,
				fileName,
			},
			documentId: searchParams.get("documentId")!,
		}).then((res) => {
			updater()
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
				setUploading(false);
				handleSubmit(res?.data?.uploadName);
			});
		};

		input.click();
	};

	useEffect(() => {
		if (withController) return;
		window.addEventListener("keydown", function (e: any) {
			e.preventDefault();
			if (e.key !== undefined) {
				setShow(false);
			} else if (e.keyIdentifier !== undefined) {
				setShow(false);
			} else if (e.keyCode !== undefined) {
				setShow(false);
			}
		});
		document
			.getElementById("pdf-wrapper")
			?.addEventListener("click", function (e: any) {
				e.preventDefault();
				setShow(false);

				message.info({ content: "Jangan klik, scroll saja!" }, 1, () => {
					setShow(true);
				});
			});
		document
			.getElementById("pdf-wrapper")
			?.addEventListener("contextmenu", function (e: any) {
				e.preventDefault();
				setShow(false);

				message.info({ content: "Jangan klik, scroll saja!" }, 1, () => {
					setShow(true);
				});
			});
		window.addEventListener("keyup", function (e: any) {
			e.preventDefault();
			if (e.key !== undefined) {
				setShow(true);
			} else if (e.keyIdentifier !== undefined) {
				setShow(true);
			} else if (e.keyCode !== undefined) {
				setShow(true);
			}
		});
	}, []);

	return (
		<div id="pdf-wrapper" className={show ? "" : "blur-xl"}>
			{!withController && (
				<div className="relative">
					<div className="fixed inset-0 z-50 bg-transparent"></div>
				</div>
			)}
			{withReuploader && (
				<button
					onClick={() => handleUploadImage("oke")}
					className="bg-blue-500 text-white rounded-xl px-4 py-1 mb-4"
				>
					Revisi Dokumen
				</button>
			)}

			<PDFViewer
				documentName={fileName?.toString()!}
				key={1}
				withController={withController}
			/>
		</div>
	);
}

export default DocumentView;
