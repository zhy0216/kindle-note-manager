const { promisify } = require("util");
const fs = require("fs");
const readFileAsync = promisify(fs.readFile); // (A)
const moment = require("moment/moment");


const nonEmpty = s => s.length > 0;

export async function parse(filename) {
  const buffer = await readFileAsync(filename);

  return buffer.toString().split("==========")
    .filter(l => l.length > 5)
    .map(t => {
      try {
        return parseClipText(t)
      }catch (e) {
        console.log(e);
      }
    })
    .filter(x => x.content.length > 0)
}

function uuid() {
   const chars = "0123456789abcdef".split("");
   const uuid = [], rnd = Math.random;
   let r;

   uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
   uuid[14] = "4"; // version 4

   for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
         r = 0 | rnd()*16;
         uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r & 0xf];
      }
   }

   return uuid.join("");
}

export function parseClipText(clip_text) {
  const lines = clip_text.split(/\r?\n/).filter(nonEmpty);
  const title = lines[0];
  const datetimeStr = lines[1].split("|")[1];
  const [y, m, d, h, min, s] = datetimeStr.match(/\d+/ug);
  const h2 = datetimeStr.indexOf("上午") > -1? h: (parseInt(h) + 12).toString();
  const content = lines.slice(2).filter(nonEmpty).join("");

  return {
    title,
    time: moment(`${y}-${m}-${d} ${h2}:${min}:${s}`).format('x'),
    content,
    id: uuid(),
  }
}

