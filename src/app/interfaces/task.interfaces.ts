export interface Task {
    id?: string;
    user?: string;
    title: string;
    description: string;
    created: number;
    checked: boolean;
}
