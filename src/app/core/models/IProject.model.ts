import { Guid } from "guid-typescript";

export interface IProject {
    id: Guid,
    name: string,
    description: string,
    url: string,
    state: string,
    revision: number,
    visibility: string,
    lastUpdateTime: Date
}