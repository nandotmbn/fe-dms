import { serviceInstance } from "@/services/services";
import { STATUS_TYPE } from "@/static";

interface IReq {
	isNotify?: boolean;
	limit: number;
	page: number;
	title: string;
	isArchived: true | false | "";
	status: STATUS_TYPE;
}

async function getAll({
	isNotify,
	limit,
	page,
	title,
	isArchived,
	status,
}: IReq) {
	const { data } = await serviceInstance(isNotify).get(
		`/v3/documents?limit=${limit}&page=${page}&title=${title}&status=${status}&isArchived=${isArchived}`
	);
	return data;
}

export { getAll };
