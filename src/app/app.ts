import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TasksService } from './tasks.service';
import { TaskModel as Task } from './tasks.model';


import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  search = signal('');
  newTask = '';
  filter = signal<'all' | 'active' | 'done'>('all');

  constructor(public tasksService: TasksService) {}

  ngOnInit() {
    const setVH = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    };

    setVH();
    window.addEventListener('resize', setVH);
  }

  totalCount = computed(() =>
    this.tasksService.tasks().length
  );

  doneCount = computed(() =>
    this.tasksService.tasks().filter(t => t.done).length
  );

  activeCount = computed(() =>
    this.tasksService.tasks().filter(t => !t.done).length
  );

  addTask(): void {
    if (!this.newTask.trim()) return;

    this.tasksService.tasks.update(tasks => [
      ...tasks,
      {
        id: Date.now(),
        text: this.newTask,
        isEdit: false,
        done: false,
      },
    ]);

    this.newTask = '';
  }

  editTask(task: Task) {
    task.isEdit = true;
  }

  saveTask(task: Task) {
    task.isEdit = false;
  }

  deleteTask(id: number) {
    this.tasksService.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, isDeleting: true }
          : task
      )
    );

    setTimeout(() => {
      this.tasksService.tasks.update(tasks =>
        tasks.filter(task => task.id !== id)
      );
    }, 250);
  }

  toggleDone(task: Task) {
    this.tasksService.tasks.update(t =>
      t.map(x =>
        x.id === task.id
          ? { ...x, done: !x.done }
          : x
      )
    );

    if (!task.done) {
      setTimeout(() => {
        this.tasksService.tasks.update(t =>
          t.filter(x => x.id !== task.id)
        );
      }, 400);
    }
  }

  filteredTasks = computed(() => {
    let tasks = this.tasksService.tasks();

    const f = this.filter();
    const s = this.search().toLowerCase().trim();

    if (f === 'active') tasks = tasks.filter(t => !t.done);
    if (f === 'done') tasks = tasks.filter(t => t.done);

    if (s) {
      tasks = tasks.filter(t =>
        t.text.toLowerCase().includes(s)
      );
    }

    return tasks;
  });

  emptyTitle = computed(() => {
    const f = this.filter();

    if (f === 'active') return 'Нет активных задач';
    if (f === 'done') return 'Нет выполненных задач';
    return 'Список пуст';
  });

  emptySubtitle = computed(() => {
    const search = this.search().trim();

    if (search) {
      return 'По вашему запросу ничего не найдено';
    }

    return 'Добавьте первую задачу, чтобы начать';
  });

  trackById(index: number, task: Task) {
    return task.id;
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.tasksService.tasks.update(tasks => {
      const updated = [...tasks];

      moveItemInArray(
        updated,
        event.previousIndex,
        event.currentIndex
      );

      return updated;
    });
  }
}
