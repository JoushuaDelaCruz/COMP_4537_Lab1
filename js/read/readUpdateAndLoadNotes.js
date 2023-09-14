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
  const parentContainer = document.getElementById("notes-container");
  notes.forEach((note) => {
    const newNote = `
    <div class="note-container">
        <p>${note.content}</p>
    </div>`;
    parentContainer.insertAdjacentHTML("beforeend", newNote);
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

const emptyMainContainer = () => {
  const mainContainer = document.getElementById("notes-container");
  mainContainer.innerHTML = "";
};

const update = () => {
  emptyMainContainer();
  loadStoredNotes();
  updateTime();
};

window.onload = () => {
  updateTime();
  loadStoredNotes();
};

setInterval(update, 2000);
