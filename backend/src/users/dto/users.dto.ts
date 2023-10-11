export class CreateUserDto {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  country: string;
}

export class UpdateUserDto {
  firstName: string;
  email: string;
  country: string;
}
