import { Guid } from "guid-typescript";

export interface IIteration {
    id: Guid,
    name: string,
    path: string,
    attributes: Attribute,
    url: string
}

interface Attribute {
    startDate: string,
    finishDate: string,
    timeFrame: string
}