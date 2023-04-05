import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { forwardRef, Module } from "@nestjs/common";
import { User, UserSchema } from "./schemas/users.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		forwardRef(() => AuthModule),
		MongooseModule.forFeatureAsync([
			{
				name: User.name,
				useFactory: async () => UserSchema,
			},
		]),
		JwtModule,
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService, MongooseModule],
})
export class UsersModule {}
