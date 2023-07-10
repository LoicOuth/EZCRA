import { Guid } from "guid-typescript";

export interface INotebookDetail {
    sectionsUrl: string,
    sectionGroupsUrl: string,
    name: string,
    id: Guid
}