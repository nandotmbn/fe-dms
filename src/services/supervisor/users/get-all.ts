import { serviceInstance } from "@/services/services";
import { ROLES_TYPE } from "@/static";

interface IReq {
	isNotify?: boolean;
	role: ROLES_TYPE;
	limit: number;
	page: number;
	name: string;
	isArchived: true | false | "";
}

async function getAll({
	isNotify,
	limit,
	page,
	role,
	name,
	isArchived,
}: IReq) {
	const { data } = await serviceInstance(isNotify).get(
		`/v2/users?limit=${limit}&page=${page}&role=${role}&name=${name}&isArchived=${isArchived}`
	);
	return data;
}

export { getAll };

