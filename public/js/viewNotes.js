window.onload = (event) => {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("Logged in as " + user.displayName);
        var googleUserId = user.uid;
        getNotes(googleUserId);
    } else {
        window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
    });
};
const getNotes = (userId) => {
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        renderDataAsHTML(data);
    } )
}


const renderDataAsHTML = (data) => {
    let cards = ``;
    for (const noteKey in data) {
        const note = data[noteKey]
        console.log(note.title, note.text)
        cards += createCard(note)
    }
    document.querySelector("#app").innerHTML = cards
}

const createCard = (note) => {
    return `
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text} </div>
                </div>
            </div>
        </div>         
    `;
}