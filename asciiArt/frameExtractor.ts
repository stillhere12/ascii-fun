import ffmpeg from '@ts-ffmpeg/fluent-ffmpeg';
import fs from 'node:fs';
import path from 'node:path';

export async function extractFrames(
  inputFile: string,
  outputDir: string,
  framesperSecond: number
): Promise<string[]> {
  fs.mkdirSync(outputDir, { recursive: true });
  return new Promise((resolve, reject) => {
    const command = ffmpeg(inputFile);
    command
      .fps(framesperSecond)
      .on('end', () => {
        fs.readdir(outputDir, (err, files) => {
          if (err) {
            reject(err);
          } else {
            files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
            const frames = files.map((file) => path.join(outputDir, file));
            // ascending images
            // promise is resolving to array of strings
            resolve(frames);
          }
        });
      })
      .on('error', reject)
      .save(`${outputDir}/frame-%d.png`);
    console.log(`Frames extracted to ${outputDir}`);
    // save is at end because once ffmpeg is spawned then it goes to .on('end')
  });
}
