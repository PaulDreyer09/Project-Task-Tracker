export const data = {
    type: "Project",
    data:{
        name: "Installation of office IT and network infrastructure",
        description: "The client's office needs IT and Network infrastructure installed for their IT equipment.",
        dueDate: new Date(2023, 11, 20),
        subTasks: [
            {
                type: "Task",
                data: {
                    name: "Site visit",
                    description: "Visit the office location to assess the IT and network infrastructure requirements and layout.",
                    dueDate: new Date(2023, 11, 2),
                    estimatedCost: 1000,
                }
            },
            {
                type: "Project",
                data: {
                    name: "Install Network infrastructure",
                    description: "Install network points from all the work stations to the server room where the network cabinet will be.",
                    dueDate: new Date(2023, 11, 13),
                    subTasks: [
                        {
                            type: "Task",
                            data: {
                                name: "Create Network Diagram",
                                description: "Design the network layout for the office.",
                                dueDate: new Date(2023, 11, 3),
                                estimatedCost: 2000,
                            }
                        },
                        {
                            type: "Task",
                            data: {
                                name: "Procure Network Equipment",
                                description: "Procure routers, switches, and cables and have it delivered to the IT workshop.",
                                dueDate: new Date(2023, 11, 6),
                                estimatedCost: 25000
                            }
                        },
                        {
                            type: "Project",
                            data: {
                                name: "Install Network Points",
                                description: "Install network points from the server room to all the required work stations.",
                                dueDate: new Date(2023, 11, 13),
                                subTasks: [
                                    {
                                        type: 'Task',
                                        data: {
                                            name: "Pull wires",
                                            description: "Pull wires from the server room to all the required work stations.",
                                            dueDate: new Date(2023, 11, 11),
                                            estimatedCost: 2000
                                        }
                                    },
                                    {
                                        type: 'Task',
                                        data: {
                                            name: "Terminate network points",
                                            description: "Terminate each network point at the client and server room side.",
                                            dueDate: new Date(2023, 11, 13),
                                            estimatedCost: 1000
                                        }
                                    },
                                ],
                            }
                        },
                    ]
                },

            },
            {
                type: "Project",
                data:{ 
                    name: "Install IT infrastructure",
                    description: "The client's office needs workstation computers and phones for each employee.",
                    dueDate: new Date(2023, 11, 20),
                    subTasks: [
                        {
                            type: "Task",
                            data: {
                                name: "Procure workstation equipment",
                                description: "Procure the required computers and phones and have it delivered to the IT workshop.",
                                dueDate: new Date(2023, 11, 8),
                                estimatedCost: 50000,                                
                            }
                        },
                        {
                            type: "Task",
                            data: {
                                name: "Configure workstation equipment",
                                description: "Configure the procured computers and phones according to the requirements.",
                                dueDate: new Date(2023, 11, 13),
                                estimatedCost: 2000,
                            },
                        },
                        {
                            type: "Task",
                            data: {
                                name: "Install workstation equipment",
                                description: "Install all the computers and phones at the client office.",
                                dueDate: new Date(2023, 11, 20),
                                estimatedCost: 2000,
                            },
                        },
        
                    ]
                }
            },
        ]
    },    
}
