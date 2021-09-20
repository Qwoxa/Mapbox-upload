# Upload Mapbox tileset

Helps to upload tileset file from you PC.

## Installation

```bash
npm install
```

## Upload config

This file will contain your Mapbox token and path to the file, which needs to be uploaded.

### Example:

```js
module.exports = {
  ACCESS_TOKEN:
    "qq.eyJ1IjoicXdveGEiLCJhIjoiY2t0a3pqY2VkMDRicjJ4bzN6dz3242QyciJ9.QJyTe1J2MUyDx914q222bA",
  FILE_FOLDER: ".", // relative to your current directory
  FILE_NAME: "properties",
  FILE_EXT: "mbtiles",
  USERNAME: "johndoe", // your Mapbox username
};
```

## Run script

```bash
node index.js
```
