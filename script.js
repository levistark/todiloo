// Get all the .list-item elements
const listItems = document.querySelectorAll('.list-item')
const listForm = document.querySelector('.list-form')
const itemText = document.querySelector('.input-text')
let nextPrioIndex = 0
let tabIndex = 0
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
            <input type="checkbox" onclick="onCheck()"/>
            <span></span>
        </label>
        <input required tabindex="${tabIndex+1}" type="text" class="input-text">
        <label class="label">To-do...</label>
        <button type="button" class="btn-prio" onclick="addPrio(${nextPrioIndex+1})">Prio?</button>
    `
    listForm.appendChild(newItem)

    // Increment the index for the next "Prio?" button AND tabIndex
    nextPrioIndex++
    tabIndex++
    
    // Handle CSS classes regarding dark/bright-mode for added items

    // Add onCheck-listener to the checkbox in the new list item
    const inputTexts = document.querySelectorAll('.list-item input[type="text"]')
    const checkBoxes = document.querySelectorAll('.list-item input[type="checkbox"]')
    const prioButtons = document.querySelectorAll('.btn-prio')


    // IF DARK BG
    if (document.querySelector('body').classList.contains('body-dark')) {
        document.querySelectorAll('.list-item').forEach((element) => {
            if (!element.classList.contains('text-checked-dark')) {
                element.classList.add('text-bright')
            } 
        })
        document.querySelectorAll('.checkbox').forEach((element) => {
            if (!element.classList.contains('text-checked-dark')) {
                element.classList.add('text-bright')
            }         })
        document.querySelectorAll('.input-text').forEach((element) => {
            if (!element.classList.contains('text-checked-dark')) {
                element.classList.add('text-bright')
            }         })
        document.querySelectorAll('.text-checked').forEach((element) => {
            if (!element.classList.contains('text-checked-dark')) {
                element.classList.add('text-bright')
            }         })
        document.querySelectorAll('.btn-prio').forEach((element ) => {
            if (!element.classList.contains('btn-prio-done-dark')) {
                element.classList.add('text-bright')
            }         })

    // IF WHITE BG
    } else {
        document.querySelectorAll('.list-item').forEach((element) => {
            element.classList.remove('text-bright')
        })
        document.querySelectorAll('.checkbox').forEach((element) => {
            element.classList.remove('text-bright')
        })
        document.querySelectorAll('.input-text').forEach((element) => {
            element.classList.remove('text-bright')
        })
        document.querySelectorAll('.text-checked').forEach((element) => {
            element.classList.remove('text-bright')
        })
        document.querySelectorAll('.btn-prio').forEach((element ) => {
            element.classList.remove('text-bright')
        })
    }


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


    checkBoxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                inputTexts[index].classList.add('text-checked')
            } else {
                inputTexts[index].classList.remove('text-checked')
            }
        })
    })

    // Focus the newly created row
    newItem.querySelector('.input-text').focus() 
    focusedRow = newItem
}

// Function to clear rows
function clearList() {

    if (document.querySelector('body').classList.contains('body-dark')) {
        listForm.innerHTML = `
        <div class="list-item">
            <label class="checkbox">
                <input onclick="onCheck()" type="checkbox" />
                <span></span>
            </label>
            <input required tabindex="1" type="text" class="input-text text-bright">
            <span class="text-checked"></span>
            <label class="label">To-do...</label>
            <button type="button" class="btn-prio text-bright" onclick="addPrio(0)">Prio?</button>
        </div>
        `
    } else {
        listForm.innerHTML = `
        <div class="list-item">
            <label class="checkbox">
                <input onclick="onCheck()" type="checkbox" />
                <span></span>
            </label>
            <input required tabindex="1" type="text" class="input-text">
            <span class="text-checked"></span>
            <label class="label">To-do...</label>
            <button type="button" class="btn-prio" onclick="addPrio(0)">Prio?</button>
        </div>
        `
    }

    addEventListener()
}

// Function to delete rows
function deleteRow() {
    
    if (listForm.childNodes.length <= 3) {
        listForm.querySelector('.input-text').focus()
    } else {
        focusedRow.remove()
        focusedRow = listForm.lastChild
        // Decrement the index for the previous "Prio?" button
        nextPrioIndex--
        tabIndex--

        if (listForm.childNodes.length >= 4) {
            listForm.lastChild.querySelector('.input-text').focus()

        } else {
            listForm.querySelector('.input-text').focus()
        }
    }
}

// Function to handle the checkbox event
function onCheck() {
    const inputTexts = document.querySelectorAll('.list-item input[type="text"]')
    const checkBoxes = document.querySelectorAll('.list-item input[type="checkbox"]')
    const prioButtons = document.querySelectorAll('.btn-prio')

    // Om bakgrunden är SVART
    if (document.querySelector('body').classList.contains('body-dark')) {
        checkBoxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                // KRYSSAD
                if (checkbox.checked) {
                    inputTexts[index].classList.add('text-checked-dark')
                    inputTexts[index].classList.remove('text-bright')
                    prioButtons[index].classList.add('btn-prio-done-dark')
                    prioButtons[index].classList.remove('text-bright')

                // INTE KRYSSAD
                } else {
                    inputTexts[index].classList.remove('text-checked-dark')
                    inputTexts[index].classList.add('text-bright')
                    prioButtons[index].classList.remove('btn-prio-done-dark')
                    prioButtons[index].classList.add('text-bright')
                }
            })
        })
    // Om bakgrunden är VIT
    } else {
        checkBoxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    inputTexts[index].classList.add('text-checked')
                    inputTexts[index].classList.remove('text-checked-dark')
                    prioButtons[index].classList.add('btn-prio-done')
                    prioButtons[index].classList.remove('btn-prio-done-dark')
                } else {
                    inputTexts[index].classList.remove('text-checked', 'text-bright')
                    prioButtons[index].classList.remove('btn-prio-done', 'text-bright')
                }
            })
        })
    }
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

// Function to handle dark- / light mode toggle
function toggleDarkMode() {
    const inputTexts = document.querySelectorAll('.list-item input[type="text"]')
    const prioButtons = document.querySelectorAll('.btn-prio')

    if (document.querySelector('body').classList.contains('body-dark')) {
        document.querySelector('body').classList.remove('body-dark')
        document.querySelector('.header-logo').classList.remove('text-bright')
        document.querySelector('h5').classList.remove('text-bright')
        document.querySelector('.addRow').classList.remove('no-shadow')
        document.querySelector('.clearList').classList.remove('no-shadow')

        inputTexts.forEach((inputText, index) => {
            inputTexts[index].classList.remove('text-bright')
            prioButtons[index].classList.remove('text-bright')
        })

    } else {
        document.querySelector('body').classList.add('body-dark')
        document.querySelector('.header-logo').classList.add('text-bright')
        document.querySelector('h5').classList.add('text-bright')
        document.querySelector('.addRow').classList.add('no-shadow')
        document.querySelector('.clearList').classList.add('no-shadow')

        inputTexts.forEach((inputText, index) => {
            inputTexts[index].classList.add('text-bright')
            prioButtons[index].classList.add('text-bright')
        })
    }

    inputTexts.forEach((inputText, index) => {
        // OM KRYSSAD OCH SVART
        if (inputText.classList.contains('text-checked-dark')) {
            console.log('OM KRYSSAD OCH SVART')

            inputTexts[index].classList.remove('text-checked-dark')
            inputTexts[index].classList.add('text-checked')
            inputTexts[index].classList.remove('text-bright')

            prioButtons[index].classList.remove('btn-prio-done-dark')
            prioButtons[index].classList.add('btn-prio-done')
            prioButtons[index].classList.remove('text-bright')

        // OM KRYSSAD OCH VIT
        } else if (inputText.classList.contains('text-checked')) {
            console.log('OM KRYSSAD OCH VIT')

            inputTexts[index].classList.remove('text-checked')
            inputTexts[index].classList.add('text-checked-dark')
            inputTexts[index].classList.remove('text-bright')
            
            prioButtons[index].classList.remove('btn-prio-done')
            prioButtons[index].classList.add('btn-prio-done-dark')
            prioButtons[index].classList.remove('text-bright')

        } 
    })
}