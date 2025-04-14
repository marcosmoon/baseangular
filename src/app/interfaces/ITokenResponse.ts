import { IBaseCatalog } from "./IBaseCatalog";

export interface ITokenResponse{
    token: string,
    refreshToken: string,
    userData: IUserData
}

export interface IUserData{
    id: string,
    name: string,
    email: string,
    idDepartment: string,
    idSubDepartment: string,
    rol: IRol
}

export interface IRol{
    name: string;
    id: string
}