import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	documentId: string;
	comment: {
		content: string;
		isArchived: boolean;
	};
}

async function update({ isNotify, comment, documentId }: IReq) {
	const { data } = await serviceInstance(isNotify).put(
		`/v2/documents/documentId/${documentId}`,
		comment
	);
	return data;
}

export { update };

