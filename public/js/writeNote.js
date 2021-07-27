let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      handleTagAdding()

    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const tags = []
const handleTagAdding = () => {
    const noteTags = document.querySelector('#noteTags')
    const tagsDisplay = document.querySelector('#tagsDisplay')
    noteTags.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && noteTags.value != "") {
        // Cancel the default action, if needed
        event.preventDefault();
        console.log("enter key pressed within input")
        // Make tags look nice
        tagsDisplay.innerHTML += `      <span class="tag is-medium">${noteTags.value}</span>`
        tags.push(noteTags.value)
        noteTags.value = ""
  }
})
}



const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');




  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    tags: tags
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
    document.querySelector('#tagsTagsDisplay').innerHTML = "";
    tags = [];
  });
}