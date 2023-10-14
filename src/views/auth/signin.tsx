"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import cookiesHandler from "@/helpers/cookies";
import { AuthService } from "@/services";
import { ROLES_TYPE } from "@/static";
import { LoadingOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ILogin {
	credential: string;
	password: string;
}
function SigninView() {
	const router = useRouter();
	const [refresher, refresherOrb] = useState(0);
	const [isLoading, setLoading] = useState(false);
	const [data, _setData] = useState<ILogin>({
		credential: "",
		password: "",
	});

	const setData = (label: string, value: any) => {
		_setData({
			...data,
			[label]: value,
		});
	};

	const handleLogin = async () => {
		setLoading(true);
		AuthService.login({ data: data, isNotify: true })
			.then((result) => {
				cookiesHandler.setCookie("access_token", result.data.access_token, 1);
				refresherOrb(refresher + 1);
			})
			.catch((error: any) => {
				refresherOrb(refresher + 1);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const handleRedirectLoggedIn = async () => {
		if (cookiesHandler.getCookie("access_token")) {
			const {data} = await AuthService.me({ isNotify: true });

			if (!data) {
				cookiesHandler.deleteCookie("access_token");

				return router.refresh();
			}

			const roles: ROLES_TYPE = data?.roles?.name as ROLES_TYPE;

			switch (roles) {
				case "SUPERINTENDENT":
					router.replace("/super");
					break;
				case "SUPERVISOR":
					router.replace("/super");
					break;
				case "STAFF":
					router.replace("/staff");
					break;

				default:
					break;
			}
		}
	};

	useEffect(() => {
		handleRedirectLoggedIn();
	}, [refresher, refresherOrb]);

	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center">
			<Image
				className="cursor-pointer inline"
				src="https://greenfieldsdairy.com/GreenfieldsLogoGreen.svg"
				alt="Logo PENS"
				width={200}
				height={1280}
			/>
			<div className="w-96 pb-16 bg-green-200 rounded-xl shadow-xl flex flex-col p-4">
				<h2 className="text-center font-bold text-green-700 text-xl">
					Administrator Login
				</h2>
				<div className="mt-4">
					<div>
						<label htmlFor="credential">E-mail/Username</label>
						<Input
							id="credential"
							name="credential"
							onChange={(text) => setData("credential", text.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<Input.Password
							id="password"
							name="password"
							onChange={(text) => setData("password", text.target.value)}
						/>
					</div>
					<button
						onClick={handleLogin}
						className="mt-8 px-4 py-1 rounded bg-gray-800 text-gray-100 w-full"
					>
						{isLoading ? <LoadingOutlined /> : "Login"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default SigninView;
