interface Props {
    inputType: string;
    onToggle: React.ChangeEventHandler<HTMLInputElement>;
    isChecked: boolean;
}

function ToggleSwitch({ inputType, onToggle, isChecked }: Props) {
    return (
        <>
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
                            isChecked ? "bg-blue-500" : "bg-gray-400"
                        }`}
                    ></div>
                    <div
                        className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform duration-200 shadow-sm ${
                            isChecked ? "translate-x-6" : "translate-x-0"
                        }`}
                    ></div>
                </div>
                <span className="flex items-center text-sm font-medium text-black ml-3">
                    {inputType.charAt(0).toUpperCase() + inputType.slice(1)}{" "}
                    Effect {isChecked ? "On" : "Off"}
                </span>
            </label>
        </>
    );
}

export default ToggleSwitch;
