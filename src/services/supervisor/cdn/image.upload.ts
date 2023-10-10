import { serviceInstance } from "@/services/";

async function imageUpload(image: any) {
	const formData = new FormData();
	formData.append("images", image);
	const { data } = await serviceInstance().post(
		"/v2/cdn/upload/images",
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
export { imageUpload };
