document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks) {
        savetasks.forEach((task) => tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const savetasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });

        updateTaskList();
        updateStats();
        savetasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    savetasks();
}

const deleteTask = (index) => {
    tasks.splice(index, 1)
    updateTaskList();
    updateStats();
    savetasks();
}

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput")

    taskInput.value = tasks[index].text
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    savetasks();
}

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length
    const totalTasks = tasks.length
    const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100
    const progresBar = document.querySelector('.progress');

    progresBar.style.width = `${progress}%`;

    document.getElementById("number").innerText = `${completeTasks} / ${totalTasks}`;


    if(tasks.length && completeTasks === totalTasks){
        blaskConfetti();
    }
}

const updateTaskList = () => {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p>${task.text}</p>
            </div>

            <div class="icons">
                <i class="fa-solid fa-pen-to-square" onClick ="editTask(${index})"></i>
                <i class="fa-regular fa-trash-can" onClick ="deleteTask(${index})"></i>
            </div>
        </div>`;

        listItem.addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();

    addTask();
});


const blaskConfetti = () => {
    const end = Date.now() + 15e3;
    const colors = ["#bb0000", "#ffffff"];
    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}