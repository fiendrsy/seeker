import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { ChangePasswordDto } from "../auth/dto";
import { PASSWORDS_DO_NOT_MATCH } from "./constants";

@Injectable()
export class PasswordChangeValidationPipe implements PipeTransform {
  transform(value: ChangePasswordDto, metadata: ArgumentMetadata) {
    if (metadata.type !== "body") return value;
    if (value.newPassword !== value.verifiedNewPassword) {
      throw new HttpException(PASSWORDS_DO_NOT_MATCH, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
