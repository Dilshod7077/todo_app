import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TaskModel } from './tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private platformId = inject(PLATFORM_ID);
  tasks = signal<TaskModel[]>([]);

  constructor() {

    this.loadFromStorage();

    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      localStorage.setItem(
        'tasks',
        JSON.stringify(this.tasks())
      );
    });
  }

  private loadFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const data = localStorage.getItem('tasks');

    if (data) {
      this.tasks.set(JSON.parse(data));
    }
  }
}
