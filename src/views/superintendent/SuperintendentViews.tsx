"use client";
import { useQuery } from "@tanstack/react-query";
import Header from "./partials/Header";
import { AuthService } from "@/services";
import TableUsersList from "@/components/TableUsersList/TableUsersList";
import TokenChecker from "../../components/TokenChecker/TokenChecker";

function SuperintendentViews() {
	const myProfile = useQuery(["myProfile"], () =>
		AuthService.me({ isNotify: false })
	);

	return (
		<TokenChecker>
			<Header />
			<div className="flex flex-col md:flex-row gap-4 items-start px-1">
				<h2 className="text-lg md:text-2xl text-center">Daftar Pengguna</h2>
				{/* <button className="px-4 py-2 bg-green-600 rounded-xl text-white">
          <p className="text-sm md:text-xl">Tambah Pengguna</p>
        </button> */}
			</div>
			<TableUsersList add={true} roleAs="SUPERINTENDENT" />
		</TokenChecker>
	);
}

export default SuperintendentViews;
