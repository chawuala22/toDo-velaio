export interface Task {
    name_task:          string;
    deadline:           Date;
    state:              boolean;
    associated_persons: AssociatedPerson[];
}

export interface AssociatedPerson {
    full_name: string;
    age:       number;
    skills:    string[];
}


