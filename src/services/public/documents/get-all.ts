import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	limit: number;
	page: number;
	title: string;
	isArchived: true | false | "";
}

async function getAll({
	isNotify,
	limit,
	page,
	title,
	isArchived,
}: IReq) {
	const { data } = await serviceInstance(isNotify).get(
		`/v4/documents?limit=${limit}&page=${page}&title=${title}&isArchived=${isArchived}`
	);
	return data;
}

export { getAll };
