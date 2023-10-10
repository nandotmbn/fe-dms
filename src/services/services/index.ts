import cookiesHandler from "@/helpers/cookies";
import { message } from "antd";
import axios from "axios";
import {URL_ENDPOINT} from "@/static";

const urlEndpoint = URL_ENDPOINT;

const serviceInstance = (
	isNotify: boolean = false,
	headless: boolean = false
) => {
	const accessToken = headless ? "" : cookiesHandler.getCookie("access_token");
	const _serviceInstance = axios.create({
		baseURL: urlEndpoint,
		timeout: 10000,
		headers: {
			"Access-Control-Allow-Origin": "*",
			Authorization: "Bearer " + accessToken,
		},
	});

	_serviceInstance.interceptors.response.use(
		function (response): any {
			if (isNotify) message.success({ content: response.data.message });
			return response;
		},
		function (error) {
			if (isNotify) message.error({ content: error.response.data.message });
			return error;
		}
	);

	return _serviceInstance;
};

export {serviceInstance}