import React from "react";

interface Props {
    inputType: string;
    activeTab: string;
    onSwitch: React.MouseEventHandler<HTMLButtonElement>;
}

function TabNavButton({ inputType, activeTab, onSwitch }: Props) {
    const isActive = activeTab === inputType;

    return (
        <button
            onClick={onSwitch}
            style={{
                flex: 1,
                padding: "12px 8px",
                border: "none",
                background: isActive ? "#007bff" : "#f8f9fa",
                color: isActive ? "white" : "#666",
                fontSize: "14px",
                fontWeight: "500",
                borderBottom: isActive ? "4px solid blue" : "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                borderRadius: "6px 6px 0 0",
            }}
        >
            {inputType === "sound" ? "Sounds" : "Animations"}
        </button>
    );
}

export default TabNavButton;
