import WorkItem from './modules/classes/WorkItem/index.js'

// Abrstract factory setup
export const getRegisteredFacory = (workItemTypes) => {
    const factory = new WorkItem.WorkItemFactory();
    
    for(const key in workItemTypes){
        factory.registerWorkItemType(key, workItemTypes[key]);
    }
    
    return factory;
}

export const getWorkItems = (data) => {
    //Abstract factory setup
    const workItemTypes = {
        Task: WorkItem.Task,
        Project: WorkItem.Project
    };

    const factory = getRegisteredFacory(workItemTypes);
    // const factory = new WorkItem.WorkItemFactory();

    const project = createWorkItemsFromData(data, factory);
    
    return project;
}

export const createWorkItemsFromData = (obj, factory) => {
    const workItem = factory.getWorkItem(obj.type, obj.data);
    
    if(obj.type === 'Project'){
        for(const subTask of obj.data.subTasks){
            workItem.addTask(createWorkItemsFromData(subTask, factory));
        }
    }
    
    return workItem;
}

export const ConsolePrintProject = (project) => {
    project.accept(new WorkItem.Visitors.ConsolePrinterVisitor());
}