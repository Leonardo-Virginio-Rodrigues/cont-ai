import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateDDMMYYYY', async: false })
export class IsDateDDMMYYYYConstraint implements ValidatorConstraintInterface {
  validate(dateStr: string): boolean {
    if (!dateStr) return false;

    const regex = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(dateStr)) return false;

    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Date (${args.value}) must be in the format dd/mm/yyyy and be a valid date.`;
  }
}
export function IsDateDDMMYYYY(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateDDMMYYYY',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsDateDDMMYYYYConstraint,
    });
  };
}

export function parseDateDDMMYYYY(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}
