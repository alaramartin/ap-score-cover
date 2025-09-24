import Header from "./components/Header.tsx";
import FileUpload from "./components/FileUpload.tsx";
import { useState, useEffect } from "react";

function App() {
    // initialize with the state in chrome.storage. if nothing in chrome.storage, then null
    const [fileUploads, setFileUpload] = useState<
        Record<
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
        >
    >({
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
    });
    // run when component first mounts
    useEffect(() => {
        chrome.storage.local.get(["fileUploads"]).then((result) => {
            if (result.fileUploads) {
                setFileUpload(result.fileUploads);
            }
        });
    }, []);

    const handleFileUpload =
        (score: number, inputType: string) =>
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            try {
                // get the inputted file
                const file = e.target.files?.[0];
                console.log(file);
                // json stringify the file in base64
                if (file) {
                    const fileBase64 = await getBase64(file);
                    console.log(score);

                    const [currentSound, currentAnim] = getCurrentData(score);

                    let fileData;
                    if (inputType === "sound") {
                        fileData = {
                            sound: {
                                fileName: file.name,
                                base64: fileBase64,
                                removed: false,
                            },
                            anim: currentAnim,
                        };
                    } else {
                        fileData = {
                            sound: currentSound,
                            anim: {
                                fileName: file.name,
                                base64: fileBase64,
                                removed: false,
                            },
                        };
                    }

                    // save the state of the fileupload
                    const newState = {
                        ...fileUploads,
                        [score]: fileData,
                    };
                    setFileUpload(newState);
                    // save the state in chrome storage
                    await chrome.storage.local.set({
                        fileUploads: newState,
                    });
                } else {
                    console.log("nothing uploaded");
                }
            } catch (error) {
                console.error("failed to save file", error);
            }
        };

    const handleRevertToDefault =
        (score: number, inputType: string) => async () => {
            try {
                const [currentSound, currentAnim] = getCurrentData(score);

                let fileData;
                if (inputType === "sound") {
                    fileData = {
                        sound: {
                            fileName: "",
                            base64: "",
                            removed: false,
                        },
                        anim: currentAnim,
                    };
                } else {
                    fileData = {
                        sound: currentSound,
                        anim: {
                            fileName: "",
                            base64: "",
                            removed: false,
                        },
                    };
                }
                // save the state of the fileupload
                const newState = { ...fileUploads, [score]: fileData };
                setFileUpload(newState);
                // save the state in chrome storage
                await chrome.storage.local.set({
                    fileUploads: newState,
                });
            } catch (error) {
                console.error("failed to save file", error);
            }
        };

    const handleRemove = (score: number, inputType: string) => async () => {
        try {
            const [currentSound, currentAnim] = getCurrentData(score);

            let fileData;
            if (inputType === "sound") {
                fileData = {
                    sound: {
                        fileName: "",
                        base64: "",
                        removed: true,
                    },
                    anim: currentAnim,
                };
            } else {
                fileData = {
                    sound: currentSound,
                    anim: {
                        fileName: "",
                        base64: "",
                        removed: true,
                    },
                };
            }

            // save the state of the fileupload
            const newState = { ...fileUploads, [score]: fileData };
            setFileUpload(newState);
            // save the state in chrome storage
            await chrome.storage.local.set({
                fileUploads: newState,
            });
        } catch (error) {
            console.error("failed to save file", error);
        }
    };

    const resetAll = async (): Promise<void> => {
        try {
            await chrome.storage.local.remove(["fileUploads"]);
            setFileUpload({
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
            });

            console.log("reset");
        } catch (error) {
            console.error(error, "with resetting");
        }
    };

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

    function getCurrentData(score: number) {
        const existingData = fileUploads[score];
        const currentSound = existingData?.sound || {
            fileName: "",
            base64: "",
            removed: false,
        };
        const currentAnim = existingData?.anim || {
            fileName: "",
            base64: "",
            removed: false,
        };
        return [currentSound, currentAnim];
    }

    const scores = [1, 2, 3, 4, 5];

    return (
        <>
            <Header />
            <div style={{ padding: "10px" }}>
                <h3>Custom Sounds</h3>
                {scores.map((score) => (
                    <div key={score} style={{ marginBottom: "10px" }}>
                        <FileUpload
                            onChange={handleFileUpload(score, "sound")}
                            score={score}
                            inputType="sound"
                        />
                        {fileUploads[score]?.sound?.fileName && (
                            <button
                                onClick={handleRevertToDefault(score, "sound")}
                            >
                                Revert to default for score {score}?
                            </button>
                        )}
                        {!fileUploads[score]?.sound?.removed ? (
                            <button onClick={handleRemove(score, "sound")}>
                                Remove all sounds for score {score}?
                            </button>
                        ) : (
                            <button
                                onClick={handleRevertToDefault(score, "sound")}
                            >
                                Add default sound back for score {score}?
                            </button>
                        )}
                        <div
                            style={{
                                color: "black",
                                fontSize: "12px",
                                marginTop: "5px",
                            }}
                        >
                            {fileUploads[score]?.sound?.fileName &&
                                !fileUploads[score]?.sound?.removed && (
                                    <span>
                                        Sound uploaded for score {score}:{" "}
                                        {fileUploads[score].sound.fileName}
                                    </span>
                                )}
                            {!fileUploads[score]?.sound?.fileName &&
                                !fileUploads[score]?.sound?.removed && (
                                    <span>
                                        No sound uploaded for score {score},
                                        resort to default
                                    </span>
                                )}
                        </div>
                    </div>
                ))}

                <h3>Custom Animations</h3>
                {scores.map((score) => (
                    <div key={score} style={{ marginBottom: "10px" }}>
                        <FileUpload
                            onChange={handleFileUpload(score, "animation")}
                            score={score}
                            inputType="animation"
                        />
                        {fileUploads[score]?.anim?.fileName && (
                            <button
                                onClick={handleRevertToDefault(
                                    score,
                                    "animation"
                                )}
                            >
                                Revert to default for score {score}?
                            </button>
                        )}
                        {!fileUploads[score]?.anim?.removed ? (
                            <button onClick={handleRemove(score, "animation")}>
                                Remove all animations for score {score}?
                            </button>
                        ) : (
                            <button
                                onClick={handleRevertToDefault(
                                    score,
                                    "animation"
                                )}
                            >
                                Add default animation back for score {score}?
                            </button>
                        )}
                        <div
                            style={{
                                color: "black",
                                fontSize: "12px",
                                marginTop: "5px",
                            }}
                        >
                            {fileUploads[score]?.anim?.fileName &&
                                !fileUploads[score]?.anim?.removed && (
                                    <span>
                                        Animation uploaded for score {score}:{" "}
                                        {fileUploads[score].anim.fileName}
                                    </span>
                                )}
                            {!fileUploads[score]?.anim?.fileName &&
                                !fileUploads[score]?.anim?.removed && (
                                    <span>
                                        No animation uploaded for score {score},
                                        resort to default
                                    </span>
                                )}
                        </div>
                    </div>
                ))}
                <button onClick={resetAll}>
                    Reset All (Animations And Sounds) to default?
                </button>
            </div>
        </>
    );
}

export default App;
