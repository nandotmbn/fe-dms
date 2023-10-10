/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import cookiesHandler from "@/helpers/cookies";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function TokenChecker({ children }: any) {
	const router = useRouter();
	useEffect(() => {
		if (!cookiesHandler.getCookie("access_token")) {
			router.replace("/auth/signin");
		}
	}, []);
	return <div>{children}</div>;
}

export default TokenChecker;
