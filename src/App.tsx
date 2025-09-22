import Header from "./components/Header.tsx";
import FileUpload from "./components/FileUpload.tsx";
import { useState, useEffect } from "react";

function App() {
  console.log("please");

  // initialize with the state in chrome.storage. if nothing in chrome.storage, then null
  const [soundFileUploads, setSoundFileUpload] = useState<
    Record<number, { fileName: string; base64: string } | null>
  >({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });
  // run when component first mounts
  useEffect(() => {
    chrome.storage.local.get(["soundUploads"]).then((result) => {
      if (result.soundUploads) {
        setSoundFileUpload(result.soundUploads);
      }
    });
  }, []);

  const handleScoreUpload =
    (score: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        // get the inputted file
        const file = e.target.files?.[0];
        console.log(file);
        // json stringify the audio file in base64
        if (file) {
          const fileBase64 = await getBase64(file);
          console.log(score);

          const fileData = {
            fileName: file.name,
            base64: fileBase64,
          };

          // save the state of the fileupload
          const newState = { ...soundFileUploads, [score]: fileData };
          setSoundFileUpload(newState);
          // save the state in chrome storage
          await chrome.storage.local.set({
            soundUploads: newState,
          });
        } else {
          console.log("nothing uploaded");
        }
      } catch (error) {
        console.error("failed to save sound", error);
      }
    };

  // const resetSounds = async () => {
  //   await chrome.storage.local.remove(["uploads"]);
  //   console.log("removed");
  // };

  // convert a file to a base64 string, returns a promise
  async function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result as string);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
        reject(error);
      };
    });
  }

  const scores = [1, 2, 3, 4, 5];

  return (
    <>
      <Header />
      <div style={{ padding: "10px" }}>
        <h3>Custom Sounds</h3>
        {scores.map((score) => (
          <div key={score} style={{ marginBottom: "10px" }}>
            <FileUpload onChange={handleScoreUpload(score)} score={score} />
            {soundFileUploads[score] && (
              <div
                style={{ color: "black", fontSize: "12px", marginTop: "5px" }}
              >
                Sound uploaded: {soundFileUploads[score].fileName}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
