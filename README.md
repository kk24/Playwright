# Playwright + TypeScript — Test Automation Portfolio

A collection of Playwright + TypeScript capstone projects showcasing 
E2E UI, hybrid API+UI, and pure API test automation skills.

---

## 🛠 Tech Stack

- Playwright + TypeScript
- BDD Gherkin (Capstone 2)
- GitHub Actions (CI/CD)
- Allure Reporter (GitHub Pages)
- GitHub Secrets & Variables (Environment Management)

---

## 📁 Projects

---

### Capstone Project 1 — Parking Cost Calculator

**Site:** https://www.shino.de  
**Type:** UI Automation  
**Focus:** Foundational Playwright skills

My first Playwright project — focused on getting familiar with the 
framework fundamentals.

**Key implementations:**
- Page Object Model (POM)
- Custom fixtures via `index.ts`
- Hooks (`beforeAll`, `afterAll`, `beforeEach`)
- Basic UI assertions

---

### Capstone Project 2 — Restful Booker E2E

**Site:** https://automationintesting.online  
**Type:** E2E UI + Hybrid API+UI Automation  
**Focus:** Advanced Playwright + BDD

A comprehensive E2E test suite for a BnB booking platform covering 
guest journeys, admin workflows and hybrid API+UI scenarios.

**Key implementations:**
- Page Object Model (POM) with barrel file imports
- Custom fixtures via `index.ts`
- BDD Gherkin scenarios with Scenario Outlines
- Data-driven testing via JSON files
- Hybrid API+UI testing:
  - `page.route()` for network interception & mocking
  - `request` fixture for API state setup
- Negative scenario coverage with field-level validation
- HTML & JUnit reporters

---

### Capstone Project 3 — GoRest API Suite

**Site:** https://gorest.co.in  
**Type:** Pure API Automation  
**Focus:** API testing, CI/CD, Live Reporting

A pure API test automation suite replicating Postman-style workflows 
entirely in code — covering full CRUD operations across Users, Posts 
and Todos resources.

**Key implementations:**
- API Client pattern — POM equivalent for API testing
- Full CRUD — GET, POST, PUT, PATCH & DELETE
- Dynamic request chaining — POST response ID fed into subsequent requests
- Random ID selection from GET all responses — no hardcoded IDs
- Separate JSON test data per scenario — Postman collection style
- Generic assertions adapting to any JSON payload
- Multi-environment support — UAT & PREPROD via `.env` files
- Sequential test execution via `test.describe.serial`
- CI/CD via GitHub Actions
- Allure report published live via GitHub Pages

**Live Test Report:** [(https://kk24.github.io/Playwright/)]  
**GitHub Actions:** [https://github.com/kk24/Playwright/actions]

---

## 🚀 Running the Projects

### Prerequisites
```bash
npm install
npx playwright install
```

### Run Capstone 1
```bash
npx playwright test --project=CapstoneProject1-ParkingCalculator
```

### Run Capstone 2
```bash
npx playwright test --project=CapstoneProject2-RestfulBooker
```

### Run Capstone 3
```bash
# UAT
ENV=uat npx playwright test scripts/CapstoneProjects/GoRestAPI/users.spec.ts

# PREPROD
ENV=preprod npx playwright test scripts/CapstoneProjects/GoRestAPI/users.spec.ts
```

---

## 📊 Test Reports

| Project | Reporter |
|---|---|
| Capstone 1 | HTML + JUnit |
| Capstone 2 | HTML + JUnit |
| Capstone 3 | HTML + JUnit + Allure (GitHub Pages) |

---

## 👤 Author

**Koustubh.K**  
Senior Test Engineer \| 20+ Years Exp  
[https://www.linkedin.com/in/koustubhk/]  
[https://github.com/kk24]