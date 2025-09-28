import FileUpload from "./FileUpload";
import ScoreLabel from "./ScoreLabel";
import ToggleSwitch from "./ToggleSwitch";

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
    onUpload: React.ChangeEventHandler<HTMLInputElement>;
    onRevert: React.MouseEventHandler<HTMLButtonElement>;
    onRemove: React.MouseEventHandler<HTMLButtonElement>;
}

function ScoreCard({
    score,
    fileUploads,
    inputType,
    onUpload,
    onRevert,
    onRemove,
}: Props) {
    const scoreInputValues =
        inputType === "sound"
            ? fileUploads[score]?.sound
            : fileUploads[score]?.anim;

    const buttonStyle = {
        padding: "8px 12px",
        border: "1px solid",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "500",
        transition: "all 0.2s ease",
        background: "#6c757d",
        borderColor: "#6c757d",
        color: "white",
    };

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

    return (
        <div
            style={{
                padding: "12px",
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
                marginBottom: "12px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                gap: "16px",
            }}
        >
            <div
                style={{
                    flexShrink: 0,
                    flexDirection: "column",
                    color: "black",
                    fontSize: "12px",
                    marginTop: "5px",
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
                        }}
                    >
                        Uploaded: {scoreInputValues.fileName}
                    </span>
                )}
                {!scoreInputValues?.fileName && !scoreInputValues?.removed && (
                    <span>Using default</span>
                )}
                {scoreInputValues?.removed && (
                    <span>No {inputType} effect</span>
                )}
            </div>

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    gap: "8px",
                }}
            >
                <FileUpload onChange={onUpload} inputType={inputType} />
                {scoreInputValues?.fileName && (
                    <button onClick={onRevert} style={buttonStyle}>
                        Revert to Default
                    </button>
                )}

                <ToggleSwitch
                    inputType={inputType}
                    onToggle={handleRemoveToggle}
                    isChecked={!scoreInputValues?.removed}
                ></ToggleSwitch>
            </div>
        </div>
    );
}

export default ScoreCard;
