import { serviceInstance } from "@/services/services";
import { STATUS_TYPE } from "@/static";

interface IReq {
	isNotify?: boolean;
	limit: number;
	page: number;
	isArchived: true | false | "";
	documentId: string;
}

async function getByDocId({
	isNotify,
	limit,
	page,
	isArchived,
	documentId,
}: IReq) {
	const { data } = await serviceInstance(isNotify).get(
		`/v2/comments/documentId/${documentId}?limit=${limit}&page=${page}&isArchived=${isArchived}`
	);
	return data;
}

export { getByDocId };
