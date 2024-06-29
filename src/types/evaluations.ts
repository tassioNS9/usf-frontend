import { type Indicator } from './indicators';

export interface Evaluation {
    id?: number;
    id_indicator: number;
    id_unit: number;
    indicator?:Indicator;
    evaluator: string;
    date_evaluation: Date;
    valueNum: number | null;
    valueBol: boolean | null;
}

