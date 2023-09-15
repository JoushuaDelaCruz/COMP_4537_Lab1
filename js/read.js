class Note {
  constructor(content = "") {
    this.content = content;
  }

  displayNote() {
    const parentContainer = document.getElementById("notes-container");
    const noteContainer = this.#createNoteContainer();
    const paragraph = this.#createParagraph();
    noteContainer.appendChild(paragraph);
    parentContainer.appendChild(noteContainer);
  }

  #createNoteContainer() {
    const noteContainer = document.createElement("div");
    noteContainer.className = "note-container";
    return noteContainer;
  }

  #createParagraph() {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = this.content;
    return paragraph;
  }

  static emptyMainContainer = () => {
    const mainContainer = document.getElementById("notes-container");
    mainContainer.innerHTML = "";
  };
}

const getStoredNotes = () => {
  const notes = localStorage.getItem("notes");
  if (notes) {
    return JSON.parse(notes);
  }
  return [];
};

const loadStoredNotes = () => {
  const notes = getStoredNotes();
  if (notes.length === 0) {
    return;
  }
  displayNotes(notes);
};

const displayNotes = (notes) => {
  notes.forEach((note) => {
    const newNote = new Note(note.content);
    newNote.displayNote();
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
  Note.emptyMainContainer();
  loadStoredNotes();
  updateTime();
};

window.onload = () => {
  updateTime();
  loadStoredNotes();
};

setInterval(update, 2000);
