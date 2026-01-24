# Jest Testing & GitHub Actions CI/CD - Beginner's Guide

[![CI](https://github.com/ParasJagdale/JS_Project-JEST-/actions/workflows/ci.yml/badge.svg)](https://github.com/ParasJagdale/JS_Project-JEST-/actions/workflows/ci.yml)

A beginner-friendly project demonstrating **automated testing with Jest** and **Continuous Integration with GitHub Actions**. This repository serves as a practical introduction to modern JavaScript testing and DevOps practices.

## 📚 What You'll Learn

- ✅ Writing unit tests with Jest
- 🔄 Setting up Continuous Integration (CI) with GitHub Actions
- 🚀 Automating test execution on every code push
- 📦 Structuring a testable Node.js project
- 🌐 Integrating tested code into an Express.js server

## 🎯 Project Overview

This project implements a simple `sum` function and demonstrates how to:

1. Write comprehensive unit tests
2. Run tests locally with Jest
3. Automatically run tests on GitHub whenever code is pushed

## 📁 Project Structure

```
jest-testing-project/
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI configuration
├── sum.js                   # The function we're testing
├── sum.test.js              # Jest test suite
├── server.js                # Express server using the sum function
├── package.json             # Project dependencies
└── README.md                # This file
```

## 🔧 Files Explained

### `sum.js` - The Code We're Testing

```javascript
const sum = (a, b) => a + b;
module.exports = sum;
```

A simple utility function that adds two numbers. This represents the "production code" that we want to test.

### `sum.test.js` - The Jest Test Suite

```javascript
const sum = require("./sum");

describe("Sum Function Tests", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("adds -1 + -1 to equal -2", () => {
    expect(sum(-1, -1)).toBe(-2);
  });

  test("adds 0 + 0 to equal 0", () => {
    expect(sum(0, 0)).toBe(0);
  });

  test("adds 100 + 200 to equal 300", () => {
    expect(sum(100, 200)).toBe(300);
  });
});
```

**What's happening here?**

- `describe()`: Groups related tests together
- `test()`: Defines individual test cases
- `expect()`: Makes assertions about what the code should do
- `.toBe()`: Matcher that checks for exact equality

### `server.js` - Express Server

```javascript
const express = require("express");
const sum = require("./sum");

const app = express();
const PORT = 8000;

app.get("/home", (req, res) => {
  res.send("Welcome to the Jest Testing Server!");
});

app.get("/getsum/:a/:b", (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  const result = sum(a, b);
  res.json({ a, b, sum: result });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

This shows how the tested `sum` function integrates into a real application.

### `.github/workflows/ci.yml` - GitHub Actions CI Pipeline

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "22.x"

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

**What this does:**

- **Triggers**: Runs automatically on every push to `main` or when a pull request is created
- **Environment**: Sets up Ubuntu with Node.js 22.x
- **Steps**:
  1. Checks out your code
  2. Installs Node.js
  3. Installs dependencies
  4. Runs your Jest tests

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.x or higher)
- npm (comes with Node.js)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running Tests Locally

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage
```

### Running the Server

```bash
node server.js
```

Visit:

- `http://localhost:8000/home` - Welcome page
- `http://localhost:8000/getsum/5/10` - Returns `{"a":5,"b":10,"sum":15}`

## 🔄 How Continuous Integration Works

### The CI/CD Flow

```
Developer writes code
        ↓
Commits and pushes to GitHub
        ↓
GitHub Actions detects the push
        ↓
CI workflow starts automatically
        ↓
Sets up Node.js environment
        ↓
Installs dependencies
        ↓
Runs Jest tests
        ↓
✅ Tests pass → Build succeeds (green checkmark)
❌ Tests fail → Build fails (red X)
```

### Why This Matters

**Without CI:**

- Developers might forget to run tests
- Tests might pass on one machine but fail on another
- Broken code could be merged into the main branch

**With CI:**

- Every code change is automatically tested
- Consistency across all environments
- Catches bugs before they reach production
- Team collaboration is safer

## 📊 Understanding Test Results

When you run `npm test`, you'll see output like this:

```
PASS  ./sum.test.js
  Sum Function Tests
    ✓ adds 1 + 2 to equal 3 (2 ms)
    ✓ adds -1 + -1 to equal -2 (1 ms)
    ✓ adds 0 + 0 to equal 0
    ✓ adds 100 + 200 to equal 300 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.892 s
```

- **Green checkmarks (✓)**: Tests passed
- **Red X**: Tests failed
- **Test Suites**: Number of test files
- **Tests**: Total number of individual tests

## 🎓 Learning Resources

### Jest Basics

- **Matchers**: `.toBe()`, `.toEqual()`, `.toBeTruthy()`, etc.
- **Async Testing**: Testing promises and async/await
- **Mocking**: Creating mock functions and modules
- **Coverage**: Understanding code coverage reports

### GitHub Actions Concepts

- **Workflows**: Automated processes
- **Jobs**: Groups of steps that run on the same runner
- **Steps**: Individual tasks within a job
- **Triggers**: Events that start workflows (push, pull_request, schedule, etc.)

## 🔨 Try These Exercises

1. **Add More Tests**
   - Test with decimal numbers
   - Test with very large numbers
   - Add a test that should fail, then fix it

2. **Extend the Function**
   - Create `multiply.js` and `multiply.test.js`
   - Add a `/multiply/:a/:b` endpoint to the server
   - Watch GitHub Actions run your new tests

3. **Enhance the CI Pipeline**
   - Add a linting step (ESLint)
   - Add code coverage requirements
   - Add multiple Node.js versions to test against

4. **Break Something (Safely!)**
   - Change the sum function to return `a - b`
   - Push the code and watch the CI fail
   - Fix it and see the CI pass again

## 📈 Next Steps

After mastering this project, explore:

- **Testing Frameworks**: Mocha, Vitest, Jasmine
- **E2E Testing**: Cypress, Playwright
- **CI/CD Platforms**: GitLab CI, CircleCI, Travis CI
- **Deployment**: Automatically deploy passing builds to Vercel, Netlify, or Heroku

## 🤝 Contributing

This is a learning project! Feel free to:

- Open issues with questions
- Submit pull requests with improvements
- Fork and experiment
- Share with other learners

## 📝 License

MIT License - feel free to use this project for learning and teaching.

## 💡 Key Takeaways

- ✅ **Testing saves time**: Catch bugs early before they reach users
- 🔄 **Automation is powerful**: Let computers do repetitive tasks
- 🚀 **CI/CD is industry standard**: Professional teams use these practices
- 📚 **Start small**: This simple example contains patterns used in large applications

---

**Happy Testing! 🎉**

If you found this helpful, give it a ⭐ and share it with others learning web development!
