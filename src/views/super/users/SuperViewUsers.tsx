"use client";

import BackButton from "@/components/BackButton/BackButton";
import BooleanDropdown from "@/components/BooleanDropdown/BooleanDropdown";
import TokenChecker from "@/components/TokenChecker/TokenChecker";
import { MainService } from "@/services";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Input } from "antd";
import _ from "lodash";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
	{
		title: <Link href="/super/users">Pengguna</Link>,
	},
	{
		title: <Link href="/super/users/list">Daftar</Link>,
	},
	{
		title: <Link href="/super/users/list/view">Detail Pengguna</Link>,
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

function SuperViewUsers() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const userId = searchParams.get("userId")!;
	const [isSubmiting, setSubmiting] = useState(false);
	if (!userId) router.back();

	const [user, _setUser] = useState(init);
	const [rolesName, setRolesName] = useState("ADMIN");

	const userById = useQuery(
		["userById", userId],
		() =>
			MainService.Users.getById({
				id: userId?.toString()!,
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

		setSubmiting(true);

		MainService.Users.update({
			userId: searchParams.get("userId")?.toString()!,
			user: {
				...userWillCreated,
				rolesId,
			},
			isNotify: true,
		}).finally(() => {
			setSubmiting(false);
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
	}, [userById.isLoading, userById?.data?.data]);

	if (userById.isLoading) {
		return (
			<div className="m-auto">
				<LoadingOutlined />
			</div>
		);
	}

	return (
		<TokenChecker>
			<div className="flex flex-row gap-4 items-center">
				<BackButton className="text-xl text-red-400" />
				<Breadcrumb items={items} />
			</div>

			<div className="flex flex-col">
				<h1 className="font-semibold text-gray-600 text-2xl mt-8 text-center">
					Profil Pengguna: {user.firstName} {user.lastName}
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
							{isSubmiting ? <LoadingOutlined /> : "Simpan Perubahan"}
						</button>
					</div>
				</div>
			</div>
		</TokenChecker>
	);
}

export default SuperViewUsers;
