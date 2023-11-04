import Visitor from "./visitor.js";
import * as dom from '../../../utils/dom-creation.js'

export default class DomCreationVisitor extends Visitor {
    constructor(containerElement) {
        super();
        this._projectElementTree = [containerElement];
    }

    _getCurrentProjectElement() {
        return this._projectElementTree[this._projectElementTree.length - 1];
    }

    _createItemDisplayHeader(workItem) {
        const taskHeader = dom.createElement('div', {}, ['header']);
        taskHeader.append(dom.createElement('p', {}, [], workItem.name));
        taskHeader.append(dom.createElement('p', {}, [], workItem.dueDate.toDateString()));
        return taskHeader;
    }

    _createItemDisplayBody(workItem) {
        const detailsContainer = dom.createElement('div', {}, ['details-container']);
        const estimatedCostLine = dom.createContainerWithLabel('Estimated Cost', '', ['estimated-cost-display']);
        estimatedCostLine.append(dom.createElement('p', {}, [], workItem.getEstimatedCost()));

        detailsContainer.append(estimatedCostLine);
        detailsContainer.append(dom.createElement('label', {}, [], 'Description'));
        detailsContainer.append(dom.createElement('p', {}, [], workItem.description));

        return detailsContainer;
    }

    _createItemDisplay(workItem) {
        const itemDisplay = dom.createElement('div', {}, []);

        const taskHeader = dom.createElement('div', {}, ['header']);
        taskHeader.append(dom.createElement('p', {}, [], workItem.name));
        taskHeader.append(dom.createElement('p', {}, [], workItem.dueDate.toDateString()));
        itemDisplay.append(taskHeader);

        const detailsContainer = dom.createElement('div', {}, ['details-container']);
        const estimatedCostLine = dom.createContainerWithLabel('Estimated Cost', '', ['estimated-cost-display']);
        estimatedCostLine.append(dom.createElement('p', {}, [], workItem.getEstimatedCost()));

        detailsContainer.append(estimatedCostLine);
        detailsContainer.append(dom.createElement('label', {}, [], 'Description'));
        detailsContainer.append(dom.createElement('p', {}, [], workItem.description));

        itemDisplay.append(detailsContainer);


        return itemDisplay;
    }

    _handleProjectHeaderFocussed(currentHeader) {
        const projectHeaders = document.querySelectorAll('.project-display>.header');

        currentHeader.classList.toggle('focussed');

        for (const header of projectHeaders) {
            if (currentHeader !== header)
                header.classList.remove('focussed');
        }
    }

    enterProject(project) {
        const projectDiv = dom.createElement('div', {}, ['project-display']);

        const projectHeader = this._createItemDisplayHeader(project);
        projectHeader.addEventListener('click', (e) => this._handleProjectHeaderFocussed(projectHeader),);
        projectDiv.append(projectHeader);

        const projectDisplayBody = this._createItemDisplayBody(project);
        projectDiv.append(projectDisplayBody);

        const subTasksContainer = dom.createContainerWithLabel('Subtasks', '', ['sub-task-container'])
        projectDisplayBody.append(subTasksContainer);

        this._getCurrentProjectElement().append(projectDiv);

        this._projectElementTree.push(subTasksContainer);
    }

    exitProject(project) {
        this._projectElementTree.pop();
    }

    visitTask(task) {
        const taskDiv = dom.createElement('div', {}, ['sub-task-display']);
        taskDiv.append(this._createItemDisplayHeader(task));

        const projectDisplayBody = this._createItemDisplayBody(task);
        taskDiv.append(projectDisplayBody);

        this._getCurrentProjectElement().append(taskDiv);
    }
}

