import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";

interface IBooleanDropdown {
	onChange: (e: boolean) => void;
	defaultValue?: "true" | "false";
	trueLabel: string;
	falseLabel: string;
	placeholder: string;
}

function BooleanDropdown({
	onChange,
	defaultValue,
	falseLabel = "false",
	trueLabel = "true",
	placeholder = "",
}: IBooleanDropdown) {
	const handleChange = (value: string) => {
		onChange(value == "true" ? true : false);
	};

	const items: DefaultOptionType[] = [
		{
			value: "true",
			label: trueLabel,
		},
		{
			value: "false",
			label: falseLabel,
		},
	];

	return (
		<Select
			placeholder={placeholder}
			optionFilterProp="children"
			options={items}
			defaultValue={defaultValue}
			onChange={handleChange}
		/>
	);
}

export default BooleanDropdown;
