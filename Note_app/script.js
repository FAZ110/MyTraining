const userInput = document.getElementById('input');
const addNote = document.getElementById('addNote');
const deleteNote = document.getElementById('deleteNote');
const noteContainer = document.querySelector('.note-container');

addNote.addEventListener('click', () => {
    if (userInput.value != ''){
        const note = document.createElement('div');
        note.classList.add('note');

        const li = document.createElement('li');
        li.textContent = userInput.value;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.id = 'deleteNote';

        note.appendChild(li);
        note.appendChild(deleteBtn);
        
        noteContainer.appendChild(note);
        userInput.value = '';
    }
    else{
        alert('Task cannot be empty')
    }
})

