"use client";

import "@uiw/react-markdown-preview/markdown.css";
import * as commands from "@uiw/react-md-editor/lib/commands";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";

const MDEditor: any = dynamic(() => import("@uiw/react-md-editor"), {
	ssr: false,
});

interface IMarkdownEditor {
	configs: {
		langLabel: string;
		defaultValue?: string;
		value: string;
		onValueChange: (value: string) => void;
	}[];
}

function MarkdownEditor({ configs }: IMarkdownEditor) {
	return (
		<div className="h-screen">
			{configs.map((config, index: number) => {
				return (
					<div key={index} className="mb-44">
						<h4 className="text-xl font-semibold">{config.langLabel}</h4>
						<MDEditor
							value={config.value ? config.value : config.defaultValue}
							height={800}
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
							]}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default MarkdownEditor;
