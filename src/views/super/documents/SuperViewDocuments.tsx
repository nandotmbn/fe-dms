"use client";
import BackButton from "@/components/BackButton/BackButton";
import CommentSection from "@/components/CommentSection/CommentSection";
import DocumentView from "@/components/DocumentView/DocumentView";
import { AuthService, MainService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const items = [
	{
		title: <Link href="/super/documents">Dokumen</Link>,
	},
	{
		title: <Link href="/super/documents/list">Daftar</Link>,
	},
	{
		title: <Link href="/super/documents/list/add">Tambah Dokumen</Link>,
	},
];

function SuperViewDocuments() {
	const searchParams = useSearchParams();
	const router = useRouter();

	if (!searchParams.get("documentId")) router.back();

	const myProfile = useQuery(["myProfile"], () =>
		AuthService.me({
			isNotify: false,
		})
	);

	return (
		<div className="w-auto h-auto flex flex-col lg:flex-row gap-8">
			<div className="w-auto h-screen flex-2 overflow-auto">
				<div className="flex flex-row gap-4 items-center mb-4">
					<BackButton className="text-xl text-red-400" />
					<Breadcrumb items={items} />
				</div>
				<DocumentView
					withReuploader={true}
					updater={() => {}}
					withController={true}
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<CommentSection
					edited={myProfile?.data?.data?.roles?.name != "STAFF"}
				/>
			</div>
		</div>
	);
}

export default SuperViewDocuments;
