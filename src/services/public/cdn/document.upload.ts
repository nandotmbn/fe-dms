import { serviceInstance } from "@/services/services";

async function documentUpload(document: any) {
	const formData = new FormData();
	formData.append("documents", document);
	const { data } = await serviceInstance().post(
		"/v4/cdn/upload/documents",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": "id-ID",
			},
		}
	);
	return data;
}
export { documentUpload };
