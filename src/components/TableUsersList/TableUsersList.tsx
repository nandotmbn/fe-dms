/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
	SuperAdminService, SupervisorService,
} from "@/services";
import { ROLES_TYPE } from "@/static";
import { EyeFilled, LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Input, Table } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RolesDropdown from "../RolesDropdown/RolesDropdown";

const columns = (currentPath: string) => {
	return [
		{
			title: "Nama Lengkap",
			dataIndex: "fullName",
			key: "1",
		},
		{
			title: "Role",
			dataIndex: "roles",
			key: "2",
			render: ({ name }: { name: string }) => <p>{name}</p>,
		},
		{
			title: "Aksi",
			key: "3",
			render: ({ _id }: { _id: string }) => (
				<div className="flex flex-row items-center gap-1">
					<Link href={`${currentPath}/view?userId=${_id}`}>
						<EyeFilled className="text-white bg-blue-500 p-2 rounded" />
					</Link>
				</div>
			),
		},
	];
};

const columnsSmall = (currentPath: string) => {
	return [
		{
			title: "Nama Lengkap",
			dataIndex: "fullName",
			key: "1",
		},
		{
			title: "Aksi",
			key: "4",
			render: ({ _id }: { _id: string }) => (
				<div className="flex flex-row items-center gap-1">
					<Link href={`${currentPath}/view/${_id}`}>
						<EyeFilled className="text-white bg-blue-500 p-2 rounded" />
					</Link>
				</div>
			),
		},
	];
};

function TableUsersList({
	add = false,
	roleAs = "",
	roleParams = "",
}: {
	add?: boolean;
	roleAs: ROLES_TYPE;
	roleParams?: ROLES_TYPE;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [name, setName] = useState<string>("");
	const [role, setRole] = useState<ROLES_TYPE>("");

	const users = useQuery(
		["users"],
		() => {
			const queryParams = {
				isArchived: searchParams.get("isArchived") == "true" ? true : false,
				limit: 10000000,
				page: 1,
				name,
				role: roleParams != "" ? roleParams : role,
			};

			if (roleAs == "SUPERINTENDENT")
				return SuperAdminService.Users.getAll(queryParams);
			else if (roleAs == "SUPERVISOR")
				return SupervisorService.Users.getAll(queryParams);
			// else if (roleAs == "STAFF") return StaffService.Users.getAll(queryParams);
		},
		{
			enabled: false,
		}
	);

	useEffect(() => {
		users.refetch();
	}, [searchParams.get("isArchived"), role, name]);

	useEffect(() => {
		users.refetch();
	}, []);

	return (
		<div className="w-full">
			<div className="flex flex-col md:flex-row justify-between gap-4 my-4">
				<div className="flex flex-row gap-4 flex-1">
					<Input
						onChange={(e) => setName(e.target.value)}
						placeholder="Cari nama pengguna"
					/>
				</div>
				{roleParams == "" && (
					<div className="flex flex-row justify-end gap-4 flex-1">
						<RolesDropdown onChange={({ _id, name }) => setRole(name)} />
					</div>
				)}
			</div>

			{add && (
				<div className="mb-4 flex flex-row justify-end">
					<Link href={`${pathname}/add`}>
						<p className="px-4 py-1 border-2 rounded border-green-400 text-green-400 hover:bg-green-400 hover:text-white">
							Tambah Pengguna
						</p>
					</Link>
				</div>
			)}

			<div className="hidden md:inline">
				{!users.isLoading ? (
					<Table
						className="text-xxs"
						dataSource={users?.data?.data.map((userData: any, li: number) => {
							return {
								key: li,
								...userData,
							};
						})}
						columns={columns(pathname)}
						pagination={{
							pageSize: 10,
						}}
					/>
				) : (
					<LoadingOutlined className="text-4xl" />
				)}
			</div>

			<div className="md:hidden">
				{!users.isLoading ? (
					<Table
						className="text-xxs"
						dataSource={users?.data?.data.map((userData: any, li: number) => {
							return {
								key: li,
								...userData,
							};
						})}
						columns={columnsSmall(pathname)}
						pagination={{
							pageSize: 10,
						}}
					/>
				) : (
					<LoadingOutlined className="text-4xl" />
				)}
			</div>
		</div>
	);
}

export default TableUsersList;
