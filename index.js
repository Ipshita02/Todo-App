let todos = [];

function addTodo() {
    const todoValue = document.querySelector("input").value.trim();
    if (todoValue === '') {
        alert('Please enter a todo.');
        return;
    }
    
    todos.push({
        title: todoValue,
        completed: false
    });
    document.querySelector('input').value = '';
    render();
}

function deleteTodo(index){
    todos.splice(index, 1) // remove the last element from the arr
    render()
}

function editTodo(index) {
    // Replace the title with an input field
    const todoDiv = document.querySelector(`#todo-${index}`);
    const currentTitle = todos[index].title;

    // Clear the content of the div
    todoDiv.innerHTML = '';

    // Create input field and set its value to current title
    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('class', 'edit-field')
    input.value = currentTitle;

    // Create save button
    const saveButton = document.createElement('button');
    saveButton.setAttribute('class', 'save-button')
    saveButton.innerHTML = 'Save';
    saveButton.onclick = function() {
      todos[index].title = input.value;
      render();
    };

    // Append input and save button to the div
    todoDiv.appendChild(input);
    todoDiv.appendChild(saveButton);
}

function toggleTodoCompletion(index) {
    // Toggle the completed property
    todos[index].completed = !todos[index].completed;
    render();
}


function createTodoComponent(todo, index) {
    const div = document.createElement("div");
    div.setAttribute('id', `todo-${index}`); // Give each todo an ID for editing
    div.setAttribute('class', 'todo-item'); // Add the flex container class

    const p = document.createElement("p");
    p.innerHTML = todo.title;
    // Style the text based on completion status
    if (todo.completed) {
        p.style.textDecoration = 'line-through'; // Add line-through style
    }

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.setAttribute('class', 'check-box')
    checkbox.checked = todo.completed; // Set checkbox state
    checkbox.onchange = function() {
        toggleTodoCompletion(index);
    };

    const buttonDelete = document.createElement("button");
    buttonDelete.setAttribute('class', 'delete-button');
    buttonDelete.innerHTML = "Delete";
    buttonDelete.onclick = function(){
        deleteTodo(index)
    }

    const buttonEdit = document.createElement("button");
    buttonEdit.setAttribute('class', 'edit-button');
    buttonEdit.innerHTML = 'Edit';
    buttonEdit.onclick = function(){
        editTodo(index)
    }
    
    div.append(checkbox)
    div.append(p)
    div.append(buttonDelete)
    div.append(buttonEdit)
    return div
}

// react 
function render() {
    document.querySelector("#todos").innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        const element = createTodoComponent(todos[i], i);
        document.querySelector("#todos").appendChild(element)
    }

    // Check if all todos are completed to trigger confetti
    if (todos.length > 0 && todos.every(todo => todo.completed)) {
        triggerConfetti();
    }
}

// Trigger confetti when all todos are completed
function triggerConfetti() {
    // Launch confetti
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

