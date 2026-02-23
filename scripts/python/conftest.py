import pytest

# 
#   Generic browser configuration for all tests. You can override this fixture in specific test files if needed. 
#

@pytest.fixture(scope="session")
def browser_type_launch_args():
    return {
        "headless": True,   # Set to False if you want to see the browser
        "slow_mo": 0
    }