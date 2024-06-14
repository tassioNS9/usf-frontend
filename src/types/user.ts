export interface User {
    id?: number;
    id_unit: number;
    unit?: Unit;
    name: string;
    cpf: string;
    password: string;
    confirmPassword?: string;
    office: string;
    role?: Role
}

export interface UserRegister {
    id?: number;
    id_unit: number;
    name: string;
    cpf: string;
    password: string;
    confirmPassword: string;
    office: string;
    role?: Role
}


export interface Unit {
    id?: number;
    name: string;
    tel: string;
    city: string,
    address: string;
    state: string
    neighborhood: string
}


export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export enum TypeIndicators {
    BOOL = 'BOOL',
    NUMERIC = 'NUMERIC'
}

export interface Indicator {
    id?: number;
    description: string;
    evaluations?:Evaluation
    objective: number;
    dimension: string;
    type_Indicator: string
    sources: string
}

export interface Evaluation {
    id?: number;
    id_indicator: number;
    id_unit: number;
    evaluator: string;
    date_evaluation: Date;
    valueNum: number | null;
    valueBol: boolean | null;
}

