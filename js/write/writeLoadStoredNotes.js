const getStoredNotes = () => {
  const notes = localStorage.getItem("notes");
  if (notes) {
    return JSON.parse(notes);
  }
  return [];
};

const loadTime = () => {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("time").innerHTML = timeString;
};

const loadStoredNotes = () => {
  const notes = getStoredNotes();
  const parentContainer = document.getElementById("notes-container");
  notes.forEach((note) => {
    const newNote = `
        <div class="note-container">
            <div class="input-container">
              <textarea class="note" name="var_1" rows="5" cols="10" wrap="soft">${note.content}</textarea>
            </div>
        <button 
            type="button" 
            class="delete-note" 
            onclick="return this.parentNode.remove()"> 
            Delete 
        </button>
        </div>`;
    parentContainer.insertAdjacentHTML("beforeend", newNote);
  });
};

window.onload = () => {
  loadTime();
  loadStoredNotes();
};
