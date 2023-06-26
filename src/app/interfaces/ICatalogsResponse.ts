import { IBaseCatalog } from "./IBaseCatalog";

export interface ICatalogsResponse{
    rewardType : IBaseCatalog[],
    catSize : IBaseCatalog[],
    //catChain : ICatChain[],
    catReasonRejection : IBaseCatalog[],
    catStakeStatus : IBaseCatalog[],
    catRewardsStatus : IBaseCatalog[],
    catRewardsDelivered : IBaseCatalog[],
    chainGroup: IGroupChain[]
}
export interface IGroupChain{
    name : string,
    chain : ICatChain[]

}

export interface ICatChain {
    id: string,
    name: string,
    idGruopChain:string,
    active: boolean
}