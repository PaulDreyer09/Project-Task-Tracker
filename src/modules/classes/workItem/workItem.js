export default class WorkItem {
  constructor(name, description, dueDate) {
    this._name = name;
    this._description = description;
    this._dueDate = new Date(dueDate);
  }

  /**
   * Returns the name of the work item.
   * @returns {string} - The name of the work item.
   */
  get name() {
    return this._name;
  }

  /**
   * Sets the name of the work item based on the provided argument.
   * @param {string} name - The new name for the work item.
   */
  set name(name) {
    this._name = `${name}`;
  }

  /**
   * Returns the description of the work item.
   * @returns {string} - The description of the work item.
   */
  get description() {
    return this._description;
  }

  /**
   * Sets the description of the work item based on the provided argument.
   * @param {string} description - The new description for the work item.
   */
  set description(description) {
    this._description = description;
  }

  /**
   * Returns the due date of the work item.
   * @returns {Date} - The due date of the work item.
   */
  get dueDate() {
    return this._dueDate;
  }

  /**
   * Sets the due date of the work item based on the provided argument.
   * Throws an error if the provided date is not an instance of Date.
   * @param {Date} date - The new due date for the work item.
   * @throws {Error} - If the provided date is not an instance of Date.
   */
  set dueDate(date) {
    if (!(date instanceof Date)) {
      throw new Error( `Argument in setting dueDate is not an instance of Date. Value given: ${date}` );
    }

    this._dueDate = date;
  }

  /**
   * Throws an error stating that derived classes of WorkItem need to implement this method.
   * @throws {Error} - Stating that derived classes need to implement the getEstimatedCost method.
   */
  getEstimatedCost() {
    throw new Error("Derived classes of WorkItem needs to implement the getEstimatedCost method before calling." );
  }

  /**
   * Throws an error stating that derived classes of WorkItem need to implement this method.
   * @throws {Error} - Stating that derived classes need to implement the isCompleted method.
   */
  isCompleted() {
    throw new Error("Derived classes of WorkItem needs to implement the isCompleted method before calling.");
  }

  /**
   * Throws an error stating that derived classes of WorkItem need to implement this method.
   * @throws {Error} - Stating that derived classes need to implement the setAsCompleted method.
   */
  setAsCompleted() {
    throw new Error( "Derived classes of WorkItem needs to implement the setAsCompleted method before calling.");
  }

  /**
   * Throws an error stating that derived classes of WorkItem need to implement this method.
   * @param {Object} visitor - The visitor object to be accepted.
   * @throws {Error} - Stating that derived classes need to implement the accept method.
   */
  accept(visitor) {
    throw new Error("Derived classes of WorkItem needs to implement the accept method before calling.");
  }
}
