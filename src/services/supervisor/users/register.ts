import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	user: {
		firstName: string;
		lastName: string;
		username: string;
		frontDegree?: string;
		backDegree?: string;
		email: string;
		password: string;
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

async function register({ isNotify, user }: IReq) {
	const { data } = await serviceInstance(isNotify).post(
		`/v2/auth/register`,
    user
	);
	return data;
}

export { register };
