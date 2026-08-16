import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AgePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const age = Number(value)

    if(Number.isNaN(age)){
      throw new BadRequestException(
        "Age Must be a Valid Number"
      );
    }

    if(age<18){
      throw new BadRequestException(
        "Age Must be 18 or above"
      )
    }

    return age;
  }
}
