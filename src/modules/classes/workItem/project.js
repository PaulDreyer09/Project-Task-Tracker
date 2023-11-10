import WorkItem from "./workItem.js";

export class Project extends WorkItem {
  constructor(name, description, dueDate) {
    super(name, description, dueDate);
    this._subTasks = [];
  }

  static Factory(params){
    return new Project(params.name, params.description, params.dueDate);
  }

  /**
   * Calculates and returns the total estimated cost of all subtasks in the project.
   * @returns {number} - The total estimated cost of all subtasks.
   */
  getEstimatedCost() {
    let total = 0;
    for (const task of this._subTasks) {
      total += task.getEstimatedCost();
    }
    return total;
  }

  /**
   * Adds a task to the project's list of subtasks.
   * Throws an error if the task has a due date later than the project's due date or if it's not an instance of WorkItem.
   * @param {Object} task - The task object to be added to the project's subtasks.
   */
  addTask(task) {
    if (task.dueDate > this.dueDate) {
      throw (
        new Error(
          `A subtask can't be added to a Project if the subtask has a later due date than the Project.\n` +
            `Project to add to: ${this.name}\n` +
            `Project due date:${this.dueDate}\n`
        ) +
        `Task to add: ${task.name}\n` +
        `Task due date:${task.dueDate}\n`
      );
    }

    if (!(task instanceof WorkItem)) {
      throw new Error(
        `Only classes derived from WorkItem can be added to the projects subTasks.\nType of object to add: ${typeof task}`
      );
    }
    // console.log('Project.addTask()', task)
    this._subTasks.push(task);
  }

  /**
   * Removes a task from the project's list of subtasks.
   * @param {Object} task - The task object to be removed from the project's subtasks.
   * @returns {boolean} - True if the task is successfully removed, false if the task is not found.
   */
  removeTask(task) {
    const foundIndex = this._subTasks.indexOf(task);

    if (foundIndex === -1) {
      return false;
    }

    this._subTasks = [
      ...this._subTasks.slice(0, foundIndex - 1),
      ...this._subTasks.slice(foundIndex),
    ];

    return true;
  }

  /**
   * Checks if all subtasks in the project are completed.
   * @returns {boolean} - True if all subtasks are completed, false otherwise.
   */
  isCompleted() {
    for (const task of this._subTasks) {
      if (!task.isCompleted()) {
        return false;
      }
    }
    return true;
  }

  /**
   * Sets all subtasks in the project as completed.
   */
  setAsCompleted() {
    for (const task of this._subTasks) {
      task.setAsCompleted();
    }
  }

  /**
   * Accepts a visitor and performs the visitation process for the project and its subtasks.
   * Calls the enterProject and exitProject methods of the visitor.
   * @param {Object} visitor - The visitor object implementing the visitation logic.
   */
  accept(visitor) {
    visitor.enterProject(this);
    for (const item of this._subTasks) {
      item.accept(visitor);
    }
    visitor.exitProject(this);
    return visitor;
  }
}
