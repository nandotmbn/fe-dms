"use client";
import { LeftCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React from "react";

interface IBackButton {
	className?: string;
}

function BackButton({ className="" }: IBackButton) {
	const router = useRouter();
	return (
		<button onClick={() => router.back()}>
			<LeftCircleFilled className={className} />
		</button>
	);
}

export default BackButton;
