export interface Task {
    id?:                string;
    name_task:          string;
    deadline:           string;
    date_completed?:    string;
    state:              boolean;
    associated_persons: AssociatedPerson[];
}


export interface RequestTask {
    message: string;
    data:    DataTask[];
}

export interface DataTask {
    id:                 string;
    name_task:          string;
    deadline:           string;
    state:              boolean;
    associated_persons: AssociatedPerson[];
}



export interface AssociatedPerson {
    full_name: string;
    age:       number;
    skills:    string[];
}
