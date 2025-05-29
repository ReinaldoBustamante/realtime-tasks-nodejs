let tasks = []
const form = document.querySelector('form');
const ul = document.querySelector('.tasks');
const title = document.querySelector('#title');
const description = document.querySelector('#description')

const renderTasks = (tasks) => {
    ul.innerHTML = ""
    for(let task of tasks){
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <div class="actions">
                    <button class="btn-complete" onclick="updateTask(${task.id})">Completar</button>
                    <button class="btn-delete" onclick="deleteTask(${task.id})">Eliminar</button>
                    <p>${task.status}</p>
                </div>
            </div>
        `
        ul.prepend(li)
    }
}

const getTask = async () => {
    const response = await fetch('http://localhost:3000/api/tasks/');
    const data = await response.json();
    tasks.push(...data);
    renderTasks(tasks)
}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE'
    })
}

const updateTask = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: 'completada'
        })
    })
}


getTask();

const createTask = async (payload) => {
    await fetch(`http://localhost:3000/api/tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();  
    createTask({
        title: title.value,
        description: description.value
    })
    title.value = ""
    description.value = ""
})


const socket = new WebSocket('ws://localhost:3000');

socket.onopen = ( event ) => {
    console.log('connected')
}

socket.onmessage = ( event ) => {
    const { type, payload } = JSON.parse(event.data)
            
    if(type === 'newTask'){
        tasks.push(payload)
        renderTasks(tasks)
    }
    if(type === 'taskDeleted'){
        tasks = tasks.filter(task => task.id !== payload.id)
        renderTasks(tasks)
    }
    if(type === 'taskUpdated'){
        tasks = [...tasks.filter(task => task.id !== payload.id), payload]
        tasks.sort((a,b) => a.id - b.id)
        renderTasks(tasks)
    }
}