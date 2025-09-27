import React from "react";
import FileUpload from "./FileUpload";
import ScoreLabel from "./ScoreLabel";

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
    inputType: "sound" | "animation";
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

    return (
        <div
            key={score}
            style={{
                margin: "15px",
                border: "5px solid black",
                borderRadius: "10px",
                padding: "15px",
            }}
        >
            <ScoreLabel score={score} />
            <FileUpload
                onChange={onUpload}
                score={score}
                inputType={inputType}
            />
            {scoreInputValues?.fileName && (
                <button onClick={onRevert}>
                    Revert to default for score {score}?
                </button>
            )}
            {!scoreInputValues?.removed ? (
                <button onClick={onRemove}>
                    Remove all {inputType}s for score {score}?
                </button>
            ) : (
                <button onClick={onRevert}>
                    Add default {inputType} back for score {score}?
                </button>
            )}
            <div
                style={{
                    color: "black",
                    fontSize: "12px",
                    marginTop: "5px",
                }}
            >
                {scoreInputValues?.fileName && !scoreInputValues?.removed && (
                    <span>
                        {inputType} uploaded for score {score}:{" "}
                        {scoreInputValues.fileName}
                    </span>
                )}
                {!scoreInputValues?.fileName && !scoreInputValues?.removed && (
                    <span>
                        No {inputType} uploaded for score {score}, resort to
                        default
                    </span>
                )}
            </div>
        </div>
    );
}

export default ScoreCard;
