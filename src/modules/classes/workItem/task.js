import WorkItem from "./workItem.js";
import * as validation from "../../utils/validation.js";

export class Task extends WorkItem {
  constructor(name, description, dueDate, estimatedCost) {
    super(name, description, dueDate);
    this._estimatedCost = estimatedCost;
    this._completed = false;
  }

  static Factory(params){
    return new Task(params.name, params.description, params.dueDate, params.estimatedCost);
  }

  /**
   * Returns the completion status of the task.
   * @returns {boolean} - The completion status.
   */
  get completed() {
    return this._completed;
  }

  /**
   * Sets the completion status of the task.
   * @param {boolean} val - The value to set for the completion status.
   */
  set completed(val) {
    this._completed = Boolean(val);
  }

  /**
   * Returns the estimated cost of completing the task.
   * @returns {number} - The estimated cost.
   */
  get estimatedCost() {
    return this._estimatedCost;
  }

  /**
   * Sets the estimated cost of completing the task after validating it as a valid number.
   * @param {any} val - The value to set for the estimated cost.
   */
  set estimatedCost(val) {
    this._estimatedCost = validation.validNumber(parseFloat(val));
  }

  /**
   * Checks if the task is completed.
   * @returns {boolean} - True if the task is completed, false otherwise.
   */
  isCompleted() {
    return this._completed;
  }

  /**
   * Sets the task as completed by updating the completed status to true.
   */
  setAsCompleted() {
    this._completed = true;
  }

  /**
   * Returns the estimated cost of completing the task.
   * @returns {number} - The estimated cost.
   */
  getEstimatedCost() {
    return this._estimatedCost;
  }

  /**
   * Accepts a visitor and invokes the visitTask method on it.
   * @param {Object} visitor - The visitor object to accept.
   */
  accept(visitor) {
    visitor.visitTask(this);
    return visitor;
  }
}
