import { MasterService } from "@/services";
import { STATUS_TYPE } from "@/static";
import { DownOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Dropdown, MenuProps, Space } from "antd";
import { useState } from "react";

interface IStatusDropdown {
	onChange: (name: STATUS_TYPE) => void;
	defaultValue?: STATUS_TYPE;
	only?: STATUS_TYPE;
}

function StatusDropdown({
	onChange,
	defaultValue = "",
	only = "",
}: IStatusDropdown) {
	const { data } = useQuery(["master"], () =>
		MasterService.getMasterData({ isNotify: false })
	);

	const [role, setRole] = useState(defaultValue);
	let items: MenuProps["items"] = [
		{
			onClick: () => {
				onChange("");
				setRole("");
			},
			label: "NONE",
			key: "0",
		},
		{
			onClick: () => {
				onChange("PENDING");
				setRole("PENDING");
			},
			label: "PENDING",
			key: "1",
		},
		{
			onClick: () => {
				onChange("REVIEWED");
				setRole("REVIEWED");
			},
			label: "REVIEWED",
			key: "2",
		},
		{
			onClick: () => {
				onChange("REVISION");
				setRole("REVISION");
			},
			label: "REVISION",
			key: "3",
		},
		{
			onClick: () => {
				onChange("REUPLOAD");
				setRole("REUPLOAD");
			},
			label: "REUPLOAD",
			key: "4",
		},
		{
			onClick: () => {
				onChange("APPROVED");
				setRole("APPROVED");
			},
			label: "APPROVED",
			key: "5",
		},
	];

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

export default StatusDropdown;
