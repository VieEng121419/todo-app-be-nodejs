export interface BaseType {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoType extends BaseType {
  title: string;
  completed?: boolean;
}
