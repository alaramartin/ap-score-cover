import React from "react";

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    inputType: string;
}

// todo: make prettier
function FileUpload({ onChange, inputType }: Props) {
    let acceptTypes: string;
    if (inputType === "sound") {
        acceptTypes = ".mp3,.wav,.ogg";
    } else {
        acceptTypes = ".gif";
    }

    const buttonStyle = {
        padding: "8px 12px",
        border: "1px solid",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "500",
        transition: "all 0.2 ease",
        background: "blue",
        borderColor: "blue",
        color: "white",
        display: "inline-block",
    };

    return (
        <>
            <label style={buttonStyle}>
                Upload {inputType}
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
