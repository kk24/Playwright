import re
from playwright.sync_api import sync_playwright, expect

def test_positive_flow(page):
    print("\n=== Running POSITIVE test ===")

    page.goto("https://playwright.dev/")

    # Title check
    expect(page).to_have_title(re.compile("Playwright"))
    print("✔ Title is correct")

    # Navigate to Getting started
    page.get_by_role("link", name="Getting started").click()
    expect(page).to_have_url(re.compile("/docs/intro"))
    print("✔ URL is correct")

    # Heading check
    expect(page.get_by_role("heading", name="Installation")).to_be_visible()
    print("✔ Heading is correct")

    # Go back
    page.go_back()
    expect(page).to_have_url("https://playwright.dev/")
    print("✔ Navigation back is correct")


def test_negative_flow(page):
    print("\n=== Running NEGATIVE test (expected to FAIL) ===")

    page.goto("https://playwright.dev/")

    # This heading does NOT exist on the homepage → will fail
    expect(page.get_by_role("heading", name="This heading does NOT exist")).to_be_visible()
    print("❌ You should never see this message because the test above must fail")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Run positive test
        test_positive_flow(page)

        # Run negative test (will raise an AssertionError)
        try:
            test_negative_flow(page)
        except Exception as e:
            print("\n❗ NEGATIVE TEST FAILED AS EXPECTED")
            print(f"Playwright error message:\n{e}\n")

        browser.close()


if __name__ == "__main__":
    main()
