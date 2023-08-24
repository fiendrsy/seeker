import { MongooseModuleFactoryOptions } from "@nestjs/mongoose";

export const GET_MONGO_URI = async (): Promise<MongooseModuleFactoryOptions> => {
	return {
		uri: process.env.MONGO_DB_URI,
	};
};
