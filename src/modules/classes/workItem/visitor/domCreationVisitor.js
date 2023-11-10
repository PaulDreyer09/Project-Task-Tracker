import {Visitor} from "./visitor.js";
import * as dom from "../../../utils/dom-creation.js";

export default class DomCreationVisitor extends Visitor {
  constructor(containerElement) {
    super();
    this._taskListTree = [containerElement];
  }

  /**
   * Returns the current project's subtasks container from the _taskListTree.
   * @returns {HTMLElement} - The current project's subtasks container.
   */
  _getCurrentProjectSubtasksContainer() {
    return this._taskListTree[this._taskListTree.length - 1];
  }

  /**
   * Creates and returns the header DOM element for a work item.
   * @param {Object} workItem - The work item object with properties like name, dueDate, getEstimatedCost, and description.
   * @returns {HTMLElement} - The header DOM element.
   */
  _createItemDisplayHeader(workItem) {
    const taskHeader = dom.createElement("div", {}, ["header"]);
    const infoContainer = dom.createElement("div", {}, ["info"]);
    taskHeader.addEventListener("click", (e) =>
      this._toggleDisplayOpen(taskHeader)
    );
    infoContainer.append(
      dom.createElement("p", {}, [], workItem.name),
      dom.createElement("p", {}, [], workItem.dueDate.toDateString())
    );
    taskHeader.append(infoContainer);
    return taskHeader;
  }

  /**
   * Creates and returns the body DOM element for a work item.
   * @param {Object} workItem - The work item object with properties like name, dueDate, getEstimatedCost, and description.
   * @returns {HTMLElement} - The body DOM element.
   */
  _createItemDisplayBody(workItem) {
    const detailsContainerWrapper = dom.createElement("div", {}, [
      "details-container-wrapper",
    ]);

    const detailsContainer = dom.createElement("div", {}, [
      "details-container",
    ]);

    detailsContainerWrapper.append(detailsContainer);
    const estimatedCostLine = dom.createContainerWithLabel(
      "Estimated Cost",
      "",
      ["estimated-cost-display"]
    );
    estimatedCostLine.append(
      dom.createElement("p", {}, [], workItem.getEstimatedCost())
    );

    detailsContainer.append(estimatedCostLine);
    detailsContainer.append(dom.createElement("label", {}, [], "Description"));
    detailsContainer.append(
      dom.createElement("p", {}, [], workItem.description)
    );

    return detailsContainerWrapper;
  }

  /**
   * Creates and returns the complete display DOM element for a work item.
   * @param {Object} workItem - The work item object with properties like name, dueDate, getEstimatedCost, and description.
   * @returns {HTMLElement} - The complete display DOM element.
   */
  _createItemDisplay(workItem) {
    const itemDisplay = dom.createElement("div", {}, []);

    const taskHeader = dom.createElement("div", {}, ["header"]);
    taskHeader.append(dom.createElement("p", {}, [], workItem.name));
    taskHeader.append(
      dom.createElement("p", {}, [], workItem.dueDate.toDateString())
    );
    itemDisplay.append(taskHeader);

    const detailsContainer = dom.createElement("div", {}, [
      "details-container",
    ]);
    const estimatedCostLine = dom.createContainerWithLabel(
      "Estimated Cost",
      "",
      ["estimated-cost-display"]
    );
    estimatedCostLine.append(
      dom.createElement("p", {}, [], workItem.getEstimatedCost())
    );

    detailsContainer.append(estimatedCostLine);
    detailsContainer.append(dom.createElement("label", {}, [], "Description"));
    detailsContainer.append(
      dom.createElement("p", {}, [], workItem.description)
    );

    itemDisplay.append(detailsContainer);

    return itemDisplay;
  }

  /**
   * Handles the completion of a task and updates the UI accordingly.
   * @param {Event} event - The click event.
   * @param {Object} task - The task object with properties like name, dueDate, getEstimatedCost, and description.
   * @param {HTMLElement} completeButton - The complete button DOM element.
   */
  _handleTaskComplete(event, task, completeButton) {
    event.stopPropagation();
    if (task.isCompleted()) {
      return;
    }

    if (confirm("Are you sure you want to complete this Task?")) {
      task.setAsCompleted();
      completeButton.classList.add("completed");
    }
  }

  /**
   * Handles the completion of a project and updates the UI accordingly.
   * @param {Event} event - The click event.
   * @param {Object} project - The project object with properties like name, dueDate, getEstimatedCost, and description.
   * @param {HTMLElement} completeButton - The complete button DOM element.
   * @param {HTMLElement} currentProjectDiv - The current project's DOM element.
   */
  _handleProjectComplete(event, project, completeButton, currentProjectDiv) {
    event.stopPropagation();
    if (project.isCompleted()) {
      return;
    }

    if (
      confirm(
        "Completing a project will complete all of it's child work items.\nAre you sure you want to complete this project?"
      )
    ) {
      project.setAsCompleted();

      const completeButtons = currentProjectDiv.querySelectorAll(".completeButton");
      for (const button of completeButtons) {
        button.classList.add("completed");
      }
    }
  }

  /**
   * Handles the click event on a task and sets focus accordingly.
   * @param {Event} e - The click event.
   */
  _handleTaskClicked(e) {
    const getTargetTaskContainer = (target) => {
      for (
        let element = target;
        element.parentElement;
        element = element.parentElement
      ) {
        if (
          element.classList.contains("sub-task-display") ||
          element.classList.contains("project-display")
        ) {
          return element;
        }
      }

      throw new Error(
        "This element is not a child element of a task or project display"
      );
    };

    const setFocusTask = (taskDisplay) => {
      if (taskDisplay.classList.contains("focussed")) {
        return;
      }

      const tasks = document.querySelectorAll(
        ".project-display.focussed, .sub-task-display.focussed"
      );

      taskDisplay.classList.add("focussed");

      for (const task of tasks) {
        task.classList.remove("focussed");
      }
    };

    const taskContainer = getTargetTaskContainer(e.target);
    setFocusTask(taskContainer);
  }

  /**
   * Toggles the open/close state of the display based on the clicked header.
   * @param {HTMLElement} currentHeader - The clicked header DOM element.
   */
  _toggleDisplayOpen(currentHeader) {
    currentHeader.parentElement.classList.toggle("open");
  }

  /**
   * Creates and returns a complete button DOM element.
   * @returns {HTMLElement} - The complete button DOM element.
   */
  _createCompleteButton() {
    const completeButton = dom.createElement("span", {}, ["completeButton"]);
    completeButton.append(dom.createElement("span", {}, ["inner"]));
    return completeButton;
  }

  /**
   * Creates and appends DOM elements for the entered project, including header, body, and subtasks container.
   * @param {Object} project - The project object with properties like name, dueDate, getEstimatedCost, and description.
   */
  enterProject(project) {
    const projectDiv = dom.createElement("div", {}, ["project-display"]);
    projectDiv.addEventListener("click", this._handleTaskClicked);

    const projectHeader = this._createItemDisplayHeader(project);
    const completeButton = this._createCompleteButton();
    projectHeader.append(completeButton);

    const projectDisplayBody = this._createItemDisplayBody(project);

    projectDiv.append(projectHeader, projectDisplayBody);

    const subTasksContainer = dom.createContainerWithLabel("Subtasks", "", [
      "sub-task-container",
    ]);
    projectDisplayBody.querySelector(".details-container").append(subTasksContainer);

    this._getCurrentProjectSubtasksContainer().append(projectDiv);

    this._taskListTree.push(subTasksContainer);

    completeButton.addEventListener("click", (e) =>
      this._handleProjectComplete(e, project, completeButton, projectDiv)
    );
  }

  /**
   Pops the current project's subtasks container from the _taskListTree.
   */
  exitProject() {
    this._taskListTree.pop();
  }

  /**
   * Creates and appends DOM elements for the visited task, including header and body.
   * @param {Object} task - The task object with properties like name, dueDate, getEstimatedCost, and description.
   */
  visitTask(task) {
    const taskDiv = dom.createElement("div", {}, ["sub-task-display"]);
    const completeButton = this._createCompleteButton();
    completeButton.addEventListener("click", (e) =>
      this._handleTaskComplete(e, task, completeButton)
    );

    const taskDisplayHeader = this._createItemDisplayHeader(task);
    taskDisplayHeader.append(completeButton);

    const taskDisplayBody = this._createItemDisplayBody(task);
    taskDiv.append(taskDisplayHeader, taskDisplayBody);

    this._getCurrentProjectSubtasksContainer().append(taskDiv);
  }
}
