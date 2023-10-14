"use client";

import BackButton from "@/components/BackButton/BackButton";
import RolesDropdown from "@/components/RolesDropdown/RolesDropdown";
import TokenChecker from "@/components/TokenChecker/TokenChecker";
import { AuthService, MainService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const items = [
	{
		title: <Link href="/super">Pengguna</Link>,
	},
	{
		title: <Link href="/super/users/list">Daftar</Link>,
	},
	{
		title: <Link href="/super/users/list/add">Tambah Pengguna</Link>,
	},
];

const init = {
	firstName: "",
	lastName: "",
	username: "",
	email: "",
	password: "",
	rolesId: "",
};

function SuperAddUsers() {
	const myProfile = useQuery(["myProfile"], () =>
		AuthService.me({ isNotify: false })
	);

	const [user, _setUser] = useState(init);
	const [passConf, setPassConf] = useState<string>();

	const setUser = (label: string, value: any) => {
		_setUser({
			...user,
			[label as unknown as string]: value,
		});
	};

	const handleAdd = () => {
		if (user.password != passConf) {
			return message.info({
				content: "Password confirmation is not the same!",
			});
		}

		let userWillCreated: any = user;
		MainService.Users.register({
			user: userWillCreated,
			isNotify: true,
		});
	};

	return (
		<TokenChecker>
			<div className="flex flex-row gap-4 items-center">
				<BackButton className="text-xl text-red-400" />
				<Breadcrumb items={items} />
			</div>
			<h2 className="text-lg md:text-2xl text-center mt-6">Tambah Pengguna</h2>
			<div className="flex flex-col">
				<div className="w-full flex flex-col items-center m-auto md:w-1/2">
					<div className="w-full py-1 mt-8">
						<label htmlFor="firstName">Nama Depan</label>
						<Input
							id="firstName"
							name="firstName"
							onChange={(e) => setUser("firstName", e.target.value)}
						/>
					</div>
					<div className="w-full py-1">
						<label htmlFor="lastName">Nama Belakang</label>
						<Input
							id="lastName"
							name="lastName"
							onChange={(e) => setUser("lastName", e.target.value)}
						/>
					</div>
					<div className="w-full py-1 flex flex-col">
						<label htmlFor="rolesId">Role</label>
						<RolesDropdown
							only={
								myProfile?.data?.data?.roles?.name == "SUPERVISOR"
									? "STAFF"
									: ""
							}
							onChange={({ _id, name }) => {
								setUser("rolesId", _id);
							}}
						/>
					</div>

					<div className="w-full py-1">
						<label htmlFor="email">E-mail</label>
						<Input
							id="email"
							name="email"
							onChange={(e) => setUser("email", e.target.value)}
						/>
					</div>
					<div className="w-full py-1">
						<label htmlFor="username">Username</label>
						<Input
							id="username"
							name="username"
							onChange={(e) => setUser("username", e.target.value)}
						/>
					</div>
					<div className="w-full py-1">
						<label htmlFor="password">Password</label>
						<Input.Password
							id="password"
							name="password"
							onChange={(e) => setUser("password", e.target.value)}
						/>
					</div>
					<div className="w-full py-1">
						<label htmlFor="passConf">Konfirmasi Password</label>
						<Input.Password
							id="passConf"
							name="passConf"
							onChange={(e) => setPassConf(e.target.value)}
						/>
					</div>

					<div className="w-full mt-8 mb-20">
						<button
							onClick={handleAdd}
							className="px-4 py-2 text-green-400 border-2 border-green-400 rounded-xl w-full hover:text-white hover:bg-green-400"
						>
							Daftarkan
						</button>
					</div>
				</div>
			</div>
		</TokenChecker>
	);
}

export default SuperAddUsers;
