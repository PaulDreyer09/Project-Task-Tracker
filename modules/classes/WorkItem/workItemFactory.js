import WorkItem from "./workItem.js";
import Task from "./task.js";
import Project from "./project.js";

// export default class WorkItemFactory{
//     constructor(){
//         this._registeredWorkItemTypes = {}
//     }

//     getWorkItem(type, data){
//         switch(type){
//             case 'Task': {
//                 return new Task(data.name, data.description, data.dueDate, data.estimatedCost);
//             }
//             case 'Project': {
//                 return new Project(data.name, data.description, data.dueDate);
//             }
//             default:{
//                 throw new Error(`The class, ${type}, is not registered in the WorkItemFactory`);
//             }
//         }
//     }
// }

export default class WorkItemFactory{
    constructor(){
        this._registeredWorkItemTypes = {};
    }

    _isSubclassOfWorkItem(childClass){
        return childClass.prototype instanceof WorkItem;
    }

    _objectToArray(data){
        const array = [];

        for(const key in data){
            array.push(data[key]);
        }

        return array;
    }

    registerWorkItemType(typeName, classDefinition){
        if((typeName in this._registeredWorkItemTypes)){
            throw new Error(`WorkItem type, ${typeName}, has already been registered.` )
        }
        if(!this._isSubclassOfWorkItem(classDefinition)){
            throw new Error(`The provided class definition to register is not a child class of WorkItem: ${classDefinition}`);
        }

        this._registeredWorkItemTypes[typeName] = classDefinition
    }

    getWorkItem(type, data){
        const WorkItemConstructor = this._registeredWorkItemTypes[type];

        if(!WorkItemConstructor){
            throw new Error(`The class, ${type}, is not registered in the WorkItemFactory`);
        }

        const args = this._objectToArray(data);
        // console.log(args)

        return new WorkItemConstructor(...args);
    }
}
