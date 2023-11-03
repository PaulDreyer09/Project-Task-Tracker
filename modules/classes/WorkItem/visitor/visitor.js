export default class Visitor {
    constructor() {
        throw new Error('The base class Visitor needs to be derived to be used.');
    }

    enterProject(project) {
        throw new Error('The method, enterProject, needs to be implemented firest to be called.');
    }

    exitProject(project) {
        throw new Error('The method, exitProject, needs to be implemented firest to be called.');
    }

    visitTask(task) {
        throw new Error('The method, visitTask, needs to be implemented firest to be called.');
    }
}

