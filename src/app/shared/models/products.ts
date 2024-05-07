import { Guid } from "guid-typescript";

export interface Products{
  id: Guid;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productType: string;
  productBranch: string;
    
}