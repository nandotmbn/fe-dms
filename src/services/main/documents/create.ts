import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	document: {
		title: string;
		content: string;
	};
}

async function create({ isNotify, document }: IReq) {
	const { data } = await serviceInstance(isNotify).post(
		`/v1/documents/`,
		document
	);
	return data;
}

export { create };
