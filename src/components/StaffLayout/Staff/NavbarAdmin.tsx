"use client";

import {
	DownOutlined,
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

	const route = "super";

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
						<ReconciliationOutlined
							className={!collapsed ? "text-sm" : "text-xl"}
						/>
						{!collapsed && <p className="mx-2 text-xs">Dokumen</p>}
					</div>
				}
				key="2"
			>
				<Link href={"/" + route + "/documents/list"}>
					<div
						className={`text-white flex flex-row items-center justify-start mb-1 hover:bg-gray-400 rounded-full px-1 hover:text-white ${
							collapsed && "my-2 justify-center"
						} ${defineActivePage("documents", "list")}`}
					>
						<UnorderedListOutlined
							className={!collapsed ? "text-sm" : "text-xl"}
						/>
						{!collapsed && <p className="text-xs ml-1">Daftar Dokumen</p>}
					</div>
				</Link>
			</Panel>
		</Collapse>
	);
}

export default NavbarAdmin;
