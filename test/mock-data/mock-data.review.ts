import { Types } from "mongoose";

export const mockProductId = new Types.ObjectId().toHexString();
export const mockReviewDto = {
	productId: mockProductId,
	rating: 3,
	login: "tester",
	text: "test text",
};
