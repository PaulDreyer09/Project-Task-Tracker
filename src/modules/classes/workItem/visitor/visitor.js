export class Visitor {
    enterProject(project) {
    }

    exitProject(project) {
    }

    visitTask(task) {
    }
}

export class SubVisitor extends Visitor{
    constructor(){
        super();
        this.collection = []
    }

    visitTask(task){
        this.collection.push(task);
    }    
} 
