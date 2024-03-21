export abstract class ProductBaseOutputDto {
  public readonly id: string;
  public readonly name: string;
  public readonly amount: number;
  public readonly value: number;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly createdBy?: string | null;
  public readonly updatedAt?: Date | null;
  public readonly updatedBy?: string | null;
  public readonly isActiveChangedAt?: Date | null;
  public readonly isActiveChangedBy?: string | null;
}
