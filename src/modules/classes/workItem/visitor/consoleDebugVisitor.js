import {Visitor} from "./visitor.js";

export default class ConsoleDebugVisitor extends Visitor {
  constructor() {
    super();
    this._projectLevel = 0;
  }

  /**
   * Creates an indented string based on the specified level.
   * @param {number} level - The level of indentation.
   * @returns {string} - The indented string.
   */
  _createStringIndent(level) {
    return "\t".repeat(level);
  }

  /**
   * Returns an object containing nameIndent and infoIndent strings based on the current project level.
   * @returns {Object} - An object with nameIndent and infoIndent properties.
   */
  _getStringIndents() {
    const nameIndent = this._createStringIndent(this._projectLevel);
    const infoIndent = this._createStringIndent(this._projectLevel + 1);
    return { nameIndent, infoIndent };
  }

  /**
   * Logs the details of a work item (task or project) to the console.
   * @param {Object} item - The work item object with properties like name, dueDate, getEstimatedCost, and description.
   */
  _outputWorkItemData(item) {
    const { nameIndent, infoIndent } = this._getStringIndents();
    console.log(`${nameIndent + item.name}:`);
    console.log(`${infoIndent}Due date: ${item.dueDate.toDateString()}`);
    console.log(`${infoIndent}Estimated Cost: ${item.getEstimatedCost()}`);
    console.log(`${infoIndent}Description: ${item.description}`);
  }

  /**
   * Logs the start of a project and its details to the console.
   * Increases the project level for proper indentation.
   * @param {Object} project - The project object with properties like name, dueDate, getEstimatedCost, and description.
   */
  enterProject(project) {
    const { nameIndent, infoIndent } = this._getStringIndents();
    console.log(nameIndent + "Project Start");
    this._outputWorkItemData(project);
    console.log(infoIndent + "Subtasks:");
    this._projectLevel++;
  }

  /**
   * Logs the end of a project to the console.
   * Decreases the project level for proper indentation.
   * @param {Object} project - The project object with properties like name, dueDate, getEstimatedCost, and description.
   */
  exitProject(project) {
    this._projectLevel--;
    const { nameIndent } = this._getStringIndents();
    console.log(nameIndent + "Project End");
  }

  /**
   * Logs the details of a task to the console.
   * @param {Object} task - The task object with properties like name, dueDate, getEstimatedCost, and description.
   */
  visitTask(task) {
    this._outputWorkItemData(task);
  }
}
