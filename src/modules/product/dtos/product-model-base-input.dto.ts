export abstract class ProductModelBaseInputDto {
  public id: string;
  public name: string;
  public amount: number;
  public value: number;
  public isActive: boolean;
  public createdAt: Date;
  public createdBy: string;
}
