export interface Todo {
    id: number | null;
    title: string;
    priority: string;
    completed: boolean;
    date: string; 
    time: string; // Add date property
}
