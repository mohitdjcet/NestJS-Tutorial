import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    return value.trim();
  }
}
