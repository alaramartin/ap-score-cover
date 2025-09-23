import Header from "./components/Header.tsx";
import FileUpload from "./components/FileUpload.tsx";
import { useState, useEffect } from "react";

function App() {
    // initialize with the state in chrome.storage. if nothing in chrome.storage, then null
    // todo: refactor everythign to jsut this
    // const newState = {
    //     ...oldUploads,
    //     [score]: {
    //         ...oldUploads[score], // Keep existing properties
    //         removed: true        // Only update this property
    //     }
    // };
    // const [fileUploads, setFileUpload] = useState<
    //     Record<
    //         number,
    //         {
    //             soundFileName: string;
    //             soundBase64: string;
    //             soundRemoved: boolean;
    //             animFileName: string;
    //             animBase64: string;
    //             animRemoved: boolean;
    //         } | null
    //     >
    // >({
    //     1: null,
    //     2: null,
    //     3: null,
    //     4: null,
    //     5: null,
    // });
    // // run when component first mounts
    // useEffect(() => {
    //     chrome.storage.local.get(["fileUploads"]).then((result) => {
    //         if (result.fileUploads) {
    //             setSoundFileUpload(result.fileUploads);
    //         }
    //     });
    // }, []);

    const [soundFileUploads, setSoundFileUpload] = useState<
        Record<
            number,
            { fileName: string; base64: string; removed: boolean } | null
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
        chrome.storage.local.get(["soundUploads"]).then((result) => {
            if (result.soundUploads) {
                setSoundFileUpload(result.soundUploads);
            }
        });
    }, []);

    // initialize with the state in chrome.storage. if nothing in chrome.storage, then null
    const [animationFileUploads, setAnimationFileUpload] = useState<
        Record<
            number,
            { fileName: string; base64: string; removed: boolean } | null
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
        chrome.storage.local.get(["animationUploads"]).then((result) => {
            if (result.animationUploads) {
                setAnimationFileUpload(result.animationUploads);
            }
        });
    }, []);

    const handleFileUpload =
        (score: number, inputType: string) =>
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            try {
                let oldUploads;
                let setFileUpload;
                let chromeStorageKey;
                if (inputType === "sound") {
                    oldUploads = soundFileUploads;
                    setFileUpload = setSoundFileUpload;
                    chromeStorageKey = "soundUploads";
                } else if (inputType === "animation") {
                    oldUploads = animationFileUploads;
                    setFileUpload = setAnimationFileUpload;
                    chromeStorageKey = "animationUploads";
                } else {
                    throw new Error("unknown input type");
                }

                // get the inputted file
                const file = e.target.files?.[0];
                console.log(file);
                // json stringify the file in base64
                if (file) {
                    const fileBase64 = await getBase64(file);
                    console.log(score);

                    const fileData = {
                        fileName: file.name,
                        base64: fileBase64,
                        removed: false,
                    };

                    // save the state of the fileupload
                    const newState = { ...oldUploads, [score]: fileData };
                    setFileUpload(newState);
                    // save the state in chrome storage
                    await chrome.storage.local.set({
                        [chromeStorageKey]: newState,
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
                // fixme: below stuff will all be removed/made more efficient when code is refactored
                let oldUploads;
                let setFileUpload;
                let chromeStorageKey;
                if (inputType === "sound") {
                    oldUploads = soundFileUploads;
                    setFileUpload = setSoundFileUpload;
                    chromeStorageKey = "soundUploads";
                } else if (inputType === "animation") {
                    oldUploads = animationFileUploads;
                    setFileUpload = setAnimationFileUpload;
                    chromeStorageKey = "animationUploads";
                } else {
                    throw new Error("unknown input type");
                }

                const fileData = null;

                // save the state of the fileupload
                const newState = { ...oldUploads, [score]: fileData };
                setFileUpload(newState);
                // save the state in chrome storage
                await chrome.storage.local.set({
                    [chromeStorageKey]: newState,
                });
            } catch (error) {
                console.error("failed to save file", error);
            }
        };

    const handleRemove = (score: number, inputType: string) => async () => {
        try {
            // fixme: below stuff will all be removed/made more efficient when code is refactored
            let oldUploads;
            let setFileUpload;
            let chromeStorageKey;
            if (inputType === "sound") {
                oldUploads = soundFileUploads;
                setFileUpload = setSoundFileUpload;
                chromeStorageKey = "soundUploads";
            } else if (inputType === "animation") {
                oldUploads = animationFileUploads;
                setFileUpload = setAnimationFileUpload;
                chromeStorageKey = "animationUploads";
            } else {
                throw new Error("unknown input type");
            }

            const fileData = null;

            // save the state of the fileupload
            const newState = { ...oldUploads, [score]: fileData };
            setFileUpload(newState);
            // save the state in chrome storage
            await chrome.storage.local.set({
                [chromeStorageKey]: newState,
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
                        {soundFileUploads[score] && (
                            <div
                                style={{
                                    color: "black",
                                    fontSize: "12px",
                                    marginTop: "5px",
                                }}
                            >
                                Sound uploaded for score {score}:{" "}
                                {soundFileUploads[score].fileName}
                            </div>
                        )}
                        {!soundFileUploads[score] && (
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
                {scores.map((score) => (
                    <div key={score} style={{ marginBottom: "10px" }}>
                        <FileUpload
                            onChange={handleFileUpload(score, "animation")}
                            onRevert={handleRevertToDefault(score, "animation")}
                            onRemove={handleRemove(score, "animation")}
                            score={score}
                            inputType="animation"
                        />
                        {animationFileUploads[score] && (
                            <div
                                style={{
                                    color: "black",
                                    fontSize: "12px",
                                    marginTop: "5px",
                                }}
                            >
                                Animation uploaded for score {score}:{" "}
                                {animationFileUploads[score].fileName}
                            </div>
                        )}
                        {!animationFileUploads[score] && (
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
