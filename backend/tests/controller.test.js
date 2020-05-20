const request = require("supertest");

describe("when all is well", () => {
  let server;

  beforeEach(async () => {
    jest.resetModules();
  });

  const data = {
    stock: [
      {
        id: "1",
        name: "panadol",
        type: "tablet",
        units_available: 34,
      },
    ],
  };

  const medicine = {
    id: "1",
    name: "panadol",
    type: "tablet",
    units_available: 34,
  };

  jest.mock("axios", () => {
    return {
      create: jest.fn(() => {
        return {
          get: jest.fn().mockImplementation(() => {
            return {
              data: {
                stock: [
                  {
                    id: "1",
                    name: "panadol",
                    type: "tablet",
                    units_available: 34,
                  },
                ],
              },
            };
          }),
        };
      }),
    };
  });

  beforeEach(async () => {
    jest.resetModules();
  });

  describe("GET /stock", () => {
    it("should return a list of medicine in stock", async () => {
      server = require("../index");

      const res = await request(server).get("/stock");

      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject(data);
    });
  });

  describe("GET /stock/:id", () => {
    it("should return the details of a single medicine", async () => {
      server = require("../index");

      const res = await request(server).get("/stock/1");

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(medicine);
    });
  });
});

describe("when there is an error", () => {
  let server;

  beforeEach(async () => {
    jest.resetModules();
  });

  describe("GET /stock", () => {
    it("should error gracefully", async () => {
      jest.mock("axios", () => {
        return {
          create: jest.fn(() => {
            return {
              get: jest.fn().mockImplementationOnce(() => {
                throw new Error("Error");
              }),
            };
          }),
        };
      });
      server = require("../index");

      const res = await request(server).get("/stock");
      expect(res.status).toBe(500);
      expect(res.body.data).toEqual({});
    });
  });

  describe("GET /stock/:id", () => {
    it("should error gracefully", async () => {
      jest.mock("axios", () => {
        return {
          create: jest.fn(() => {
            return {
              get: jest.fn().mockImplementationOnce(() => {
                throw new Error();
              }),
            };
          }),
        };
      });
      server = require("../index");

      const res = await request(server).get("/stock/1");
      expect(res.status).toBe(500);
      expect(res.body.data).toEqual({});
    });
  });
});
