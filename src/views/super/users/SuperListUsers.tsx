import BackButton from "@/components/BackButton/BackButton";
import TableUsersList from "@/components/TableUsersList/TableUsersList";
import TokenChecker from "@/components/TokenChecker/TokenChecker";
import { Breadcrumb } from "antd";
import Link from "next/link";
import React from "react";

const items = [
	{
		title: <Link href="/super">Pengguna</Link>,
	},
	{
		title: <Link href="/super/list">Daftar</Link>,
	},
];

function SuperListUsers() {
	return (
		<TokenChecker>
			<div className="flex flex-row gap-4 items-center">
				<BackButton className="text-xl text-red-400" />
				<Breadcrumb items={items} />
			</div>

			<TableUsersList add={true} />
		</TokenChecker>
	);
}

export default SuperListUsers;
