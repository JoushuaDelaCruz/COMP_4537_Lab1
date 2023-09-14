class Note {
  constructor(content) {
    this.content = content;
  }
}

const updateTime = () => {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("time").innerHTML = timeString;
};

const updateNotes = () => {
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
};

const update = () => {
  updateNotes();
  updateTime();
};

setInterval(update, 2000);
