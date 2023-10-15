/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cookiesHandler from "@/helpers/cookies";
import { Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarAdmin from "./Admin/NavbarAdmin";
import Header from "./partials/Header";

const { Content, Sider } = Layout;

interface IMainLayout {
	children: JSX.Element;
}

function SuperLayout({ children }: IMainLayout) {
	const [collapsed, setCollapsed] = useState(false);
	const navigation = useRouter();

	useEffect(() => {
		if (!cookiesHandler.getCookie("access_token")) {
			setTimeout(() => {
				navigation.replace("/auth/signin");
			}, 1000);
		}
	}, []);

	useEffect(() => {
		if(window == undefined) return
		setCollapsed(window.screen.width < 768)
	}, [])

	return (
		<Layout hasSider>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
				}}
				className="scrollbar scrollbar-w-1 scrollbar-thumb-gray-100 scrollbar-track-blue-600"
			>
				<div className="p-4">
					<Link href="/">
						<Image
							className="contain relative w-full"
							src="https://greenfieldsdairy.com/GreenfieldsLogoGreen.svg"
							alt="OKE"
							width={720}
							height={720}
							unoptimized={true}
						/>
					</Link>
				</div>
				<NavbarAdmin collapsed={collapsed} />
			</Sider>
			<Layout
				className="site-layout duration-700"
				style={{ marginLeft: collapsed ? 80 : 200 }}
			>
				<Content
					style={{
						overflow: "initial",
						minHeight: "100vh",
					}}
					className="mx-1 my-2"
				>
					<Header />
					{children}
				</Content>
			</Layout>
		</Layout>
	);
}

export default SuperLayout;
