import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	documentId: string;
}

async function getById({ isNotify, documentId }: IReq) {
	const { data } = await serviceInstance(isNotify).get(
		`/v4/documents/documentId/${documentId}`
	);
	return data;
}

export { getById };

