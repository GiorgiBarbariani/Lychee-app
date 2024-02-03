const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegStatic);

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
  const textOverlay = req.body.text;

  if (!textOverlay) {
    return res.status(400).send('No text provided for video overlay.');
  }

  const filename = textOverlay?.replace(/[^a-z0-9]/gi, '_').toLowerCase();

  const videoInput = './initial.mp4';
  const outputPath = `./output-outro/${filename}.mp4`;

  ffmpeg(videoInput)
    .videoCodec('libx264')
    .outputOptions('-pix_fmt', 'yuv420p')
    .complexFilter([
      {
        filter: 'drawtext',
        options: {
          text: textOverlay,
          fontsize: 32,
          fontcolor: 'FF00F2',
          x: '(w-text_w)/2',
          y: '(h-text_h)/2',
          fontfile: './font/OpenSans-VariableFont_wdth,wght.ttf',
          enable: 'between(t,0,4)'
        }
      }
    ])
    .saveToFile(outputPath)
    .on('progress', function(progress) {
      console.log(`Your video is ${Math.floor(progress.percent)}% done`);
    })
    .on('end', function() {
      console.log('FFmpeg has finished.');
      res.send(`Video processing complete. File saved as ${filename}.mp4`);
    })
    .on('error', function(error) {
      console.error('Error processing video', error);
      res.status(500).send('Error processing video');
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
