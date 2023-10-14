import { serviceInstance } from "..";

interface ILogin {
	data: {
		credential: string;
		password: string;
	};
	isNotify: boolean
}

async function login(user: ILogin) {
	const { data } = await serviceInstance(user.isNotify).post(
		"/v1/auth/signin",
		user.data,
	);
	return data;
}
export { login };
