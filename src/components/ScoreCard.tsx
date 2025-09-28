import FileUpload from "./FileUpload";
import ScoreLabel from "./ScoreLabel";
import ToggleSwitch from "./ToggleSwitch";
import { colors } from "../styles/colors.ts";

interface Props {
    score: number;
    fileUploads: Record<
        number,
        {
            sound: {
                fileName: string;
                base64: string;
                removed: boolean;
            };
            anim: {
                fileName: string;
                base64: string;
                removed: boolean;
            };
        } | null
    >;
    inputType: string;
    buttonStyle: React.CSSProperties;
    onUpload: React.ChangeEventHandler<HTMLInputElement>;
    onRevert: React.MouseEventHandler<HTMLButtonElement>;
    onRemove: React.MouseEventHandler<HTMLButtonElement>;
}

function ScoreCard({
    score,
    fileUploads,
    inputType,
    buttonStyle,
    onUpload,
    onRevert,
    onRemove,
}: Props) {
    const scoreInputValues =
        inputType === "sound"
            ? fileUploads[score]?.sound
            : fileUploads[score]?.anim;

    const handleRemoveToggle = () => {
        if (scoreInputValues?.removed) {
            onRevert(
                undefined as unknown as React.MouseEvent<HTMLButtonElement>
            );
        } else {
            onRemove(
                undefined as unknown as React.MouseEvent<HTMLButtonElement>
            );
        }
    };

    const revertButtonStyle = {
        ...buttonStyle,
        background: colors.warning,
        borderColor: colors.warning,
        color: "white",
    };

    const uploadButtonStyle = {
        ...buttonStyle,
        background: colors.primary,
        borderColor: colors.primary,
        color: "white",
        verticalAlign: "middle",
        lineHeight: "1",
    };

    return (
        <div
            style={{
                padding: "16px",
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                marginBottom: "8px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: colors.cardBackground,
            }}
        >
            <div
                style={{
                    flexShrink: 0,
                    flexDirection: "column",
                    color: "black",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    maxWidth: "120px",
                }}
            >
                <ScoreLabel score={score} />
                {scoreInputValues?.fileName && !scoreInputValues?.removed && (
                    <span
                        style={{
                            textAlign: "center",
                            wordBreak: "break-word",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2, // truncate if too long
                            WebkitBoxOrient: "vertical",
                            marginTop: "8px",
                        }}
                    >
                        Uploaded: {scoreInputValues.fileName}
                    </span>
                )}
                {!scoreInputValues?.fileName && !scoreInputValues?.removed && (
                    <span style={{ marginTop: "8px" }}>Using default</span>
                )}
                {scoreInputValues?.removed && (
                    <span style={{ marginTop: "8px" }}>
                        No {inputType} effect
                    </span>
                )}
            </div>

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                }}
            >
                <FileUpload
                    onChange={onUpload}
                    buttonStyle={uploadButtonStyle}
                    inputType={inputType}
                />
                {scoreInputValues?.fileName && (
                    <button onClick={onRevert} style={revertButtonStyle}>
                        Reset
                    </button>
                )}

                <div style={{ marginLeft: "auto" }}>
                    <ToggleSwitch
                        inputType={inputType}
                        onToggle={handleRemoveToggle}
                        isChecked={!scoreInputValues?.removed}
                    ></ToggleSwitch>
                </div>
            </div>
        </div>
    );
}

export default ScoreCard;
