export abstract class ProductModelBaseOutputDto {
  public readonly id: string;
  public readonly name: string;
  public readonly amount: number;
  public readonly value: number;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly createdBy: string;
}
