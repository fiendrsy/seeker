import { MongooseModuleFactoryOptions } from "@nestjs/mongoose";
export const getMongoDbUri = async (): Promise<MongooseModuleFactoryOptions> => {
	return {
		uri: process.env.MONGO_DB_URI,
	};
};
