import React from "react";

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  score: number;
}

function FileUpload({ onChange, score }: Props) {
  return (
    <>
      <label>Sound for score {score}: </label>
      <input type="file" accept=".mp3,.wav,.ogg" onChange={onChange} />
    </>
  );
}

export default FileUpload;
