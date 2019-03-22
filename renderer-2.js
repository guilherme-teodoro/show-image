const { ipcRenderer } = require('electron');

const imagePreview = document.querySelector("#image-preview");

ipcRenderer.on('goback', (event, url) => {
  imagePreview.src = url;
});
