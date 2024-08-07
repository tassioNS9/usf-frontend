export enum TypeIndicators {
    BOOL = 'BOOL',
    NUMERIC = 'NUMERIC'
}

export interface Indicator {
    id?: number;
    description: string;
    id_objective: number;
    type_Indicator: string
    sources: string
}

export interface IndicatorList {
    id?: number;
    description: string;
    evaluations:[];
    dimension: string;
    type_Indicator: string
    sources: string
}
