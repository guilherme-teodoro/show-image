const { ipcRenderer } = require('electron');
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// const inputFile = document.querySelector("#input-file");
// const imagePreview = document.querySelector("#image-preview");

// inputFile.addEventListener('change', (event) => {
//   const tempUrl = URL.createObjectURL(event.target.files[0]);
//   imagePreview.src = tempUrl;

//   ipcRenderer.send('synchronous-message', tempUrl);

// });

// ipcRenderer.on('goback', (event, arg) => {
//   console.log(arg);
// });

const Mosaic = window.Mosaic;

const MediaItem = new Mosaic({
  actions: {
    showMedia: function() {
      console.log(this.data.url);
      ipcRenderer.send('synchronous-message', this.data.url);
    }
  },
  view: function() {
    return html`<div class='todo-item'>
               <img style="max-width: 200px" ondblclick="${this.actions.showMedia}" src="${this.data.url}"/>
        </div>`;
  }
});

const app = new Mosaic({
  element: '#root',
  data: {
    medias: [],
    todos: ['Click the "Add Todo" button to add another todo item!',
            'Click on a todo item to delete it.']
  },
  actions: {
    addMedia: function(e) {
      const url = URL.createObjectURL(event.target.files[0]);
      this.data.medias.push(url);
    },
    deleteTodo: function(todoIndex) {
      this.data.todos.splice(todoIndex, 1);
    }
  },
  view: function() {
    return html`<div class='app'>
            <input type="file" onchange="${this.actions.addMedia}" accept="image/*"/>
            <br>
            ${
                this.data.medias.map((url, index) => {
                    return MediaItem.new({ url });
                })
            }
        </div>`;
  }
});

app.paint();
