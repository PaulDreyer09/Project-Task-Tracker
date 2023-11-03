export default class WorkItem {
    constructor(name, description, dueDate){
        this._name = name;
        this._description = description;
        this._dueDate = dueDate;
    }

    get name(){
        return this._name;
    }

    set name(name){        
        this._name = `${name}`;
    }

    get description(){
        return this._description;
    }

    set description(description){
        this._description = description;
    }

    get dueDate(){
        return this._dueDate;
    }

    set dueDate(date){
        if(!(date instanceof Date)){
            throw new Error(`Argument in setting dueDate is not an instance of Date. Value given: ${date}`);
        }
        
        this._dueDate = date;
    }

    getEstimatedCost(){
        throw new Error ("Derived classes of WorkItem needs to implement the getEstimatedCost method before calling.");
    }

    consoleDebug(subtaskLevel = 0){
        const nameSpacing = "\t".repeat(subtaskLevel);
        const spacing = "\t".repeat(subtaskLevel + 1);

        console.log(`${nameSpacing + this.name}:`);
        console.log(`${spacing}Due date: ${this.dueDate.toDateString()}`);
        console.log(`${spacing}Estimated Cost: ${this.getEstimatedCost()}`);
        console.log(`${spacing}Description: ${this.description}`);
    }

    accept(visitor){
        throw new Error ("Derived classes of WorkItem needs to implement the accept method before calling.");
    }
}