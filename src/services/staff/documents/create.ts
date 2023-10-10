import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	document: {
		title: string;
		fileName: string;
	};
}

async function create({ isNotify, document }: IReq) {
	const { data } = await serviceInstance(isNotify).post(
		`/v3/documents/`,
		document
	);
	return data;
}

export { create };
