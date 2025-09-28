import { useRef } from "react";

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    buttonStyle: React.CSSProperties;
    inputType: string;
}

function FileUpload({ onChange, buttonStyle, inputType }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    let acceptTypes: string;
    if (inputType === "sound") {
        acceptTypes = ".mp3,.wav,.ogg";
    } else {
        acceptTypes = ".gif";
    }

    const uploadButtonStyle = {
        ...buttonStyle,
        background: "blue",
        borderColor: "blue",
        color: "white",
        whiteSpace: "nowrap" as const,
        textAlign: "center" as const,
        verticalAlign: "middle",
        minHeight: "0",
        height: "auto",
    } as React.CSSProperties;

    return (
        <>
            <div onClick={handleClick} style={uploadButtonStyle}>
                Upload {inputType}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept={acceptTypes}
                style={{ display: "none" }}
                onChange={onChange}
            />
        </>
    );
}

export default FileUpload;
