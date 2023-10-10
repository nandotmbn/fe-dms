import { serviceInstance } from "..";

interface ILogin {
	isNotify: boolean;
	headless?: boolean
}

async function me({isNotify, headless}: ILogin) {
	const { data } = await serviceInstance(isNotify).get("/v4/auth/me");
	return data;
}
export { me };
