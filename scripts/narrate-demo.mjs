// Reproducible synthetic narration; ESPEAK_MODULE points to espeak-ng/dist/espeak-ng.js.
// DEMO_OUTPUT contains screen.webm from record-demo.mjs. Requires ffmpeg/ffprobe.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
const modulePath=process.env.ESPEAK_MODULE;
if(!modulePath) throw new Error('Set ESPEAK_MODULE to the installed espeak-ng JavaScript module.');
const {default:ESpeak}=await import(pathToFileURL(modulePath));
const out=process.env.DEMO_OUTPUT || '/tmp/bidpilot-demo';
const destination=process.env.DEMO_VIDEO || path.join(out,'BidPilot-Voice-Demo.mp4');
const text=fs.readFileSync(new URL('../docs/DEMO.md',import.meta.url),'utf8');
const segments=[...text.matchAll(/“([^”]+)”/g)].map(m=>m[1]);
if(segments.length!==5) throw new Error('Expected five narration segments.');
for(let i=0;i<segments.length;i++) {
 const engine=await ESpeak({wasmBinary:fs.readFileSync(path.join(path.dirname(modulePath),'espeak-ng.wasm')),arguments:['-w','out.wav','-v','en-us','-s','155',segments[i]]});
 const raw=path.join(out,`voice-${i}.wav`);fs.writeFileSync(raw,engine.FS.readFile('out.wav'));
 const duration=Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',raw],{encoding:'utf8'}));
 execFileSync('ffmpeg',['-y','-v','error','-i',raw,'-af',`atempo=${Math.max(1,duration/23.5)},apad,atrim=duration=25`,path.join(out,`segment-${i}.wav`)]);
}
fs.writeFileSync(path.join(out,'narration.txt'),segments.map((_,i)=>`file 'segment-${i}.wav'`).join('\n'));
execFileSync('ffmpeg',['-y','-v','error','-f','concat','-safe','0','-i',path.join(out,'narration.txt'),'-c','copy',path.join(out,'narration.wav')]);
execFileSync('ffmpeg',['-y','-v','error','-i',path.join(out,'screen.webm'),'-i',path.join(out,'narration.wav'),'-c:v','libx264','-preset','fast','-crf','22','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-shortest','-movflags','+faststart',destination]);
console.log(destination);
