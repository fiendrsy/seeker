import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { ReviewModule } from "./review/review.module";
import { RolesModule } from "./roles/roles.module";
import { TopPageModule } from "./top-page/top-page.module";
import { UsersModule } from "./users/users.module";
import { getMongoDbUri } from "./config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({ useFactory: getMongoDbUri }),
		UsersModule,
		AuthModule,
		ReviewModule,
		TopPageModule,
		ProductModule,
		RolesModule,
	],
})
export class AppModule {}
