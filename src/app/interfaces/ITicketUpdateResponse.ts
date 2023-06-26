export interface ITicketUpdateResponse{
    id: string,
    name?: string,
    email?: string,
    telephone?: string,
    annotation1?: string, 
    annotation2?: string,
    creationDate?: Date,
    approved?: boolean,
}