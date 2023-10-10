"use client";

import cookiesHandler from "@/helpers/cookies";
import { AuthService } from "@/services";
import { LoadingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Popconfirm, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import ArchiveToogle from "./ArchiveToogle";

function Header() {
	const navigation = useRouter();
	const myProfile = useQuery(["myProfile"], () =>
		AuthService.me({ isNotify: false })
	);

	const handleLogout = async () => {
		cookiesHandler.deleteCookie("access_token");

		setTimeout(() => {
			navigation.replace("/auth/signin");
		}, 1000);
	};

	if (myProfile.isLoading) {
		return (
			<div>
				<LoadingOutlined />
			</div>
		);
	}

	if (myProfile?.data?.data?.roles?.name != "SUPERVISOR") {
		navigation.push("/auth/signin");
	}

	return (
		<div className="flex flex-col md:flex-row justify-between gap-8 mb-4">
			<div className="flex flex-row md:justify-end gap-8">
				<ArchiveToogle />
				<Popconfirm title="Apakah yakin untuk keluar?" onConfirm={handleLogout}>
					<button>
						<LogoutOutlined className="text-red-500 text-2xl" />
					</button>
				</Popconfirm>
			</div>
			{myProfile.isLoading ? (
				<Skeleton />
			) : (
				<p className="text-xs">{myProfile.data?.data?.fullName}</p>
			)}
		</div>
	);
}

export default Header;
