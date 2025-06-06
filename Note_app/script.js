const userInput = document.getElementById('input');
const addNote = document.getElementById('addNote');
const noteContainer = document.querySelector('.note-container');

function addDeleteListener(btn) {
    btn.addEventListener('click', () => {
        const note = btn.parentElement;
        noteContainer.removeChild(note);
    });
}

addNote.addEventListener('click', () => {
    if (userInput.value != ''){
        const note = document.createElement('div');
        note.classList.add('note');

        const li = document.createElement('li');
        li.textContent = userInput.value;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteNote');

        note.appendChild(li);
        note.appendChild(deleteBtn);
        
        noteContainer.appendChild(note);
        userInput.value = '';
        
        addDeleteListener(deleteBtn);
    }
    else{
        alert('Task cannot be empty')
    }
})

document.querySelectorAll('.deleteNote').forEach(btn => {
    addDeleteListener(btn);
})
