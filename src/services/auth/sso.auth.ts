import { serviceInstance } from "..";

interface ILogin {
	language: "id-ID" | "en-US" | "en-UK",
	data: {
		rolesId: string;
		email: string;
	};
	isNotify: boolean
}

async function sendSSO(user: ILogin) {
	const { data } = await serviceInstance(user.isNotify).post(
		"/v1/auth/sso",
		user.data,
	);
	return data;
}
export { sendSSO };
