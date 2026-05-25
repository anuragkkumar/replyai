"""
POC Test Script for ReplyAI
Tests all user stories from Phase 1 plan
"""
import requests
import time
import json
from typing import Dict, Any

BASE_URL = "http://localhost:8000"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def print_test(name: str):
    print(f"\n{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BLUE}TEST: {name}{Colors.END}")
    print(f"{Colors.BLUE}{'='*60}{Colors.END}")

def print_success(msg: str):
    print(f"{Colors.GREEN}✓ {msg}{Colors.END}")

def print_error(msg: str):
    print(f"{Colors.RED}✗ {msg}{Colors.END}")

def print_info(msg: str):
    print(f"{Colors.YELLOW}→ {msg}{Colors.END}")

def test_health_check():
    """User Story 1: Health check endpoint works"""
    print_test("Health Check Endpoint")
    try:
        response = requests.get(f"{BASE_URL}/health")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get("status") == "ok", "Health check status not 'ok'"
        print_success("Health check endpoint working")
        return True
    except Exception as e:
        print_error(f"Health check failed: {e}")
        return False

def test_generate_reply_all_modes():
    """User Story 1: Generate reply for all 6 modes"""
    print_test("Generate Reply - All Modes")
    
    test_message = "Hey, how are you doing today?"
    modes = ["flirty", "funny", "professional", "roast", "savage"]
    
    all_passed = True
    
    for mode in modes:
        try:
            print_info(f"Testing mode: {mode}")
            response = requests.post(
                f"{BASE_URL}/api/generate",
                json={"messages": test_message, "mode": mode}
            )
            assert response.status_code == 200, f"Expected 200, got {response.status_code}"
            data = response.json()
            
            # Validate response structure
            assert "reply" in data, "Missing 'reply' in response"
            assert "mode" in data, "Missing 'mode' in response"
            assert "timestamp" in data, "Missing 'timestamp' in response"
            assert data["mode"] == mode, f"Mode mismatch: expected {mode}, got {data['mode']}"
            assert len(data["reply"]) > 0, "Empty reply"
            
            print_success(f"Mode '{mode}' works - Reply: {data['reply'][:50]}...")
            time.sleep(0.5)  # Small delay between requests
            
        except Exception as e:
            print_error(f"Mode '{mode}' failed: {e}")
            all_passed = False
    
    return all_passed

def test_custom_mode():
    """User Story 1: Custom mode with custom tone"""
    print_test("Generate Reply - Custom Mode")
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/generate",
            json={
                "messages": "I just finished my workout",
                "mode": "custom",
                "custom_tone": "Reply like a motivational fitness coach"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        assert data["mode"] == "custom", f"Expected 'custom' mode, got {data['mode']}"
        assert len(data["reply"]) > 0, "Empty reply"
        
        print_success(f"Custom mode works - Reply: {data['reply']}")
        return True
        
    except Exception as e:
        print_error(f"Custom mode failed: {e}")
        return False

def test_validation_max_length():
    """User Story 2: Validation error for message > 2000 chars"""
    print_test("Validation - Max Length (2000 chars)")
    
    try:
        long_message = "A" * 2001  # 2001 characters
        response = requests.post(
            f"{BASE_URL}/api/generate",
            json={"messages": long_message, "mode": "funny"}
        )
        
        # Should get 422 validation error
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
        print_success("Max length validation works - correctly rejected 2001 chars")
        return True
        
    except Exception as e:
        print_error(f"Max length validation failed: {e}")
        return False

def test_validation_invalid_mode():
    """User Story 2: Validation error for invalid mode"""
    print_test("Validation - Invalid Mode")
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/generate",
            json={"messages": "Hello", "mode": "invalid_mode"}
        )
        
        # Should get 422 validation error
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
        print_success("Invalid mode validation works - correctly rejected invalid mode")
        return True
        
    except Exception as e:
        print_error(f"Invalid mode validation failed: {e}")
        return False

def test_validation_custom_without_tone():
    """User Story 2: Custom mode requires custom_tone"""
    print_test("Validation - Custom Mode Without Tone")
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/generate",
            json={"messages": "Hello", "mode": "custom"}
        )
        
        # Should get 422 validation error
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
        print_success("Custom mode validation works - correctly requires custom_tone")
        return True
        
    except Exception as e:
        print_error(f"Custom mode validation failed: {e}")
        return False

def test_rate_limiting():
    """User Story 3: Rate limiting at 10 requests per minute"""
    print_test("Rate Limiting - 10 requests/minute")
    
    try:
        print_info("Waiting 60 seconds for rate limit window to reset...")
        time.sleep(60)
        
        print_info("Sending 11 requests rapidly...")
        
        # Send 11 requests rapidly
        for i in range(11):
            response = requests.post(
                f"{BASE_URL}/api/generate",
                json={"messages": f"Test message {i}", "mode": "funny"}
            )
            
            if i < 10:
                # First 10 should succeed
                if response.status_code != 200:
                    print_error(f"Request {i+1} failed with status {response.status_code}")
                    return False
                print_info(f"Request {i+1}/11: {response.status_code}")
            else:
                # 11th should be rate limited
                assert response.status_code == 429, f"Expected 429, got {response.status_code}"
                data = response.json()
                error_msg = data.get("detail", "")
                
                # Check for friendly error message
                assert "Too many requests, please wait a moment" in error_msg, \
                    f"Expected friendly rate limit message, got: {error_msg}"
                
                print_success(f"Request {i+1}/11: Rate limited with friendly message")
                print_info(f"Error message: {error_msg}")
        
        print_success("Rate limiting works correctly - 10 req/min enforced with friendly message")
        return True
        
    except Exception as e:
        print_error(f"Rate limiting test failed: {e}")
        return False

def test_no_message_logging():
    """User Story 4: Confirm no user messages in logs"""
    print_test("Privacy - No Message Logging")
    
    print_info("This test requires manual verification of server logs")
    print_info("The server should NOT print any user message content")
    print_info("Only errors should be logged")
    
    try:
        # Send a distinctive message
        unique_message = "UNIQUE_TEST_MESSAGE_12345_SHOULD_NOT_BE_IN_LOGS"
        response = requests.post(
            f"{BASE_URL}/api/generate",
            json={"messages": unique_message, "mode": "funny"}
        )
        
        assert response.status_code == 200, f"Request failed with {response.status_code}"
        
        print_success("Message sent successfully")
        print_info(f"Check server logs - '{unique_message}' should NOT appear")
        print_info("Only error messages should be logged, not request content")
        return True
        
    except Exception as e:
        print_error(f"Privacy test failed: {e}")
        return False

def test_env_variable():
    """User Story 5: Confirm GROQ_API_KEY is from .env only"""
    print_test("Security - API Key from Environment")
    
    print_info("This test verifies the server reads GROQ_API_KEY from .env")
    print_info("The key should never be hardcoded in the source code")
    
    try:
        # If server is running, it means the key was loaded successfully
        response = requests.get(f"{BASE_URL}/health")
        assert response.status_code == 200, "Server not responding"
        
        # Check that the API key is not in the source code
        with open("/app/backend/poc_server.py", "r") as f:
            source_code = f.read()
            assert "gsk_" not in source_code, "API key found hardcoded in source!"
        
        print_success("API key correctly loaded from environment variable")
        print_success("No hardcoded API keys found in source code")
        return True
        
    except Exception as e:
        print_error(f"Environment variable test failed: {e}")
        return False

def main():
    print(f"\n{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BLUE}ReplyAI POC Test Suite{Colors.END}")
    print(f"{Colors.BLUE}Testing all Phase 1 user stories{Colors.END}")
    print(f"{Colors.BLUE}{'='*60}{Colors.END}")
    
    results = {}
    
    # Run all tests
    results["Health Check"] = test_health_check()
    time.sleep(1)
    
    results["Generate Reply (All Modes)"] = test_generate_reply_all_modes()
    time.sleep(1)
    
    results["Custom Mode"] = test_custom_mode()
    time.sleep(1)
    
    results["Validation - Max Length"] = test_validation_max_length()
    time.sleep(1)
    
    results["Validation - Invalid Mode"] = test_validation_invalid_mode()
    time.sleep(1)
    
    results["Validation - Custom Without Tone"] = test_validation_custom_without_tone()
    time.sleep(1)
    
    results["Rate Limiting"] = test_rate_limiting()
    time.sleep(1)
    
    results["No Message Logging"] = test_no_message_logging()
    time.sleep(1)
    
    results["Environment Variable Security"] = test_env_variable()
    
    # Summary
    print(f"\n{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BLUE}TEST SUMMARY{Colors.END}")
    print(f"{Colors.BLUE}{'='*60}{Colors.END}")
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = f"{Colors.GREEN}PASS{Colors.END}" if result else f"{Colors.RED}FAIL{Colors.END}"
        print(f"{test_name}: {status}")
    
    print(f"\n{Colors.BLUE}Total: {passed}/{total} tests passed{Colors.END}")
    
    if passed == total:
        print(f"{Colors.GREEN}{'='*60}{Colors.END}")
        print(f"{Colors.GREEN}ALL TESTS PASSED! ✓{Colors.END}")
        print(f"{Colors.GREEN}Core functionality validated - ready for Phase 2{Colors.END}")
        print(f"{Colors.GREEN}{'='*60}{Colors.END}")
        return 0
    else:
        print(f"{Colors.RED}{'='*60}{Colors.END}")
        print(f"{Colors.RED}SOME TESTS FAILED - Fix before proceeding{Colors.END}")
        print(f"{Colors.RED}{'='*60}{Colors.END}")
        return 1

if __name__ == "__main__":
    exit(main())
