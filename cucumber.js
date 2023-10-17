const requiredPaths = [
  "support/*.ts",
  "steps/**/*.ts",
  "pages/*.ts",
  "dto/*.ts",
  "test.setup.js",
];

const common = {
  requireModule: ["ts-node/register", "tsconfig-paths/register"],
  require: requiredPaths,
  path: "features/**/*.feature",
  tags: process.env.tags || "@regression",
};

module.exports = {
  default: {
    ...common,
    format: ["progress-bar", "html:test-results/cucumber-json-report.html"],
    retry: 0,
  },
  ci: {
    ...common,
    format: [
      "json:test-results/cucumber-json-report.json",
      "html:test-results/cucumber-junit-report.html",
    ],
    publish: true,
    parallel: 4,
    retry: 1,
  },
};
