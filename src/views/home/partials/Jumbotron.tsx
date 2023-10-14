import {
	EyeFilled,
	FileMarkdownFilled,
	FilePdfFilled,
	UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";

function Jumbotron() {
	return (
		<section className="h-screen w-full bg-green-200 dark:bg-green-900">
			<Image
				src="/cdn/images/greenfields-headquarters-indonesia.jpg"
				fill
				alt="Greenfields Manuf"
			/>
			<div className="relative inset-0 bg-black w-screen h-screen bg-opacity-50 dark:bg-opacity-80 z-10">
				<div className="relative inset-0 w-screen h-screen z-20 flex flex-col md:flex-row items-center gap-4 px-8">
					<div className="flex flex-col text-white flex-2 mt-24">
						<h2>PT. Greenfields Indonesia</h2>
						<p className="text-4xl font-semibold">Sistem Manajemen Dokumen</p>
						<button className="mt-8 px-4 py-2 rounded-full bg-green-600 border-2 border-green-100">
							Lihat Dokumen Terpublikasi
						</button>
					</div>
					<div className="flex flex-col text-white flex-3 items-center">
						<div className="flex flex-col gap-4 mt-4 md:mt-16">
							<div className="flex flex-row gap-4 items-center">
								<div className="w-8 h-8 lg:w-24 lg:h-24 dark:bg-gray-600 rounded-full flex items-center justify-center">
									<FileMarkdownFilled className="text-xl lg:text-3xl xl:text-5xl" />
								</div>
								<p className="text-sm lg:text-lg xl:text-xl">Editor Markdown File</p>
							</div>
							<div className="flex flex-row gap-4 items-center">
								<div className="w-8 h-8 lg:w-24 lg:h-24 dark:bg-gray-600 rounded-full flex items-center justify-center">
									<FilePdfFilled className="text-xl lg:text-3xl xl:text-5xl" />
								</div>
								<p className="text-sm lg:text-lg xl:text-xl">Dapat dilihat dalam bentuk PDF</p>
							</div>
							<div className="flex flex-row gap-4 items-center">
								<div className="w-8 h-8 lg:w-24 lg:h-24 dark:bg-gray-600 rounded-full flex items-center justify-center">
									<EyeFilled className="text-xl lg:text-3xl xl:text-5xl" />
								</div>
								<p className="text-sm lg:text-lg xl:text-xl">
									Mode <i>View Only</i> untuk file yg terpublikasi
								</p>
							</div>
							<div className="flex flex-row gap-4 items-center">
								<div className="w-8 h-8 lg:w-24 lg:h-24 dark:bg-gray-600 rounded-full flex items-center justify-center">
									<UserOutlined className="text-xl lg:text-3xl xl:text-5xl" />
								</div>
								<p className="text-sm lg:text-lg xl:text-xl">User Management</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Jumbotron;
