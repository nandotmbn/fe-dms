import { serviceInstance } from "..";

interface ILogin {
	isNotify: boolean;
	headless?: boolean
}

async function me({isNotify, headless}: ILogin) {
	const { data } = await serviceInstance(isNotify).get("/v1/auth/me");
	return data;
}
export { me };
