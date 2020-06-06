module.exports = {
  preset: "ts-jest",
  testEnvironment: "midway-bin/jest/env.js",
  setupFilesAfterEnv: ["./jest.setup.js"],
};
