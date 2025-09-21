import Header from './components/Header.tsx'

/*
chrome.storage.local.set({ key: value }).then(() => {
  console.log("Value is set");
});

chrome.storage.local.get(["key"]).then((result) => {
  console.log("Value is " + result.key);
});



todo: save the react state as well with chrome storage
*/

function App() {
  console.log("please");
  
  const handleScoreUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handled");

    try {
      // get the inputted file
      const file = e.target.files?.[0];
      console.log(file);
      // json stringify the audio file in base64
      if (file) {
        const fileBase64 = await getBase64(file);
        const score = e.target.id;
        console.log(score);
        // save it as its number (as the key) with chrome.storage.local
        chrome.storage.local.set({ [score] : fileBase64 }).then(() => {
          console.log("set");
        });
        
      }
      else {
        console.log("nothing uploaded");
      }
    }
    catch (error) {
      console.error("failed to save sound", error);
    }
  }

  const resetSounds = async () => {
    await chrome.storage.local.remove(['5', 'low']);
    console.log("removed");
  }

  // convert a file to a base64 string, returns a promise
  async function getBase64(file:File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result as string);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
        reject(error);
      };
    });
  }

  return(
    <div>
      <Header />
      <div style={{ padding: '10px' }}>
        <h3>Custom Sounds</h3>
        <div>
          <label>Sound for scores 1-4: </label>
          <input type="file" id="low" accept=".mp3,.wav,.ogg" onChange={handleScoreUpload} />
        </div>
        <div>
          <label>Sound for score 5: </label>
          <input type="file" id="5" accept=".mp3,.wav,.ogg" onChange={handleScoreUpload} />
        </div>
        <button onClick={resetSounds}>Reset to Default</button>
      </div>
    </div>
  );
}

export default App
