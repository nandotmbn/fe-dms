/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DeleteFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ArchiveToogle() {
	const searchParams = useSearchParams();

	return (
		<Tooltip placement="bottomLeft" title="Lihat arsip">
			<Link
				className="flex flex-row gap-2"
				href={{
					query: {
						isArchived:
							searchParams.get("isArchived") == "false" ||
							searchParams.get("isArchived") == null
								? "true"
								: "false",
					},
				}}
			>
				<div className="flex flex-row gap-2">
					<DeleteFilled
						className={`${
							searchParams.get("isArchived") == "false" ||
							searchParams.get("isArchived") == null
								? "text-red-500"
								: "text-blue-500"
						}`}
					/>
				</div>
				{searchParams.get("isArchived") == "true" ? (
					<p className="">Mode Arsip</p>
				) : (
					<p className="">Mode Non Arsip</p>
				)}
			</Link>
		</Tooltip>
	);
}

export default ArchiveToogle;
