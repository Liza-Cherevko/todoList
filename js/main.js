// находим элементы на странице 
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];
if (localStorage.getItem('tasks')) { 
	// console.log(localStorage.getItem('tasks'));
	// console.log(JSON.parse(localStorage.getItem('tasks')))
	tasks = JSON.parse(localStorage.getItem('tasks'))
	console.log(tasks)

}
tasks.forEach((task)=> renderTask(task));
 

checkEmptyList()

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', addDoneclass);





function addTask(e) { 
	preventDefault(e)

	getValues()
	
	resetInput()

	checkEmptyList()
	saveToLocalStorage()
	}

function preventDefault(e) { 
	e.preventDefault()
}

function getValues() { 
	const taskText = taskInput.value;
	const newTask = {
		id: Date.now(),
		text: taskText,
		done:false,
	}
	
	tasks.push(newTask)
	renderTask(newTask)
	
}

function resetInput() { 
	taskInput.value = ''
		taskInput.focus();
}

function deleteTask(e) {
	if (e.target.dataset.action !== 'delete') return;
	
	const parantEl = e.target.closest('.list-group-item')

	// определяем ID задачи
	const id = +parantEl.id;

	// находим индекс задачи в масиве
// const index =	tasks.findIndex( (task)=>  task.id === id)
// 	tasks.splice(index, 1);
	tasks= tasks.filter((task)=> task.id===id ? false:true)
	parantEl.remove()
	checkEmptyList()
	saveToLocalStorage()
	}		
function addDoneclass(e) { 
	if (e.target.dataset.action !== 'done') return 
	const parantEl = e.target.closest('.list-group-item')
	const id = +parantEl.id
	const task = tasks.find((task) => task.id === id)
	task.done = !task.done
	console.log(task)
	parantEl.classList.add('task-title--done')

	checkEmptyList()
	saveToLocalStorage()
}

function checkEmptyList() { 
	if (tasks.length === 0) { 
         const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
		 <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
		 <div class="empty-list__title">Список дел пуст</div>
	 </li>`
		 tasksList.insertAdjacentHTML('afterbegin',emptyListHTML)
	} else  { 
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;
	}
}

function saveToLocalStorage() { 
	localStorage.setItem('tasks', JSON.stringify(tasks))

}

function renderTask(task) { 
	const cssClass = task.done ? `task-title task-title--done` : `task-title`;
	const taskHTML = ` <li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
	<span class="${cssClass}">${task.text}</span>
	<div class="task-item__buttons">
		<button type="button" data-action="done" class="btn-action">
			<img src="./img/tick.svg" alt="Done" width="18" height="18">
		</button>
		<button type="button" data-action="delete" class="btn-action">
			<img src="./img/cross.svg" alt="Done" width="18" height="18">
		</button>
	</div>
</li>`;

	return tasksList.insertAdjacentHTML('beforeend', taskHTML);
}

