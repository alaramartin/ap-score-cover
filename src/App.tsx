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

            let fileData;
            if (inputType === "sound") {
                fileData = {
                    sound: {
                        fileName: currentSound.fileName,
                        base64: currentSound.base64,
                        removed: true,
                    },
                    anim: currentAnim,
                };
            } else {
                fileData = {
                    sound: currentSound,
                    anim: {
                        fileName: currentAnim.fileName,
                        base64: currentAnim.base64,
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

    // const resetAll = async () => {
    //     await chrome.storage.local.remove(["soundUploads"]);
    //     await chrome.storage.local.remove(["animationUploads"]);
    //     // todo: do the state resetting after refactoring code because it'll be easier
    //     const resetState = ;
    //     console.log("removed");
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
                        <FileUpload
                            onChange={handleFileUpload(score, "sound")}
                            onRevert={handleRevertToDefault(score, "sound")}
                            onRemove={handleRemove(score, "sound")}
                            score={score}
                            inputType="sound"
                        />
                        {fileUploads[score]?.sound && (
                            <div
                                style={{
                                    color: "black",
                                    fontSize: "12px",
                                    marginTop: "5px",
                                }}
                            >
                                Sound uploaded for score {score}:{" "}
                                {fileUploads[score].sound.fileName}
                            </div>
                        )}
                        {!fileUploads[score]?.sound && (
                            <div
                                style={{
                                    color: "black",
                                    fontSize: "12px",
                                    marginTop: "5px",
                                }}
                            >
                                No sound uploaded for score {score}, resort to
                                default
                            </div>
                        )}
                    </div>
                ))}

                <h3>Custom Animations</h3>
                {scores.map((score) => (
                    <div key={score} style={{ marginBottom: "10px" }}>
                        <FileUpload
                            onChange={handleFileUpload(score, "animation")}
                            onRevert={handleRevertToDefault(score, "animation")}
                            onRemove={handleRemove(score, "animation")}
                            score={score}
                            inputType="animation"
                        />
                        {fileUploads[score]?.anim && (
                            <div
                                style={{
                                    color: "black",
                                    fontSize: "12px",
                                    marginTop: "5px",
                                }}
                            >
                                Animation uploaded for score {score}:{" "}
                                {fileUploads[score].anim.fileName}
                            </div>
                        )}
                        {!fileUploads[score]?.anim && (
                            <div
                                style={{
                                    color: "black",
                                    fontSize: "12px",
                                    marginTop: "5px",
                                }}
                            >
                                No animation uploaded for score {score}, resort
                                to default
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
