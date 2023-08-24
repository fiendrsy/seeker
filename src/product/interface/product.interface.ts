import { ReviewDocument } from "../../review/schemas";
import { ProductDocument } from "../schemas";

interface Reviews {
  reviews: ReviewDocument[];
  reviewsCount: number;
  reviewsAvg: number;
}

export type ProductAggregateModel = (ProductDocument & Reviews)[];
