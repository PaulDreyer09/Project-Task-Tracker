import {Task, Project, Visitors, WorkItemFactory} from "../src/modules/classes/workItem/index.js";
// import * as WorkItem from "../src/modules/classes/workItem/index.js";


/**
 * Creates and returns a WorkItemFactory with registered work item types based on the provided workItemTypes object.
 * @param {Object} workItemTypes - An object mapping work item types to their corresponding classes.
 * @returns {WorkItemFactory} - The initialized WorkItemFactory.
 */
export const getRegisteredFacory = (workItemTypes) => {
  const factory = new WorkItemFactory();

  for (const key in workItemTypes) {
    factory.registerWorkItemType(key, workItemTypes[key]);
  }

  return factory;
};

/**
 * Retrieves and returns a project created from the provided data using an abstract factory setup.
 * @param {Object} data - The data object containing information about the project and its tasks.
 * @returns {Object} - The project object created from the data.
 */
export const getWorkItem = (data) => {
  //Abstract factory setup
  const workItemTypes = {
    Task,
    Project,
  };

  const factory = getRegisteredFacory(workItemTypes); 

  return factory.getWorkItem(data.type, data.data);
};

/**
 * Logs the details of a project to the console using a ConsoleDebugVisitor.
 * @param {Object} project - The project object to be printed to the console.
 */
export const ConsolePrintProject = (project) => {

  const visitor = project.accept(new Visitors.SubVisitor());

  console.log(visitor.collection.length)

  // project.accept(new Visitors.ConsoleDebugVisitor());
};

/**
 * Initializes the DOM by creating and displaying elements for the provided project using a DomCreationVisitor.
 * @param {Object} project - The project object for which the DOM is to be initialized.
 */
export const InitializeDom = (project) => {
  const display = document.querySelector("#project");
  project.accept(new Visitors.DomCreationVisitor(display));
};
