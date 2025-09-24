import React from "react";

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    score: number;
    inputType: "sound" | "animation";
}

// todo: make prettier
function FileUpload({ onChange, score, inputType }: Props) {
    let acceptTypes: string;
    if (inputType === "sound") {
        acceptTypes = ".mp3,.wav,.ogg";
    } else {
        acceptTypes = ".gif";
    }
    return (
        <>
            <label
                style={{
                    border: "1px solid #000",
                    padding: "8px",
                    display: "inline-block",
                    cursor: "pointer",
                }}
            >
                Upload {inputType} for score {score}
                <input
                    type="file"
                    accept={acceptTypes}
                    style={{ display: "none" }}
                    onChange={onChange}
                />
            </label>
        </>
    );
}

export default FileUpload;
