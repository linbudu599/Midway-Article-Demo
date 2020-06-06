import { app, mm } from "midway-mock/bootstrap";

describe("test/controller/home.test.ts", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  beforeAll(() => {
    let appInstance = mm.app();
    return appInstance.ready();
  });

  it("should get untest test config", () => {
    expect(app.config.a).toBe(1);
  });

  // it("should GET /", () => {
  //   return app
  //     .httpRequest()
  //     .get("/")
  //     .set("Accept", "text/plain; charset=utf-8")
  //     .expect("Content-Type", "text/plain; charset=utf-8")
  //     .expect(200)
  //     .expect("Welcome to midwayjs!");
  // });
});
