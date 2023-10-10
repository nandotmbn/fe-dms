/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
	StaffService,
	SuperAdminService, SupervisorService,
} from "@/services";
import { ROLES_TYPE, STATUS_TYPE } from "@/static";
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
			title: "Judul Dokumen",
			dataIndex: "title",
			key: "1",
		},
		{
			title: "Penulis",
			dataIndex: "author",
			key: "0",
			render: ({ fullName }: { fullName: string }) => fullName,
		},
		{
			title: "status",
			dataIndex: "status",
			key: "2",
		},
		{
			title: "Aksi",
			key: "3",
			render: ({ _id }: { _id: string }) => (
				<div className="flex flex-row items-center gap-1">
					<Link href={`${currentPath}/view?documentId=${_id}`}>
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
			title: "Judul Dokumen",
			dataIndex: "title",
			key: "1",
		},
		{
			title: "Aksi",
			key: "3",
			render: ({ _id }: { _id: string }) => (
				<div className="flex flex-row items-center gap-1">
					<Link href={`${currentPath}/view?docId=${_id}`}>
						<EyeFilled className="text-white bg-blue-500 p-2 rounded" />
					</Link>
				</div>
			),
		},
	];
};

function TableDocumentsList({
	add = false,
	roleAs = "",
	statusType = "",
}: {
	add?: boolean;
	roleAs: ROLES_TYPE;
	statusType?: STATUS_TYPE;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [title, setTitle] = useState<string>("");
	const [role, setRole] = useState<ROLES_TYPE>("");

	const users = useQuery(
		["documents"],
		() => {
			const queryParams = {
				isArchived: searchParams.get("isArchived") == "true" ? true : false,
				limit: 10000000,
				page: 1,
				title,
				status: statusType,
				isNotify: true
			};

			if (roleAs == "SUPERINTENDENT")
				return SuperAdminService.Documents.getAll(queryParams);
			else if (roleAs == "SUPERVISOR")
				return SupervisorService.Documents.getAll(queryParams);
			else if (roleAs == "STAFF") return StaffService.Documents.getAll(queryParams);
		},
		{
			enabled: false,
		}
	);

	useEffect(() => {
		users.refetch();
	}, [searchParams.get("isArchived"), role, title]);

	useEffect(() => {
		users.refetch();
	}, []);

	return (
		<div className="w-full">
			<div className="flex flex-col md:flex-row justify-between gap-4 my-4">
				<div className="flex flex-row gap-4 flex-1">
					<Input
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Cari judul dokumen"
					/>
				</div>
				{statusType == "" && (
					<div className="flex flex-row justify-end gap-4 flex-1">
						<RolesDropdown onChange={({ _id, name }) => setRole(name)} />
					</div>
				)}
			</div>

			{add && (
				<div className="mb-4 flex flex-row justify-end">
					<Link href={`${pathname}/add`}>
						<p className="px-4 py-1 border-2 rounded border-green-400 text-green-400 hover:bg-green-400 hover:text-white">
							Tambah Dokumen
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

export default TableDocumentsList;
