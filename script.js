// Get all the .list-item elements
const listItems = document.querySelectorAll('.list-item')
const listForm = document.querySelector('.list-form')
const itemText = document.querySelector('.input-text')


let focusedRow = null


// Initial event listeners for existing items
listForm.querySelectorAll('.list-item').forEach((listItem) => {
    const itemText = listItem.querySelector('.input-text')
    const label = listItem.querySelector('.label')

    itemText.addEventListener('input', () => {
        if (itemText.value.trim() !== '') {
            label.classList.add('focused')
        } else {
            label.classList.remove('focused')
        }
    });

    // Prevent form submission on Enter key press for existing items
    itemText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    });

    // Set the focused row when clicking on the input field of an existing item
    itemText.addEventListener('focus', () => {
        focusedRow = listItem
    });
});

// Function to add rows
function addRow() {
    let newItem = document.createElement('div')
    newItem.className = 'list-item'
    newItem.innerHTML = `
        <label class="checkbox">
            <input type="checkbox" />
            <span></span>
        </label>
        <input required type="text" class="input-text">
        <label class="label">To-do</label>
    `
    listForm.appendChild(newItem)

    // Attach the event listener to the newly created item
    const itemText = newItem.querySelector('.input-text');
    const label = newItem.querySelector('.label');

    itemText.addEventListener('input', () => {
        if (itemText.value.trim() !== '') {
            label.classList.add('focused');
        } 
        else {
            label.classList.remove('focused');
        }
    });


    // Add key-press listener to the newly created list item
    newItem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addRow()
            focusedRow = newItem

        } else if(e.key === 'Backspace' && (itemText.value.trim() == '') && focusedRow) {
            deleteRow()
        }
    });

    // Focus the newly created row
    newItem.querySelector('.input-text').focus() 

    // Add onCheck-listener to the checkbox in the new list item
    const inputTexts = document.querySelectorAll('.list-item input[type="text"]')
    const checkBoxes = document.querySelectorAll('.list-item input[type="checkbox"]')

    checkBoxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                inputTexts[index].classList.add('text-checked');
            } else {
                inputTexts[index].classList.remove('text-checked');
            }
        })
    })
}

// Function to clear rows
function clearList() {
    while (listForm.firstChild) {
        listForm.innerHTML = ``
    }
    addRow()
}

function deleteRow() {
    
    if (listForm.childNodes.length <= 3) {
        listForm.querySelector('.input-text').focus()
    } else {
        focusedRow.remove()
        focusedRow = listForm.lastChild

        if (listForm.childNodes.length >= 4) {
            listForm.lastChild.querySelector('.input-text').focus()
        } else {
            listForm.querySelector('.input-text').focus()
        }
    }
}

// Handle key presses
itemText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        addRow()
    } 
});

function onCheck() {
    const inputTexts = document.querySelectorAll('.list-item input[type="text"]')
    const checkBoxes = document.querySelectorAll('.list-item input[type="checkbox"]')

    checkBoxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                inputTexts[index].classList.add('text-checked');
            } else {
                inputTexts[index].classList.remove('text-checked');
            }
        })
    })

}