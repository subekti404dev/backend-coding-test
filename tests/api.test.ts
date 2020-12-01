"use strict";

import request from "supertest";
import { serializedDB } from "../src/db/serialized-db";
import myApp from "../src/app";
let app: any;

describe("API tests", function () {
 before((done: any) => {
  serializedDB().then((db: any) => {
   app = myApp(db);
   done();
  });
 });

 describe("GET /health", function () {
  it("should return health", (done: any) => {
   request(app).get("/health").expect("Content-Type", /text/).expect(200, done);
  });
 });
});
