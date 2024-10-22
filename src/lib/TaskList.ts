type TaskList = {
  id: number;
  title: string;
  description: string;
  category: string;
};

class Task {
  static taskId = 0;
  tasks: TaskList[];

  constructor() {
    this.tasks = [
      { id: 1, title: "Task 1", description: "Task 1 description", category: "To Do" },
      { id: 2, title: "Task 2", description: "Task 2 description", category: "In Progress" },
      { id: 3, title: "Task 3", description: "Task 3 description", category: "Done" },
      { id: 4, title: "Task 4", description: "Task 4 description", category: "To Do" }
    ];
  }

  // Add task method
  addTask(newTask: TaskList): void {
    newTask.id = Task.taskId++;
    this.tasks = [...this.tasks, newTask];
    this.renderTasks();
  }

  // Delete task method
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
    this.renderTasks();
  }

  // Handle drag event
  onDrag(event: DragEvent, taskId: number): void {
    event.dataTransfer?.setData('taskId', taskId.toString());
  }

  // Handle drop event
  onDrop(event: DragEvent, newCategory: string): void {
    event.preventDefault();

    const taskId = event.dataTransfer?.getData('taskId');
    if (taskId) {
      const task = this.tasks.find(task => task.id === parseInt(taskId));
      if (task) {
        task.category = newCategory;
        this.renderTasks();
      }
    }
  }


  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  renderTasks(): void {
    const todoList = document.getElementById('list-todo') as HTMLUListElement;
    const inProgressList = document.getElementById('list-inprogress') as HTMLUListElement;
    const doneList = document.getElementById('list-done') as HTMLUListElement;

    if (!todoList || !inProgressList || !doneList) {
      return;
    }

    todoList.innerHTML = '';
    inProgressList.innerHTML = '';
    doneList.innerHTML = '';

    this.tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.textContent = `${task.id}, ${task.title}, ${task.description}`;
      taskItem.id = `task-${task.id}`;
      taskItem.draggable = true;

      taskItem.addEventListener('dragstart', (event) => this.onDrag(event, task.id));

      if (task.category === 'To Do') {
        todoList.appendChild(taskItem);
      } else if (task.category === 'In Progress') {
        inProgressList.appendChild(taskItem);
      } else if (task.category === 'Done') {
        doneList.appendChild(taskItem);
      }
    });
  }
}

export const taskList = new Task();