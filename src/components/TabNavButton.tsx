import React from "react";
import { colors } from "../styles/colors.ts";

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
                padding: "12px 16px",
                border: "none",
                background: isActive ? colors.primary : colors.background,
                color: isActive ? "white" : colors.textSecondary,
                fontSize: "14px",
                fontWeight: isActive ? "600" : "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderRadius: "8px 8px 0 0",
                borderBottom: isActive
                    ? `3px solid ${colors.primary}`
                    : "3px solid transparent",
            }}
            onMouseEnter={(e) => {
                if (!isActive) {
                    e.currentTarget.style.background = colors.border;
                }
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    e.currentTarget.style.background = colors.background;
                }
            }}
        >
            {inputType === "sound" ? "Sounds" : "Animations"}
        </button>
    );
}

export default TabNavButton;
