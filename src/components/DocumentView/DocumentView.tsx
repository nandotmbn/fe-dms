/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { MainService } from "@/services";
import { Input, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MarkdownEditor from "../MarkdownEditor/MarkdownEditor";
import { useQuery } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
// const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

function DocumentView({
	children,
	withController = true,
	withReuploader = false,
	updater,
}: {
	children?: any;
	withController?: boolean;
	withReuploader?: boolean;
	updater: () => void;
}) {
	const [show, setShow] = useState(true);
	const [docs, setDocs] = useState({
		title: "",
		content: "",
		status: "",
	});
	const searchParams = useSearchParams();

	const documents = useQuery(["documentById"], () =>
		MainService.Documents.getById({
			isNotify: false,
			documentId: searchParams.get("documentId")!,
		}).then((res) => {
			if (!res) return null;
			setDocs(res.data);
			return res;
		})
	);

	const handleSubmit = async () => {
		MainService.Documents.update({
			isNotify: true,
			document: {
				title: docs?.title?.toString()!,
				isArchived: false,
				content: docs.content!,
				status: docs?.status?.toString()!,
			},
			documentId: searchParams.get("documentId")!,
		}).then((res) => {
			updater();
		});
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

	if (documents.isLoading) {
		return <LoadingOutlined />;
	}

	return (
		<div id="pdf-wrapper" className={show ? "" : "blur-xl"}>
			{!withController && (
				<div className="relative">
					<div className="fixed inset-0 z-50 bg-transparent"></div>
				</div>
			)}
			{withReuploader && (
				<button
					onClick={() => handleSubmit()}
					className="bg-blue-500 text-white rounded-xl px-4 py-1 mb-4"
				>
					Revisi Dokumen
				</button>
			)}

			<div className="w-full py-1 mt-2">
				<label htmlFor="title">Judul</label>
				<Input
					id="title"
					name="title"
					defaultValue={documents?.data?.data?.title}
					onChange={(e) =>
						setDocs({
							...docs,
							title: e.target.value,
						})
					}
				/>
			</div>

			<MarkdownEditor
				configs={[
					{
						langLabel: "Isi dokumen",
						value: docs?.content!,
						defaultValue: documents?.data?.data?.content!,
						onValueChange(value) {
							setDocs({
								...docs,
								content: value,
							});
						},
					},
				]}
			/>

			{/* <PDFViewer
				documentName={fileName?.toString()!}
				key={1}
				withController={withController}
			/> */}
		</div>
	);
}

export default DocumentView;
