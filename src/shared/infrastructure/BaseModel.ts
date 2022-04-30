import { Model } from 'objection';

abstract class BaseModel extends Model {
  public id?: number;
  public createdAt?: string;
  public updatedAt?: string;

  static onConflictColumn?: string | string[];

  $beforeInsert(): void {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export { BaseModel };
