import WorkItem from "./workItem.js";

export default class Project extends WorkItem {
    constructor(name, description, dueDate) {
        super(name, description, dueDate);
        this.subTasks = [];
    }

    getEstimatedCost() {
        let total = 0;
        for (const task of this.subTasks) {
            total += task.getEstimatedCost();
        }
        return total;
    }

    addTask(task) {
        if (task.dueDate > this.dueDate) {
            throw new Error(
                `A subtask can't be added to a Project if the subtask has a later due date than the Project.\n` +
                `Project to add to: ${this.name}\n` + 
                `Project due date:${this.dueDate}\n`) +
                `Task to add: ${task.name}\n` + 
                `Task due date:${task.dueDate}\n`;
        }

        if (!(task instanceof WorkItem)) {
            throw new Error(`Only classes derived from WorkItem can be added to the projects subTasks.\nType of object to add: ${typeof task}`);
        }

        this.subTasks.push(task);
    }

    removeTask(task){
        const foundIndex = this.subTasks.indexOf(task);

        if(foundIndex === -1){
            return false;
        }
        
        this.subTasks = [
            ...this.subTasks.slice(0,foundIndex - 1), 
            ...this.subTasks.slice(foundIndex)
        ];

        return true;
    }

    accept(visitor){
        visitor.enterProject(this);
        for(const item of this.subTasks){
            item.accept(visitor);
        }
        visitor.exitProject(this);
    }
} 