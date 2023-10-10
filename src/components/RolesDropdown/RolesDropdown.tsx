import { MasterService } from "@/services";
import { ROLES_TYPE } from "@/static";
import { DownOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Dropdown, MenuProps, Space } from "antd";
import { useState } from "react";

interface IRolesDropdown {
	onChange: (e: { _id: string; name: ROLES_TYPE }) => void;
	defaultValue?: ROLES_TYPE;
	only?: ROLES_TYPE;
}

function RolesDropdown({
	onChange,
	defaultValue = "",
	only = "",
}: IRolesDropdown) {
	const { data } = useQuery(["master"], () =>
		MasterService.getMasterData({ isNotify: false })
	);

	const [role, setRole] = useState(defaultValue);
	let items: MenuProps["items"] = [
		{
			onClick: () => {
				onChange({ _id: "", name: "" });
				setRole("");
			},
			label: "NONE",
			key: "0",
		},
		{
			onClick: () => {
				onChange(data.data.ROLES.filter((r: any) => r.name == "SUPERVISOR")[0]);
				setRole("SUPERVISOR");
			},
			label: "SUPERVISOR",
			key: "1",
		},
		{
			onClick: () => {
				onChange(data.data.ROLES.filter((r: any) => r.name == "STAFF")[0]);
				setRole("STAFF");
			},
			label: "STAFF",
			key: "3",
		},
	];

	if (only) {
		items = [
			{
				onClick: () => {
					onChange({ _id: "", name: "" });
					setRole("");
				},
				label: "NONE",
				key: "0",
			},
			{
				onClick: () => {
					onChange(data.data.ROLES.filter((r: any) => r.name == only)[0]);
					setRole("STAFF");
				},
				label: "STAFF",
				key: "3",
			},
		];
	}

	return (
		<Dropdown menu={{ items }}>
			<a onClick={(e) => e.preventDefault()}>
				<Space className="w-full py-2 border-2 rounded-lg text-xs px-2 flex flex-row items-center justify-between bg-white">
					{!role ? "Pilih Roles" : role}
					<DownOutlined />
				</Space>
			</a>
		</Dropdown>
	);
}

export default RolesDropdown;
