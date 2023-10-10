import Link from "next/link";

interface IGridViewDocsList {
	documents: any[];
}

function GridViewDocsList({ documents }: IGridViewDocsList) {
	return (
		<div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
			{documents?.map((doc: any, index: number) => {
				return (
					<div
						key={index}
						className="w-full p-2 bg-white shadow-xl rounded-xl text-gray-700 dark:bg-black dark:text-gray-300"
					>
						<p>Nama dokumen: {doc.title}</p>
						<p>Author: {doc.author.fullName}</p>
						<div className="flex flex-row items-end justify-end">
							<Link href={`/document-view?documentId=${doc.fileName}`}>
								<button className="px-4 py-1 bg-black text-white rounded-xl dark:bg-white dark:text-black">
									Lihat
								</button>
							</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default GridViewDocsList;
