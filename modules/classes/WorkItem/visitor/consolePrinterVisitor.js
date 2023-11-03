export default class ConsolePrinterVisitor {
    constructor() {
        this._projectLevel = 0
    }

    _createStringIndent(level) {
        return '\t'.repeat(level);
    }

    _getStringIndents() {
        const nameIndent = this._createStringIndent(this._projectLevel);
        const infoIndent = this._createStringIndent(this._projectLevel + 1);
        return { nameIndent, infoIndent };
    }

    _outputWorkItemData(item) {
        const { nameIndent, infoIndent } = this._getStringIndents();
        console.log(`${nameIndent + item.name}:`);
        console.log(`${infoIndent}Due date: ${item.dueDate.toDateString()}`);
        console.log(`${infoIndent}Estimated Cost: ${item.getEstimatedCost()}`);
        console.log(`${infoIndent}Description: ${item.description}`);
    }

    enterProject(project) {
        const { nameIndent, infoIndent } = this._getStringIndents();
        console.log(nameIndent + 'Project Start');
        this._outputWorkItemData(project);
        console.log(infoIndent + '\tSubtasks:');
        this._projectLevel++;
    }

    exitProject(project) {
        const { infoIndent } = this._getStringIndents();
        console.log(infoIndent + 'Project End');
        this._projectLevel--;
    }

    visitTask(task) {
        this._outputWorkItemData(task);
    }
}