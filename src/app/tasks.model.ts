export interface TaskModel {
  id: number;
  text: string;
  isEdit: boolean;
  done: boolean;
  isDeleting?: boolean;
}
