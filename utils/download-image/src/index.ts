import * as fs from "fs";
import fetch from "cross-fetch";
import items from "./items.json";

async function download() {
  const url =
    "https://jb-ph-cdn.tillster.com/menu-images/prod/e39c15e2-e026-4676-be4d-f645c9c1887d.png";
  const outImagePath = "./JollibeeChickenjoy.png";
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFile(outImagePath, Buffer.from(buffer), () =>
    console.log("finished downloading!")
  );
}

//download().then(console.log).catch(console.error);

function parseJson() {
  for (let i = 0; i < items.length; i++) {
    console.log(items[i].name);
  }
}

parseJson();

console.log("NodeJS app running...");
