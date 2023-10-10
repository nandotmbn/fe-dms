import { serviceInstance } from "..";

interface IReq {
	isNotify?: boolean;
}

async function getMasterData({ isNotify }: IReq) {
	const { data } = await serviceInstance(isNotify).get(`/v4/master`);
	return data;
}

export { getMasterData };
