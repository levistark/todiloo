// Get all the .list-item elements
const listItems = document.querySelectorAll('.list-item')
const listForm = document.querySelector('.list-form')
const itemText = document.querySelector('.input-text')
let nextPrioIndex = 0;
let isPrio = null
let focusedRow = null

listForm.querySelectorAll('.list-item').forEach((listItem) => {
    const itemText = listItem.querySelector('.input-text')
    const label = listItem.querySelector('.label')

    // FOCUS state listener which controls the CSS classes
    itemText.addEventListener('input', () => {
        if (itemText.value.trim() !== '') {
            label.classList.add('focused')

        } else {
            label.classList.remove('focused')
        }
    });

    // Prevent form submission on Enter key press for EXISTING items
    itemText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addRow()

        }
    });

    // Set the INITIAL focused row when clicking on the input field
    itemText.addEventListener('focus', () => {
        focusedRow = listItem
    });
});

// Initial EVENT listeners for existing items
function addEventListener() {
    nextPrioIndex = 0;
    isPrio = null
    focusedRow = null

    listForm.querySelectorAll('.list-item').forEach((listItem) => {
        const itemText = listItem.querySelector('.input-text')
        const label = listItem.querySelector('.label')
    
        // FOCUS state listener which controls the CSS classes
        itemText.addEventListener('input', () => {
            if (itemText.value.trim() !== '') {
                label.classList.add('focused')
    
            } else {
                label.classList.remove('focused')
            }
        });
    
        // Prevent form submission on Enter key press for EXISTING items
        itemText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                addRow()
    
            }
        });
    
        // Set the INITIAL focused row when clicking on the input field
        itemText.addEventListener('focus', () => {
            focusedRow = listItem
        });
    });
}

// Function to add rows
function addRow() {
    let newItem = document.createElement('div')
    newItem.className = 'list-item new-item'
    newItem.innerHTML = `
        <label class="checkbox">
            <input type="checkbox" />
            <span></span>
        </label>
        <input required type="text" class="input-text">
        <label class="label">To-do</label>
        <button type="button" class="btn-prio" onclick="addPrio(${nextPrioIndex+1})">Prio?</button>
    `
    listForm.appendChild(newItem)

    const prioButtons = document.querySelectorAll('.btn-prio');


    // Increment the index for the next "Prio?" button
    nextPrioIndex++

    // Attach the FOCUSED event listener to the newly created item to control CSS
    const newItemText = newItem.querySelector('.input-text');
    const newLabel = newItem.querySelector('.label');

    newItemText.addEventListener('input', () => {
        if (newItemText.value.trim() !== '') {
            newLabel.classList.add('focused');
        } 
        else {
            newLabel.classList.remove('focused');
        }
    });

    // Add key-press listener to the newly created list item
    newItem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addRow() 

        } else if(e.key === 'Backspace' && (newItemText.value.trim() == '') && focusedRow) {
            deleteRow()
        }
    });


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

    // Focus the newly created row
    newItem.querySelector('.input-text').focus() 
    focusedRow = newItem
}

// Function to clear rows
function clearList() {

    listForm.innerHTML = `
    <div class="list-item">
        <label class="checkbox">
            <input onclick="onCheck()" type="checkbox" />
            <span></span>
        </label>
        <input required type="text" class="input-text">
        <span class="text-checked"></span>
        <label class="label">To-do</label>
        <button type="button" class="btn-prio" onclick="addPrio(0)">Prio?</button>
    </div>
    `
    addEventListener()
}

function deleteRow() {

    
    if (listForm.childNodes.length <= 3) {
        // listForm.querySelector('.input-text').focus()
        listForm.firstChild.focus()
    } else {
        focusedRow.remove()
        focusedRow = listForm.lastChild
        // Decrement the index for the previous "Prio?" button
        nextPrioIndex--

        if (listForm.childNodes.length >= 4) {
            listForm.lastChild.querySelector('.input-text').focus()

        } else {
            listForm.querySelector('.input-text').focus()
        }
    }

}

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

// Modify the "addPrio" function to accept an index parameter
function addPrio(index) {
    const prioButtons = document.querySelectorAll('.btn-prio');
    const checkboxes = document.querySelectorAll('.checkbox');

    if (index >= 0 && index < prioButtons.length) {
        const clickedButton = prioButtons[index];
        const checkbox = checkboxes[index];

        if (clickedButton.classList.contains('btn-prio-checked')) {
            // Element is already marked as priority
            checkbox.classList.remove('checkbox-prio');
            clickedButton.classList.remove('btn-prio-checked');
            clickedButton.textContent = 'Prio?';
        } else {
            // Element is not marked as priority
            checkbox.classList.add('checkbox-prio');
            clickedButton.classList.add('btn-prio-checked');
            clickedButton.textContent = 'Prio!';
        }
    }
}

