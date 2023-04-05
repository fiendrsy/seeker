import * as request from "supertest";
import { Types } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { NestApplication } from "@nestjs/core";
import { HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { RolesGuard } from "../src/guards";
import {
	mockDataGuards,
	mockTopPageDto,
	mockTopPageFindDto,
} from "./mock-data";

describe("TopPageController (e2e)", () => {
	let app: NestApplication;
	let topPageId: Types.ObjectId;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideGuard(RolesGuard)
			.useValue(mockDataGuards)
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		app.close();
	});

	it("create top-page, (POST)", () => {
		return request(app.getHttpServer())
			.post("/top-page/create")
			.send(mockTopPageDto)
			.expect(HttpStatus.CREATED)
			.expect(({ body }) => {
				expect(body._id).toBeDefined();
				topPageId = body._id;
			});
	});

	it("get top-page by top page id, (GET)", () => {
		return request(app.getHttpServer())
			.get(`/top-page/${topPageId}`)
			.expect(HttpStatus.OK)
			.expect(({ body }) => {
				expect(body._id).toEqual(topPageId);
			});
	});

	it("upadate top-page, (PATCH)", () => {
		return request(app.getHttpServer())
			.patch(`/top-page/${topPageId}`)
			.send({
				...mockTopPageDto,
				menuCategory: "Book",
			})
			.expect(HttpStatus.OK)
			.expect(({ body }) => {
				expect(body._id).toEqual(topPageId);
			});
	});

	it("find top-page by category, (POST)", () => {
		return request(app.getHttpServer())
			.post("/top-page/find-by-category")
			.send(mockTopPageFindDto)
			.expect(HttpStatus.OK)
			.expect(({ body }) => {
				expect(body._id).toEqual(topPageId);
			});
	});

	it("search string, (GET)", () => {
		return request(app.getHttpServer())
			.get("/top-page/search-string/book")
			.expect(HttpStatus.OK)
			.expect(({ body }) => {
				expect(body[0]._id).toEqual(topPageId);
			});
	});

	it("delete top-page by id, (DELETE)", () => {
		return request(app.getHttpServer())
			.delete(`/top-page/${topPageId}`)
			.expect(HttpStatus.OK)
			.expect(({ body }) => {
				expect(body._id).toEqual(topPageId);
			});
	});
});
