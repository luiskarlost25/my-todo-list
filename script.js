document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Cargar tareas al iniciar
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Por favor, introduce una tarea.');
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="task-buttons">
                <button class="complete-btn">Completar</button>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;

        taskList.appendChild(li);
        taskInput.value = ''; // Limpiar el input

        // Añadir listeners para los nuevos botones
        const completeBtn = li.querySelector('.complete-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        completeBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        saveTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', taskList.innerHTML);
    }

    function loadTasks() {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            taskList.innerHTML = tasks;
            // Re-adjuntar listeners después de cargar
            taskList.querySelectorAll('li').forEach(li => {
                const completeBtn = li.querySelector('.complete-btn');
                const deleteBtn = li.querySelector('.delete-btn');

                completeBtn.addEventListener('click', () => {
                    li.classList.toggle('completed');
                    saveTasks();
                });

                deleteBtn.addEventListener('click', () => {
                    li.remove();
                    saveTasks();
                });
            });
        }
    }
});