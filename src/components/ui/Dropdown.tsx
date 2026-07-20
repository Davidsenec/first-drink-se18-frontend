type DropdownProps = {
  options: string[];
};

export default function Dropdown({options,}: DropdownProps) {
    return (
    <div>
      <select className="border rounded-md p-2 w-full">
        {/* <option value="">Select an option</option> */}

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    );
}