import { Types } from "mongoose";
import { IsMongoId, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from "class-validator";
import {
  INCORRECT_ID_FORMAT,
  WRONG_COMMENT,
  WRONG_RATING_LENGTH_MAX,
  WRONG_RATING_LENGTH_MIN,
} from "../constants";

export class ReviewDto {
  @IsMongoId({ message: INCORRECT_ID_FORMAT })
  productId: Types.ObjectId;

  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(undefined, 120, {
    message: WRONG_COMMENT,
  })
  text: string;

  @IsNumber()
  @Max(5, { message: WRONG_RATING_LENGTH_MAX })
  @Min(1, { message: WRONG_RATING_LENGTH_MIN })
  rating: number;
}
