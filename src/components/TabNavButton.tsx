interface Props {
    inputType: string;
    activeTab: string;
    onSwitch: () => void;
}

function TabNavButton({ inputType, activeTab, onSwitch }: Props) {
    return (
        <button
            onClick={onSwitch}
            style={{
                flex: 1,
                border: "none",
                borderBottom:
                    activeTab === inputType
                        ? "3px solid purple"
                        : "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
            }}
        >
            {inputType === "sound" ? "Sounds" : "Animations"}
        </button>
    );
}

export default TabNavButton;
