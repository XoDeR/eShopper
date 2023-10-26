import * as fs from "fs";
import fetch from "cross-fetch";
import items from "./items.json";

import * as admin from "firebase-admin";
import * as util from "util";
import * as stream from "stream";

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

function writeJson() {
  const itemsNewJson = JSON.stringify(itemsNew);

  fs.writeFile("./src/itemsNew.json", itemsNewJson, (err) => {
    if (err) {
      console.log("Error writing file:", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}

type Item = {
  name: string;
  desc: string;
  img: string;
  categories: string[];
  price: number;
  inStock: boolean;
};

const itemsNew: Item[] = [];

function parseJson() {
  let arr: string[] = [];
  for (let i = 0; i < items.length; i++) {
    //console.log(items[i].name);
    const item = items[i];
    const itemNew = {
      name: item.name,
      desc: item.desc,
      img: item.img,
      categories: item.categories,
      price: item.price,
      inStock: item.inStock,
    };
    itemsNew.push(itemNew);
    arr.push(createUniqueFileName(items[i].name));
  }

  arr.sort();

  if (hasDuplicates(arr)) {
    console.error("There are duplicate names");
  }
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }

  for (let i = 0; i < itemsNew.length; i++) {
    console.log(itemsNew[i].img);
  }
}

// Initialize Firebase
const serviceAccount = require("../e-shopper-r-ts-firebase-adminsdk-ihndo-0d935c50a0.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://e-shopper-r-ts.appspot.com",
});

const bucket = admin.storage().bucket();

const filePath = "./JollibeeChickenjoy.png";
const destination = "JollibeeChickenjoy.png";

async function uploadFile(filePath: string, destination: string) {
  // Converts fs.readFile into Promise version of same
  const readFile = util.promisify(fs.readFile);
  const fileBuffer = await readFile(filePath);

  const file = bucket.file(destination);

  const streamIntoStorage = new stream.PassThrough();
  streamIntoStorage.end(fileBuffer);

  return new Promise((resolve, reject) => {
    streamIntoStorage
      .pipe(file.createWriteStream())
      .on("error", reject)
      .on("finish", async () => {
        // The file upload is complete.
        console.log("File uploaded.");

        // Get the download URL
        const downloadURLs = await file.getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        });
        console.log("File Download URL: ", downloadURLs[0]);
        resolve(downloadURLs[0]);
      });
  });
}

uploadFile(filePath, destination).catch(console.error);

//parseJson();

//writeJson();

console.log("NodeJS app running...");
