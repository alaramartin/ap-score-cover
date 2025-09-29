# AP Exam Score Reveal Chrome Extension

[![Athena Award Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faward.athena.hackclub.com%2Fapi%2Fbadge)](https://award.athena.hackclub.com?utm_source=readme)

Make AP score release day fun! This extension hides AP exam scores until you click on each one and lets you customize animations and sounds that play once revealed.

## Features

-   Scores hidden by default, click to view!
-   Play an animation and sound depending on the score
-   Fully customizable
    -   Defaults available

## Example

![Example Popup](https://raw.githubusercontent.com/alaramartin/ap-score-cover/refs/heads/main/examples/example_audio.png)  
![Example Upload](https://raw.githubusercontent.com/alaramartin/ap-score-cover/refs/heads/main/examples/example_uploaded.png)  
![Example Video](https://github.com/alaramartin/ap-score-cover/blob/main/examples/example.mp4) (you may have to download the .mp4 to view)

## Installation

This extension is currently under review for the Chrome Web Store. Until it is published, here's how you can use it:

Clone this repo to your local computer using `git clone https://github.com/alaramartin/ap-score-cover.git` and navigate to the project folder.

Make sure you have Node.js installed and run `npm install` to install dependencies. Then, run `npm run build` to build the extension and you'll see a folder titled `dist` in the root directory of the project folder.

Open Chrome and go to [chrome://extensions/](chrome://extensions/), enable Developer Mode, and click "Load Unpacked." Select the `dist` folder of the project. You'll see the extension show up in the Chrome toolbar.

From there, customize animations and sounds through the extension popup and test with your AP scores on the [College Board AP Website](https://apstudents.collegeboard.org/view-scores)!

## Contributing

Feel free to open issues and pull requests. I'll be regularly checking activity on the [repository](https://github.com/alaramartin/ap-score-cover)!

## License

This extension is released under the MIT License. See the LICENSE file for more details.

AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this product.

## For Athena Award: Reflection

As a high school student, AP Exam score release day is incredibly stressful. When my AP Exam scores released in July, in order to procrastinate checking my scores, I decided to make something that would make it more fun to view them (that ended up not quite working, since I had to look at the HTML of the "View Scores" page in order to make this extension and accidentally spoiled the surprise). The main challenge I faced was learning React. I'd never used React before and wanted to use this project as a way to learn it. I had to take a break from working on the project to watch a few tutorials and actually learn how to use React so that I could build this.
