import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	documentId: string;
	document: {
		title: string;
		status: string;
		content: string;
		isArchived: boolean;
	};
}

async function update({ isNotify, document, documentId }: IReq) {
	const { data } = await serviceInstance(isNotify).put(
		`/v1/documents/documentId/${documentId}`,
		document
	);
	return data;
}

export { update };

