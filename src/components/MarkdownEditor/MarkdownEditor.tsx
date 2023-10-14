"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import * as commands from "@uiw/react-md-editor/lib/commands";
import dynamic from "next/dynamic";
import React from "react";
import { IMAGE_URL, URL_ENDPOINT } from "@/static";
import { message } from "antd";
import { MainService } from "@/services";

const MDEditor: any = dynamic(() => import("@uiw/react-md-editor"), {
	ssr: false,
});

interface IMarkdownEditor {
	configs: {
		langLabel: string;
    defaultValue? : string
		value: string;
		onValueChange: (value: string) => void;
	}[];
}

function MarkdownEditor({ configs }: IMarkdownEditor) {
	return (
		<div className="">
			{configs.map((config, index: number) => {
				return (
					<div key={index} className="mb-16">
						<h4 className="text-xl font-semibold">{config.langLabel}</h4>
						<MDEditor
							value={config.value ? config.value : config.defaultValue}
							onChange={config.onValueChange}
							commands={[
								commands.bold,
								commands.italic,
								commands.strikethrough,
								commands.hr,
								commands.group(
									[
										commands.title1,
										commands.title2,
										commands.title3,
										commands.title4,
										commands.title5,
										commands.title6,
									],
									{
										name: "title",
										groupName: "title",
										buttonProps: { "aria-label": "Insert title" },
									}
								),
								commands.code,
								commands.codeBlock,
								commands.quote,
								commands.link,
								commands.orderedListCommand,
								commands.unorderedListCommand,
								commands.checkedListCommand,
								commands.group([], {
									name: "image",
									groupName: "image",
									icon: (
										<svg width="13" height="13" viewBox="0 0 20 20">
											<path
												fill="currentColor"
												d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
											></path>
										</svg>
									),
									execute: (
										state: commands.TextState,
										api: commands.TextAreaTextApi
									) => {
										var input = document.createElement("input");
										input.type = "file";

										input.onchange = async (e: any) => {
											var file = e.target.files[0];

											const isJpgOrPng =
												file?.type === "image/jpeg" ||
												file?.type === "image/jpg" ||
												file?.type === "image/png";
											if (!isJpgOrPng) {
												return message.error(
													"You can only upload JPG/PNG file!"
												);
											}

											const isLt3M = file?.size! / 1024 / 1024 < 3;
											if (!isLt3M) {
												return message.error("Image must smaller than 3MB!");
											}
											return MainService.CDN.imageUpload(file).then(
												(res) => {
													api.replaceSelection(
														`![](${URL_ENDPOINT + IMAGE_URL}${
															res.data.uploadName
														})`
													);
												}
											);
										};

										input.click();
									},
									buttonProps: { "aria-label": "Insert title" },
								}),
							]}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default MarkdownEditor;
