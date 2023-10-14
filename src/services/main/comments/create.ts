import { serviceInstance } from "@/services/services";

interface IReq {
	isNotify?: boolean;
	comment: {
		content: string;
		documentId: string;
	};
}

async function create({ isNotify, comment }: IReq) {
	const { data } = await serviceInstance(isNotify).post(
		`/v1/comments/`,
		comment
	);
	return data;
}

export { create };
