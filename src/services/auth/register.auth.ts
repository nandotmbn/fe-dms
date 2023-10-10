import { serviceInstance } from "..";
import _ from "lodash"

interface IRegister {
	language: "id-ID" | "en-US" | "en-UK",
	data: {
		firstName: string;
		lastName: string;
		username: string;
		email: string;
		rolesId: string;
		password: string;
	};
	isNotify: boolean;
}

async function register(user: IRegister) {
	const { data } = await serviceInstance(user.isNotify).post(
		"/v1/auth/register",
		user.data,
	);
	return data;
}
export { register };
