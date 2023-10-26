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

function createUniqueFileName(name: string) {
  name = name.replace(/\s+/g, "");
  return name;
}

function hasDuplicates(arr: string[]): boolean {
  return new Set(arr).size < arr.length;
}

function findDuplicates(arr: string[]): string[] {
  const result: string[] = [];
  for (const item of arr) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}

function parseJson() {
  let arr: string[] = [];
  for (let i = 0; i < items.length; i++) {
    //console.log(items[i].name);
    arr.push(createUniqueFileName(items[i].name));
  }

  arr.sort();

  if (hasDuplicates(arr)) {
    console.error("There are duplicate names");
  }
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

parseJson();

console.log("NodeJS app running...");
