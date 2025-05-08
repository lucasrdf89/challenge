interface Task {
    id?: string;
    title: string;
    description: string;
    checked: boolean;
    userId?: string;
    created?: Date;
}
export default Task;
