export interface IResponseWorkItem {
    queryType: string,
    queryResultType: string,
    asOf: string,
    columns: Array<string>,
    workItems: Array<WorkItemId>
}

interface WorkItemId {
    id: number,
    url: string
}