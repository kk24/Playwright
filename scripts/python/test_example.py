import pytest

@pytest.fixture
def multiple_contexts(browser):
    # Create two contexts (pytest will clean them up automatically)
    context1 = browser.new_context()
    context2 = browser.new_context()

    # Create multiple pages inside each context
    pages = [
        context1.new_page(),
        context1.new_page(),
        context2.new_page(),
        context2.new_page()
    ]

    return pages


def test_example_with_multiple_contexts(multiple_contexts):
    for page in multiple_contexts:
        page.goto("https://example.com")
        assert page.title() == "Example Domain"
