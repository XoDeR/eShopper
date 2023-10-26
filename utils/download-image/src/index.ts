import * as fs from "fs";
import fetch from "cross-fetch";
import items from "./items.json";

import * as admin from "firebase-admin";
import * as util from "util";
import * as stream from "stream";

const url =
  "https://jb-ph-cdn.tillster.com/menu-images/prod/e39c15e2-e026-4676-be4d-f645c9c1887d.png";
const outImagePath = "./JollibeeChickenjoy.png";

async function download(url: string, outImagePath: string) {
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

type Item = {
  name: string;
  desc: string;
  img: string;
  categories: string[];
  price: number;
  inStock: boolean;
  imgName: string;
};

const itemsNew: Item[] = [];

async function parseJson() {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const imgName = createUniqueFileName(item.name) + "." + item.ext;

    // download image
    const url = item.img;
    const outImagePath = "./images/" + imgName;
    await download(url, outImagePath);

    // upload image
    const filePath = outImagePath;
    const destination = imgName;
    let uploadedUrl: string = "";
    try {
      uploadedUrl = await uploadFile(filePath, destination);
      console.log("The download URL is", uploadedUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    const itemNew = {
      name: item.name,
      desc: item.desc,
      img: uploadedUrl,
      categories: item.categories,
      price: item.price,
      inStock: item.inStock,
      imgName,
    };
    itemsNew.push(itemNew);
  }

  writeJson();
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

// Initialize Firebase
const serviceAccount = require("../e-shopper-r-ts-firebase-adminsdk-ihndo-0d935c50a0.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://e-shopper-r-ts.appspot.com",
});

const bucket = admin.storage().bucket();

async function uploadFile(
  filePath: string,
  destination: string
): Promise<string> {
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

//parseJson();

const filePath = "./images/JollibeeChickenjoy.png";
const destination = "JollibeeChickenjoy.png";
//uploadFile(filePath, destination).catch(console.error);

console.log("NodeJS app running...");
