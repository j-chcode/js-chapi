const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();

const directoryPath = path.join(__dirname, 'routes');
const files = fs.readdirSync(directoryPath);
const routes = {}; 

const apis = new Promise(async (res, rej) => {
  await files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    try {
      if(file.endsWith('.js')) {
        const module = require(filePath);
        const functionName = file.replace('.js', '');
        console.log(`❤️ | API: ${functionName}.js yüklendi`)
        routes[functionName] = module;
      }
    }
    catch(err) {
      const functionName = file.replace('.js', '');
      console.log(`❤️ | API: ${functionName}.js yüklenemedi ${err.message}`)
    }
  });
  res()
});

apis.then(async () => {
  app.use("/api", await routes.api)
  console.log("✅ | Router Servisi: bağlandı")
});

app.listen(3000, () => {
  console.log("✅ | API Servisi: başlatıldı");
});
