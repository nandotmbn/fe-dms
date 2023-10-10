import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	userId: string,
	user: {
		firstName: string;
		lastName: string;
		username: string;
		frontDegree?: string;
		backDegree?: string;
		email: string;
		rolesId: string;
		expertise: {
			en: string;
			id: string;
		};
		avatar: string;
		responsibleType: string;
		responsibleTo?: string;
	};
}

async function update({ isNotify, user, userId }: IReq) {
	const { data } = await serviceInstance(isNotify).put(
		`/v2/users/userId/${userId}`,
    user
	);
	return data;
}

export { update };
