import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AdvantagesDto } from "../dto";

export type TopPageDocumet = TopPage & Document;

@Schema()
export class TopPage {
  @Prop({ required: true })
  menuCategory: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: () => [AdvantagesDto], required: true })
  advantages: AdvantagesDto[];

  @Prop({ required: true })
  seoText: string;

  @Prop({ type: () => [String], required: true })
  tagsTitle: string[];

  @Prop({ type: () => [String], required: true })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
TopPageSchema.index({ "$**": "text" });
