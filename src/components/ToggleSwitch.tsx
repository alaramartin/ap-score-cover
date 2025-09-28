import { colors } from "../styles/colors.ts";

interface Props {
    inputType: string;
    onToggle: React.ChangeEventHandler<HTMLInputElement>;
    isChecked: boolean;
}

function ToggleSwitch({ inputType, onToggle, isChecked }: Props) {
    return (
        <div className="flex flex-col items-center gap-2">
            <label className="flex cursor-pointer select-none items-center">
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={onToggle}
                        className="sr-only"
                    />
                    <div
                        className={`box block h-8 w-14 rounded-full transition-colors duration-200 ${
                            isChecked ? "bg-indigo-500" : "bg-gray-300"
                        }`}
                        style={{
                            background: isChecked
                                ? colors.success
                                : colors.textMuted,
                            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
                        }}
                    ></div>
                    <div
                        className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform duration-200 shadow-sm ${
                            isChecked ? "translate-x-6" : "translate-x-0"
                        }`}
                        style={{
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
                        }}
                    ></div>
                </div>
            </label>
            <span
                className="flex items-center font-medium text-black cursor-default"
                style={{ fontSize: "12px" }}
            >
                {inputType.charAt(0).toUpperCase() + inputType.slice(1)} Effect{" "}
                {isChecked ? "On" : "Off"}
            </span>
        </div>
    );
}

export default ToggleSwitch;
