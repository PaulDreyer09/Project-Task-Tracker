import WorkItem from "../workItem.js";

export default class WorkItemFactory {
  constructor() {
    this._registeredWorkItemTypes = {};
  }

  /**
   * Checks if a given class is a subclass of WorkItem.
   * @param {Function} childClass - The class to check for being a subclass of WorkItem.
   * @returns {boolean} - True if the class is a subclass of WorkItem, false otherwise.
   */
  _isSubclassOfWorkItem(childClass) {
    return childClass.prototype instanceof WorkItem;
  }

  /**
   * Registers a new WorkItem type with its corresponding class definition.
   * @param {string} typeName - The name of the WorkItem type to register.
   * @param {Function} classDefinition - The class definition for the WorkItem type.
   * @throws {Error} - If the typeName is already registered or if the classDefinition is not a subclass of WorkItem.
   */
  registerWorkItemType(typeName, classDefinition) {
    if (typeName in this._registeredWorkItemTypes) {
      throw new Error(
        `WorkItem type, ${typeName}, has already been registered.`
      );
    }
    if (!this._isSubclassOfWorkItem(classDefinition)) {
      throw new Error(
        `The provided class definition to register is not a child class of WorkItem: ${classDefinition}`
      );
    }

    this._registeredWorkItemTypes[typeName] = classDefinition;
  }

  getWorkItemFactory(type){
    const WorkItemConstructor = this._registeredWorkItemTypes[type];
    if (!WorkItemConstructor) {
      throw new Error(
        `The class, ${type}, is not registered in the WorkItemFactory`
        );
    }
    return WorkItemConstructor;      
  }

  /**
   * Creates and returns an instance of a WorkItem based on the specified type and data.
   * @param {string} type - The type of WorkItem to create.
   * @param {Object} data - The data to initialize the WorkItem instance.
   * @returns {WorkItem} - An instance of the specified WorkItem type.
   * @throws {Error} - If the specified type is not registered in the WorkItemFactory.
   */
  getWorkItem(type, data) {
    const WorkItemConstructor = this.getWorkItemFactory(type);

    const workItem = WorkItemConstructor.Factory(data);

    for(const task of data.children ?? []){
      workItem.addTask(this.getWorkItem(task.type, task.data));
    }

    return workItem;
  }
}


