import { StaffService } from "@/services";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import _ from "lodash";
import { STATUS_TYPE } from "@/static";

function CommentSection({ edited = true }: { edited?: boolean }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [newComment, setNewComment] = useState("");
	const [newStatus, setNewStatus] = useState("");

	if (!searchParams.get("documentId")) router.back();

	const comment = useQuery(["commentByDocId"], () =>
		StaffService.Comments.getByDocId({
			isNotify: false,
			documentId: searchParams.get("documentId")!,
			isArchived: false,
			limit: 9999,
			page: 1,
		})
	);

	const docs = useQuery(["docsById"], () =>
		StaffService.Documents.getById({
			isNotify: false,
			documentId: searchParams.get("documentId")!,
		})
	);

	const handleAdd = async () => {
		StaffService.Comments.create({
			comment: {
				content: newComment,
				documentId: searchParams.get("documentId")!,
			},
		}).then(() => {
			comment.refetch();
			setNewComment("");
		});
	};
	const handleUpdateStatus = async (status: STATUS_TYPE) => {
		StaffService.Documents.update({
			document: {
				..._.pick(docs.data.data, ["title", "fileName"]),
				status,
				isArchived: false,
			},
			documentId: searchParams.get("documentId")!,
			isNotify: true,
		}).then(() => {
			docs.refetch();
		});
	};

	if (comment.isLoading || docs.isLoading) {
		return <LoadingOutlined />;
	}

	const status = docs.data.data.status;

	return (
		<div className="relative px-4 w-full">
			<div className="h-auto">
				{edited && (
					<div className="grid grid-cols-1 gap-2">
						<button
							onClick={() => handleUpdateStatus("PENDING")}
							className={`w-full py-2 rounded-full ${
								status == "PENDING"
									? "text-white bg-gray-700"
									: "bg-white border-2 border-gray-500 text-gray-500"
							}`}
						>
							Pending
						</button>
						<button
							onClick={() => handleUpdateStatus("REVIEWED")}
							className={`w-full py-2 rounded-full ${
								status == "REVIEWED"
									? "text-white bg-blue-700"
									: "bg-white border-2 border-gray-500 text-gray-500"
							}`}
						>
							Review
						</button>
						<button
							onClick={() => handleUpdateStatus("REVISION")}
							className={`w-full py-2 rounded-full ${
								status == "REVISION"
									? "text-white bg-yellow-700"
									: "bg-white border-2 border-gray-500 text-gray-500"
							}`}
						>
							Revision
						</button>
						<button
							onClick={() => handleUpdateStatus("REUPLOAD")}
							className={`w-full py-2 rounded-full ${
								status == "REUPLOAD"
									? "text-white bg-red-700"
									: "bg-white border-2 border-gray-500 text-gray-500"
							}`}
						>
							Reupload
						</button>
						<button
							onClick={() => handleUpdateStatus("APPROVED")}
							className={`w-full py-2 rounded-full ${
								status == "APPROVED"
									? "text-white bg-green-700"
									: "bg-white border-2 border-gray-500 text-gray-500"
							}`}
						>
							Approved
						</button>
					</div>
				)}
				<h3 className="text-2xl font-semibold">Komentar</h3>
				<div className="flex flex-col gap-2 mt-4">
					{comment?.data?.data.map((d: any, i: number) => {
						return (
							<div key={i} className="pb-4 border-b-2">
								<div className="indent-4 text-green-600 font-semibold">
									{d?.author?.fullName}
								</div>
								<div className="p-2 bg-gray-900 text-white rounded-full">
									{d?.content}
								</div>
							</div>
						);
					})}
				</div>
				<div className="mt-8">
					<h6>Tambahkan komentar</h6>
					<Input.TextArea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
					/>
					<button
						onClick={handleAdd}
						className="font-semibold rounded bg-green-500 text-white px-4 py-1 mt-8"
					>
						Kirim
					</button>
				</div>
			</div>
		</div>
	);
}

export default CommentSection;
