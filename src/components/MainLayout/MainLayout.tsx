"use client";

import { AuthService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import DrawerMenu from "./partials/DrawerMenu";
import FooterMainLayout from "./partials/Footer";
import ModeSwitcher from "./partials/ModeSwitcher";

function MainLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const locale = pathname.split("/")[1];

	const myProfile = useQuery(["myProfile"], () =>
		AuthService.me({ isNotify: false })
	);

	return (
		<>
			<header className="border-gray-300 bg-gray-200 dark:bg-black fixed w-full z-50">
				<div className="flex flex-row py-2 items-center justify-between w-11/12 m-auto">
					<div className="flex flex-row gap-2 items-center">
						<Image
							className="contain relative"
							src="https://greenfieldsdairy.com/GreenfieldsLogoGreen.svg"
							alt="OKE"
							width={140}
							height={140}
						/>
					</div>
					<DrawerMenu />

					<div className="flex-row gap-8 items-center hidden md:flex">
						<ul className="flex flex-row gap-4">
							<li>
								<Link href={"/auth/signin"}>
									<p className="text-sm text-blue-900 hover:text-blue-400 dark:text-blue-200 hover:dark:text-white">
										{myProfile?.data?.data?.fullName || "Login"}
									</p>
								</Link>
							</li>
						</ul>

						{/* <LanguageSwitcher /> */}
						<ModeSwitcher />
					</div>
				</div>
			</header>
			<main className="">{children}</main>
			<FooterMainLayout />
		</>
	);
}

export default MainLayout;
