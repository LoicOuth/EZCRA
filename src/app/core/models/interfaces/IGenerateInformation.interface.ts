import { IIteration } from "../IIteration.model"
import { IOrganization } from "../IOrganization.model"
import { IProject } from "../IProject.model"

export interface IGenerateInformation {
    organization: IOrganization | null,
    project: IProject | null,
    iteration: IIteration | null,
    isPersonalizedDate: boolean,
    dateRange: Array<Date>
}