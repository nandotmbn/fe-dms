import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	headless?: boolean;
	documentId: string;
}

async function getById({ isNotify, documentId, headless=false }: IReq) {
	const { data } = await serviceInstance(isNotify, headless).get(
		`/v1/documents/documentId/${documentId}`
	);
	return data;
}

export { getById };

