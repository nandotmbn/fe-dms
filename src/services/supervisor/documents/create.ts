import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	document: {
		title: {
			id: string;
			en: string;
		};
		description: {
			id: string;
			en: string;
		};
		fileName: string;
	};
}

async function create({ isNotify, document }: IReq) {
	const { data } = await serviceInstance(isNotify).post(
		`/v2/documents/`,
		document
	);
	return data;
}

export { create };
