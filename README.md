Playwright Test Automation Framework

This repository provides a robust test automation framework using Playwright and TypeScript. It supports both UI (Web) and API testing, built with scalability and maintainability in mind, following Clean Code and SOLID principles.

Features

Page Object Model (POM): UI tests use the POM pattern for clean separation of concerns.

API Test Abstraction: API tests use a similar pattern, with endpoint classes abstracting request/response logic.

Separate Locators: Element locators are stored in dedicated files (locators/) to improve maintainability.

Data-Driven: Test data is externalized in the data/ directory, with a 1:1 mapping to test files.

Robust Interactions: A BasePage provides safe interaction methods (safeClick, safeFill) that include waits for element interactability.

Environment Configuration: Uses .env files to manage environment-specific variables (URLs, credentials).

CI/CD Ready: Includes a pre-configured GitHub Actions workflow (.github/workflows/playwright-tests.yml).

Linting & Formatting: Pre-configured with ESLint and Prettier to ensure code consistency.

Built-in Retries: Configured in playwright.config.ts to handle flaky tests, especially on CI.

Fixtures: Uses Playwright fixtures for efficient setup and teardown of pages and contexts.

File Structure

.
├── .github/
│   └── workflows/
│       └── playwright-tests.yml  # GitHub Actions CI workflow
├── api/
│   └── UserEndpoints.ts          # API class for /users endpoint
├── data/
│   ├── login.data.ts             # Test data for login.spec.ts
│   └── users.data.ts             # Test data for users.spec.ts
├── locators/
│   ├── inventoryLocators.ts      # Locators for Inventory page
│   └── loginLocators.ts          # Locators for Login page
├── pages/
│   ├── InventoryPage.ts          # Page Object for Inventory page
│   └── LoginPage.ts              # Page Object for Login page
├── tests/
│   ├── api/
│   │   └── users.spec.ts         # API tests for /users
│   ├── fixtures/
│   │   └── pageFixtures.ts       # Fixtures for Page Objects
│   └── ui/
│       └── login.spec.ts         # UI tests for login functionality
├── utils/
│   ├── BaseAPI.ts                # Base class for API requests
│   ├── BasePage.ts               # Base class for Page Objects
│   └── Logger.ts                 # Simple logging utility
├── .env.example                  # Example environment variables
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore file
├── .prettierrc                   # Prettier configuration
├── package.json                  # Project dependencies and scripts
├── playwright.config.ts          # Playwright configuration
└── tsconfig.json                 # TypeScript configuration


Installation & Setup

Clone the repository:

git clone <repository-url>
cd <repository-name>


Install dependencies:

npm install


Install Playwright browsers:

npx playwright install --with-deps


Create an environment file:

Copy the example file: cp .env.example .env

Edit .env and add your specific credentials and URLs.

Running Tests

Run all tests

npx playwright test


Run only UI tests

npx playwright test --grep @ui


Run only API tests

npx playwright test --grep @api


Run in UI Mode

For a time-traveling debug experience:

npx playwright test --ui


View Test Report

After a run, view the HTML report:

npx playwright show-report


AI-Powered Enhancements

This framework is a strong foundation. To further leverage AI, consider these additions:

AI for Pull Request Reviews:

Integrate services like CodeRabbit or GitHub Copilot for PRs. These tools can automatically review pull requests, summarize changes, and suggest improvements based on your codebase's conventions.

Automated Flaky Test Analysis:

While retries (playwright.config.ts) are the first line of defense, you can create a custom script that:

Parses the test-results.json output after a CI run.

Identifies tests that passed only on retry.

Sends this data (test name, error message, trace) to an LLM API (like Gemini) with a prompt like: "Analyze this test failure. Based on the error and trace, what is the likely cause of flakiness (e.g., race condition, async issue, selector problem)?"

This can post a summary to a Slack channel or GitHub issue, giving you a head-start on debugging.

Visual Regression with AI:

Use a tool like Applitools Eyes (which uses AI for visual comparisons) instead of pixel-perfect toHaveScreenshot. This reduces false positives from minor rendering differences.

Self-Healing Selectors:

Develop a utility that, when a test fails due to Locator.click: Error: strict mode violation, could optionally try to find the element with an AI-driven "fuzzy" locator (e.g., "Find the button labeled 'Login' near the 'Username' field"). This is advanced but a powerful concept for reducing maintenance.