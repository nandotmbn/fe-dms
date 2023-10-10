"use client";

import {
	DownOutlined,
	FileMarkdownOutlined,
	FlagOutlined,
	ReconciliationOutlined,
	RightOutlined,
	UnorderedListOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Panel } = Collapse;

interface INavbarAdmin {
	collapsed: boolean;
}

function NavbarAdmin({ collapsed }: INavbarAdmin) {
	const pathname = usePathname();

	const defineActivePage = (panel: string, page: string) => {
		const activePanel = pathname.split("/")[2];
		const activePage = pathname.split("/")[3];

		if (panel == activePanel && page == activePage)
			return "bg-blue-400 text-white";
		return "";
	};

	return (
		<Collapse
			expandIcon={({ isActive }) =>
				!isActive ? (
					<RightOutlined style={{ fontSize: "8px", color: "white" }} />
				) : (
					<DownOutlined style={{ fontSize: "8px", color: "white" }} />
				)
			}
			ghost
			defaultActiveKey={[1, 2, 3, 4]}
			className="pb-16"
		>
			<Panel
				className="text-white"
				header={
					<div
						className={`flex text-white flex-row items-center justify-start`}
					>
						<UserOutlined className={!collapsed ? "text-sm" : "text-xl"} />
						{!collapsed && <p className="mx-2 text-xs">Pengguna</p>}
					</div>
				}
				key="1"
			>
				<Link href="/supervisor/users/list">
					<div
						className={`text-white flex flex-row items-center justify-start mb-1 hover:bg-gray-400 rounded-full px-1 hover:text-white ${
							collapsed && "my-2 justify-center"
						} ${defineActivePage("users", "list")}`}
					>
						<UnorderedListOutlined
							className={!collapsed ? "text-sm" : "text-xl"}
						/>
						{!collapsed && <p className="text-xs ml-1">Daftar Pengguna</p>}
					</div>
				</Link>
			</Panel>
			<Panel
				className="text-white"
				header={
					<div
						className={`flex text-white flex-row items-center justify-start`}
					>
						<ReconciliationOutlined
							className={!collapsed ? "text-sm" : "text-xl"}
						/>
						{!collapsed && <p className="mx-2 text-xs">Dokumen</p>}
					</div>
				}
				key="2"
			>
				<Link href="/supervisor/documents/pending">
					<div
						className={`text-white flex flex-row items-center justify-start mb-1 hover:bg-gray-400 rounded-full px-1 hover:text-white ${
							collapsed && "my-2 justify-center"
						} ${defineActivePage("documents", "pending")}`}
					>
						<UnorderedListOutlined
							className={!collapsed ? "text-sm" : "text-xl"}
						/>
						{!collapsed && <p className="text-xs ml-1">Pending</p>}
					</div>
				</Link>
				<Link href="/supervisor/documents/reviewed">
					<div
						className={`text-white flex flex-row items-center justify-start mb-1 hover:bg-gray-400 rounded-full px-1 hover:text-white ${
							collapsed && "my-2 justify-center"
						} ${defineActivePage("documents", "reviewed")}`}
					>
						<FileMarkdownOutlined
							className={!collapsed ? "text-sm" : "text-xl"}
						/>
						{!collapsed && <p className="text-xs ml-1">Reviewed</p>}
					</div>
				</Link>
				<Link href="/supervisor/documents/revisions">
					<div
						className={`text-white flex flex-row items-center justify-start mb-1 hover:bg-gray-400 rounded-full px-1 hover:text-white ${
							collapsed && "my-2 justify-center"
						} ${defineActivePage("documents", "revisions")}`}
					>
						<FlagOutlined className={!collapsed ? "text-sm" : "text-xl"} />
						{!collapsed && <p className="text-xs ml-1">Revisi</p>}
					</div>
				</Link>
				<Link href="/supervisor/documents/reupload">
					<div
						className={`text-white flex flex-row items-center justify-start mb-1 hover:bg-gray-400 rounded-full px-1 hover:text-white ${
							collapsed && "my-2 justify-center"
						} ${defineActivePage("documents", "reupload")}`}
					>
						<FlagOutlined className={!collapsed ? "text-sm" : "text-xl"} />
						{!collapsed && <p className="text-xs ml-1">Upload Ulang</p>}
					</div>
				</Link>
				<Link href="/supervisor/documents/approved">
					<div
						className={`text-white flex flex-row items-center justify-start mb-1 hover:bg-gray-400 rounded-full px-1 hover:text-white ${
							collapsed && "my-2 justify-center"
						} ${defineActivePage("documents", "approved")}`}
					>
						<FlagOutlined className={!collapsed ? "text-sm" : "text-xl"} />
						{!collapsed && <p className="text-xs ml-1">Diterima</p>}
					</div>
				</Link>
			</Panel>
		</Collapse>
	);
}

export default NavbarAdmin;
