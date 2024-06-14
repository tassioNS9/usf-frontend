export interface Evaluation {
    id?: number;
    id_indicator: number;
    id_unit: number;
    evaluator: string;
    indicator:Indicator
    date_evaluation: Date;
    valueNum: number | null;
    valueBol: boolean | null;
}

export interface Indicator {
    id?: number;
    description: string;
    objective: number;
    dimension: string;
    type_Indicator: string
    sources: string
}