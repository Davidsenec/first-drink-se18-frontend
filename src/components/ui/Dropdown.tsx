export enum UserStatus {
    not_arrived = "not_arrived",
    in_party = "in_party",
    departed = "departed",

}

export type Option = {
  label: string;
  value: UserStatus;
  color: string;
};
type DropdownProps = {
  options: Option[];
  value: UserStatus;
  onChange: (value: UserStatus) => void;
};

export default function Dropdown({options, value, onChange}: DropdownProps) {
    return (
    <div>
        <select className="border rounded-xl bg-[#1B1D2F] p-2 " value={value} onChange={(e) => onChange(e.target.value as UserStatus)}>
            {options.map((option) => (
            <option
                key={option.value}
                value={option.value}
                style={{ color: option.color }}
            >
            {option.label}
            </option>
            ))}
        </select>
    </div>
    );
}