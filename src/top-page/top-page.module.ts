import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { TopPage, TopPageSchema } from "./schemas";
import { TopPageController } from "./top-page.controller";
import { TopPageService } from "./top-page.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TopPage.name,
        useFactory: async () => TopPageSchema,
      },
    ]),
    JwtModule,
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
