export enum TypeIndicators {
    BOOL = 'BOOL',
    NUMERIC = 'NUMERIC'
}

export interface Indicator {
    id?: number;
    description: string;
    objective: number;
    dimension: string;
    type_Indicator: string
    sources: string
}

export interface IndicatorList {
    id?: number;
    description: string;
    evaluations:[];
    objective: number;
    dimension: string;
    type_Indicator: string
    sources: string
}
