import { serviceInstance } from "@/services/services";
import { STATUS_TYPE } from "@/static";

interface IReq {
	isNotify?: boolean;
	limit: number;
	page: number;
	title: string;
	userId?: string;
	status: STATUS_TYPE;
	isArchived: true | false | "";
}

async function getAll({
	isNotify,
	limit,
	page,
	title,
	isArchived,
	status,
	userId = "",
}: IReq) {
	const { data } = await serviceInstance(isNotify).get(
		`/v1/documents?limit=${limit}&page=${page}&title=${title}&status=${status}&isArchived=${isArchived}&userId=${userId}`
	);
	return data;
}

export { getAll };
