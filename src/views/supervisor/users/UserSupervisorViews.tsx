"use client";
import TableUsersList from "@/components/TableUsersList/TableUsersList";
import { AuthService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import TokenChecker from "../../../components/TokenChecker/TokenChecker";

function UserSupervisorViews() {
	return (
		<TokenChecker>
			<div className="flex flex-col md:flex-row gap-4 items-start px-1">
				<h2 className="text-lg md:text-2xl text-center">Daftar Pengguna</h2>
			</div>
			<TableUsersList add={true} roleAs="SUPERVISOR" />
		</TokenChecker>
	);
}

export default UserSupervisorViews;
