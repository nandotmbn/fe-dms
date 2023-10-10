/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import BackButton from "@/components/BackButton/BackButton";
import BooleanDropdown from "@/components/BooleanDropdown/BooleanDropdown";
import { SuperAdminService, SupervisorService } from "@/services";
import { LoadingOutlined } from "@ant-design/icons";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Input } from "antd";
import _ from "lodash";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TokenChecker from "../../../../components/TokenChecker/TokenChecker";

const items = [
	{
		title: <Link href="/superintendent">Pengguna</Link>,
	},
	{
		title: <Link href="/superintendent">Daftar</Link>,
	},
	{
		title: <Link href="/superintendent/view">Detail Pengguna</Link>,
	},
];

const init = {
	firstName: "",
	lastName: "",
	username: "",
	frontDegree: "",
	backDegree: "",
	email: "",
	password: "",
	rolesId: "",
	isArchived: false,
};

function ViewViews() {
	const [user, _setUser] = useState(init);
	const searchParams = useSearchParams();
	const router = useRouter();
	const [rolesName, setRolesName] = useState("ADMIN");
	const [queryClient] = useState(() => new QueryClient());

	if (!searchParams.get("userId")) {
		router.back();
	}

	const userById = useQuery(
		["userById", searchParams.get("userId")],
		() =>
			SupervisorService.Users.getById({
				id: searchParams.get("userId")?.toString()!,
				isNotify: false,
			}),
		{
			refetchOnWindowFocus: false,
			enabled: false,
		}
	);

	userById.refetch();

	const handleUpdate = () => {
		let userWillCreated: any = _.omit(user, [
			"_id",
			"fullName",
			"username",
			"email",
			"roles",
		]);
		const rolesId = (user as any).roles._id;
		SupervisorService.Users.update({
			userId: searchParams.get("userId")?.toString()!,
			user: {
				...userWillCreated,
				rolesId,
			},
			isNotify: true,
		});

		userById.refetch();
	};

	const setUser = (label: string, value: any) => {
		_setUser({
			...user,
			[label]: value,
		});
	};

	useEffect(() => {
		if (userById.isLoading) return;
		_setUser(userById?.data?.data);
		setRolesName(userById?.data?.data?.roles?.name);
	}, [userById.isLoading]);

	if (userById.isLoading) {
		return (
			<div className="m-auto">
				<LoadingOutlined />
			</div>
		);
	}

	return (
		<TokenChecker>
			<div className="flex flex-col md:flex-row gap-4 items-start px-1">
				<h2 className="text-lg md:text-2xl text-center">Ubah Pengguna</h2>
			</div>
			<div className="flex flex-col">
				<div className="flex flex-row gap-4 items-center">
					<BackButton className="text-2xl text-red-500" />
					<Breadcrumb className="text-xs" separator=">" items={items} />
				</div>
				<h1 className="font-semibold text-gray-600 text-2xl">
					Profil Pengguna: {user.firstName}
				</h1>

				<div className="w-full flex flex-col items-center m-auto md:w-1/2">
					<div className="w-full py-1">
						<label htmlFor="firstName">Nama Depan</label>
						<Input
							id="firstName"
							name="firstName"
							value={user.firstName}
							onChange={(e) => setUser("firstName", e.target.value)}
						/>
					</div>
					<div className="w-full py-1">
						<label htmlFor="lastName">Nama Belakang</label>
						<Input
							id="lastName"
							name="lastName"
							value={user.lastName}
							onChange={(e) => setUser("lastName", e.target.value)}
						/>
					</div>

					<div className="w-full py-1 flex flex-col">
						<label htmlFor="isArchived">Terarsip</label>
						<BooleanDropdown
							trueLabel="Ya"
							placeholder="Arsip"
							falseLabel="Tidak"
							defaultValue={
								userById.data.data.isArchived == true ? "true" : "false"
							}
							onChange={(e) => setUser("isArchived", e)}
						/>
					</div>

					<div className="w-full mt-8 mb-20">
						<button
							onClick={handleUpdate}
							className="px-4 py-2 text-green-400 border-2 border-green-400 rounded-xl w-full hover:text-white hover:bg-green-400"
						>
							Simpan Perubahan
						</button>
					</div>
				</div>
			</div>
		</TokenChecker>
	);
}

export default ViewViews;
