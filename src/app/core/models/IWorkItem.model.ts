export interface IWorkItem {
    id: number,
    rev: number,
    url: string,
    fields: Fields,
    relations: Array<Relation>
}

interface Fields {
    'System.State': string,
    'System.Title': string,
    'System.Description': string,
    'System.WorkItemType': string,
    'Microsoft.VSTS.Common.StateChangeDate': string,

}

interface Relation {
    rel: string,
    url: string
}