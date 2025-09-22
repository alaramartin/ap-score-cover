import React from "react";

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  score: number;
}

// todo: override the way HTML default file inputs look (sob)
/* note: hide the input, customize the label
keep track of file name AND base64 string in state/chromestorage
*/
function FileUpload({ onChange, score }: Props) {
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
        Upload for score {score}
        <input
          type="file"
          accept=".mp3,.wav,.ogg"
          style={{ display: "none" }}
          onChange={onChange}
        />
      </label>
    </>
  );
}

export default FileUpload;
