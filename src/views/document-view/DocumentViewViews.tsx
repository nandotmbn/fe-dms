"use client";

import { MainService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function DocumentViewViews() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [show, setShow] = useState(true);
	const ref = useRef();

	if (!searchParams.get("documentId")) router.back();

	const docs = useQuery(["docs"], () =>
		MainService.Documents.getById({
			documentId: searchParams.get("documentId")!,
		})
	);

	useEffect(() => {
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
		<div id="pdf-wrapper" className={show ? "bg-gray-300" : "blur-xl bg-gray-300"}>
			<div className="relative">
				<div className="fixed inset-0 z-50 bg-transparent"></div>
			</div>
			<div
				className="prose max-w-full flex-3 text-xs xl:text-base px-2"
				id="about"
			>
				<div className="m-auto w-full md:w-9/12 lg:6/12 bg-white px-8 py-24 shadow-xl">
					<ReactMarkdown
						components={{
							code({ node, inline, className, children, ...props }: any) {
								const match = /language-(\w+)/.exec(className || "");
								return !inline && match ? (
									<SyntaxHighlighter
										{...props}
										style={oneDark}
										language={match[1]}
										PreTag="div"
										ref={ref as any}
									>
										{String(children).replace(/\n$/, "")}
									</SyntaxHighlighter>
								) : (
									<code {...props} className={className}>
										{children}
									</code>
								);
							},
						}}
					>
						{docs?.data?.data?.content!}
					</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}

export default DocumentViewViews;
