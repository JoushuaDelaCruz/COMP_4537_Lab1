const createNewNote = () => {
  const parentContainer = document.getElementById("notes-container");
  const newNote = `
  <div class="note-container">
      <div class="input-container">
        <textarea class="note" name="var_1" rows="5" cols="10" wrap="soft"></textarea>
      </div>
    <button 
        type="button" 
        class="delete-note" 
        onclick="return this.parentNode.remove()"> 
        Delete 
    </button>
  </div>`;
  parentContainer.insertAdjacentHTML("beforeend", newNote);
};
