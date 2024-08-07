import { type Unit } from './unit'

export interface User {
    id?: number;
    id_unit: number;
    unit?: Unit;
    name: string;
    cpf: string;
    password: string;
    confirmPassword?: string;
    office: string;
    role: Role
}

export interface UserRegister {
    id?: number;
    id_unit: number | null;
    name: string;
    cpf: string;
    password: string;
    confirmPassword: string;
    office: string;
    role: Role
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    DIRECTOR = 'DIRECTOR'
}

export enum TypeIndicators {
    BOOL = 'BOOL',
    NUMERIC = 'NUMERIC'
}



