import { Types } from "mongoose";
import * as request from "supertest";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { mockDataGuards, mockProductFindDto, mockProductDto, mockReviewDto } from "./mock-data";
import { JwtAccessTokenGuard, RolesGuard } from "../src/guards";

describe("ProductController (e2e)", () => {
  let app: INestApplication;
  let productId: Types.ObjectId;
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

  it("create product, (POST)", () => {
    return request(app.getHttpServer())
      .post("/product/create")
      .send(mockProductDto)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        productId = body._id;
      });
  });

  it("get product by id, (GET)", () => {
    return request(app.getHttpServer())
      .get(`/product/${productId}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body._id).toEqual(productId);
      });
  });

  it("create review by product id, (POST)", () => {
    return request(app.getHttpServer())
      .post("/review/create")
      .send({
        ...mockReviewDto,
        productId,
      })
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        reviewId = body._id;
      });
  });

  it("find product by category, (POST)", () => {
    return request(app.getHttpServer())
      .post("/product/find-product")
      .send(mockProductFindDto)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body[0]._id).toEqual(productId);
        expect(body[0].reviews[0]._id).toEqual(reviewId);
      });
  });

  it("upadate product, (PATCH)", () => {
    return request(app.getHttpServer())
      .patch(`/product/${productId}`)
      .send(mockProductDto)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body._id).toEqual(productId);
      });
  });

  it("delete product, (DELETE)", () => {
    return request(app.getHttpServer())
      .delete(`/product/${productId}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body._id).toEqual(productId);
      });
  });
});
