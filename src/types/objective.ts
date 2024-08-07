import { type Guideline } from "./guideline";


export interface Objective {
    id?: number;
    numeration: number;
    id_guideline:number;
    description: string;
    guideline? : Guideline
}
