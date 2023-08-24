import { Types } from "mongoose";
import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { JwtAccessTokenGuard, RolesGuard } from "../src/guards";
import { mockDataGuards, mockProductId, mockReviewDto } from "./mock-data";

describe("ReviewController (e2e)", () => {
  let app: INestApplication;
  let reviewId: Types.ObjectId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(RolesGuard)
      .useValue(mockDataGuards)
      .overrideGuard(JwtAccessTokenGuard)
      .useValue(mockDataGuards)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it("create review, (POST)", () => {
    return request(app.getHttpServer())
      .post("/review/create")
      .send(mockReviewDto)
      .expect(201)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        reviewId = body._id;
      });
  });

  it("find all by product id, (GET)", () => {
    return request(app.getHttpServer())
      .get(`/review/find-all/${mockProductId}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        expect(body[0]._id).toEqual(reviewId);
      });
  });

  it("delete review, (DELETE)", () => {
    return request(app.getHttpServer())
      .delete(`/review/${reviewId}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body._id).toEqual(reviewId);
      });
  });

  it("create review, (POST)", () => {
    return request(app.getHttpServer())
      .post("/review/create")
      .send(mockReviewDto)
      .expect(201)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
      });
  });

  it("delete all review by product id, (DELETE)", () => {
    return request(app.getHttpServer())
      .delete(`/review/remove-all/${mockProductId}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.acknowledged).toEqual(true);
      });
  });
});
