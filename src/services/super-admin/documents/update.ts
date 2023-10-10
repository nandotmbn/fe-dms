import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	documentId: string;
	document: {
		title: {
			id: string;
			en: string;
		};
		description: {
			id: string;
			en: string;
		};
		fileName: string;
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

