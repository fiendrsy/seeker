import { Types } from "mongoose";
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { INCORRECT_ID_FORMAT } from "./constants";

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== "param") return value;
    if (!Types.ObjectId.isValid(value)) {
      throw new HttpException(INCORRECT_ID_FORMAT, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
