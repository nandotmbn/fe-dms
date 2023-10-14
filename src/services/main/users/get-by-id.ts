import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	id: string;
}

async function getById({
	isNotify,
	id,
}: IReq) {
	const { data } = await serviceInstance(isNotify).get(
		`/v1/users/userId/${id}`
	);
	return data;
}

export { getById };
