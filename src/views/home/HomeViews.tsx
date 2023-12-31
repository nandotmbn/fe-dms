"use client";

import GridViewDocsList from "@/components/GridViewDocsList/GridViewDocsList";
import { MainService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import Jumbotron from "./partials/Jumbotron";

function HomeViews() {
	const documents = useQuery(["documents"], () =>
		MainService.Documents.getAll({
			isArchived: false,
			limit: 1000,
			page: 1,
			title: "",
			isNotify: false,
			status: "APPROVED",
		})
	);

	return (
		<div className="bg-gray-200 dark:bg-gray-700 dark:text-white pb-16 min-h-screen">
			<Jumbotron />
			<h1 id="published" className="text-center text-2xl font-bold my-8">
				Daftar Dokumen Terpublikasi
			</h1>
			<GridViewDocsList documents={documents?.data?.data} />
		</div>
	);
}

export default HomeViews;
