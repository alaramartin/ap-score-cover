import { useState, useEffect } from "react";
import Header from "./components/Header.tsx";
import ScoreCard from "./components/ScoreCard.tsx";
import TabNavButton from "./components/TabNavButton.tsx";
// import ToggleSwitch from "./components/ToggleSwitch.tsx";

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

    const [activeTab, setActiveTab] = useState("sound");
    const switchActiveTab = (inputType: string) => {
        setActiveTab(inputType === "sound" ? "sound" : "animation");
    };

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

    // todo: change this to just reset animations or just reset sounds
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

    const scores = [5, 4, 3, 2, 1];

    return (
        <div
            style={{
                width: "500px",
                maxHeight: "600px",
                overflow: "auto",
                boxSizing: "border-box",
            }}
        >
            <Header />

            <div
                style={{
                    display: "flex",
                    gap: "2px",
                    borderBottom: "2px solid blue",
                    marginBottom: "15px",
                    background: "#f8f9fa",
                }}
            >
                <TabNavButton
                    inputType="sound"
                    activeTab={activeTab}
                    onSwitch={() => switchActiveTab("sound")}
                />
                <TabNavButton
                    inputType="animation"
                    activeTab={activeTab}
                    onSwitch={() => switchActiveTab("animation")}
                />
            </div>

            <div style={{ padding: "10px" }}>
                {scores.map((score) => (
                    <ScoreCard
                        key={score + activeTab}
                        score={score}
                        fileUploads={fileUploads}
                        inputType={activeTab}
                        onUpload={handleFileUpload(score, activeTab)}
                        onRevert={handleRevertToDefault(score, activeTab)}
                        onRemove={handleRemove(score, activeTab)}
                    />
                ))}
                <button onClick={resetAll}>
                    Reset All (Animations And Sounds) to default?
                </button>
            </div>
        </div>
    );
}

export default App;
