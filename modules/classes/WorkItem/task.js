import WorkItem from "./workItem.js";

export default class Task extends WorkItem{
    constructor(name, description, dueDate, estimatedCost){
        super(name, description, dueDate);
        this.estimatedCost = estimatedCost;        
    }

    getEstimatedCost(){
        return this.estimatedCost;
    }

    accept(visitor){
        visitor.visitTask(this);
    }
}