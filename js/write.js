class Note {
  constructor(content = "") {
    this.content = content;
  }
  displayNote() {
    const parentContainer = document.getElementById("notes-container");
    const noteContainer = this.#createNoteContainer();
    const inputContainer = this.#createInputContainer();
    const deleteButton = this.#createButton();
    noteContainer.appendChild(inputContainer);
    noteContainer.appendChild(deleteButton);
    parentContainer.appendChild(noteContainer);
  }

  #createNoteContainer() {
    const noteContainer = document.createElement("div");
    noteContainer.className = "note-container";
    return noteContainer;
  }

  #createInputContainer() {
    const inputContainer = document.createElement("div");
    inputContainer.className = "input-container";
    const textarea = this.#createTextArea();
    inputContainer.appendChild(textarea);
    return inputContainer;
  }

  #createTextArea() {
    const textarea = document.createElement("textarea");
    textarea.className = "note";
    textarea.name = "var_1";
    textarea.rows = "5";
    textarea.cols = "10";
    textarea.wrap = "soft";
    textarea.innerHTML = this.content;
    return textarea;
  }

  #createButton() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "delete-note";
    button.innerHTML = "Delete";
    button.addEventListener("click", this.#delete);
    return button;
  }

  #delete(e) {
    Note.#deleteNote(e);
    Note.deleteFromStorage();
  }

  static #deleteNote(e) {
    e.target.parentNode.remove();
  }

  static deleteFromStorage() {
    const notes = document.querySelectorAll("textarea");
    if (notes.length === 0) {
      localStorage.removeItem("notes");
      return;
    }
    const notesArray = [];
    notes.forEach((noteElement) => {
      const note = new Note(noteElement.value);
      notesArray.push(note);
    });
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }
}

const createNewNote = () => {
  new Note().displayNote();
};

const getStoredNotes = () => {
  const notes = localStorage.getItem("notes");
  if (notes) {
    const notesArray = [];
    JSON.parse(notes).forEach((note) => {
      notesArray.push(new Note(note.content));
    });
    return notesArray;
  }
  return [];
};

const loadStoredNotes = () => {
  const notes = getStoredNotes();
  notes.forEach((note) => {
    note.displayNote();
  });
};

const updateTime = () => {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("time").innerHTML = timeString;
};

const update = () => {
  Note.deleteFromStorage();
  updateTime();
};

setInterval(update, 2000);

window.onload = () => {
  updateTime();
  loadStoredNotes();
};
