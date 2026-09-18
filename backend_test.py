import requests
import sys
import time
from datetime import datetime

class ReplyAITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"   Response: {response.json()}")
                except:
                    print(f"   Response: {response.text}")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "endpoint": endpoint
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e),
                "endpoint": endpoint
            })
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )

    def test_generate_flirty(self):
        """Test generate reply with flirty mode"""
        success, response = self.run_test(
            "Generate Reply - Flirty Mode",
            "POST",
            "api/generate",
            200,
            data={
                "messages": "Hey! How was your day?",
                "mode": "flirty",
                "custom_tone": None
            }
        )
        if success and 'reply' in response:
            print(f"   Generated reply: {response['reply'][:100]}...")
            return True
        return False

    def test_generate_funny(self):
        """Test generate reply with funny mode"""
        success, response = self.run_test(
            "Generate Reply - Funny Mode",
            "POST",
            "api/generate",
            200,
            data={
                "messages": "I just spilled coffee all over my keyboard",
                "mode": "funny",
                "custom_tone": None
            }
        )
        if success and 'reply' in response:
            print(f"   Generated reply: {response['reply'][:100]}...")
            return True
        return False

    def test_generate_professional(self):
        """Test generate reply with professional mode"""
        success, response = self.run_test(
            "Generate Reply - Professional Mode",
            "POST",
            "api/generate",
            200,
            data={
                "messages": "Can we schedule a meeting to discuss the project timeline?",
                "mode": "professional",
                "custom_tone": None
            }
        )
        if success and 'reply' in response:
            print(f"   Generated reply: {response['reply'][:100]}...")
            return True
        return False

    def test_generate_roast(self):
        """Test generate reply with roast mode"""
        success, response = self.run_test(
            "Generate Reply - Roast Mode",
            "POST",
            "api/generate",
            200,
            data={
                "messages": "I think I'm the best player on the team",
                "mode": "roast",
                "custom_tone": None
            }
        )
        if success and 'reply' in response:
            print(f"   Generated reply: {response['reply'][:100]}...")
            return True
        return False

    def test_generate_savage(self):
        """Test generate reply with savage mode"""
        success, response = self.run_test(
            "Generate Reply - Savage Mode",
            "POST",
            "api/generate",
            200,
            data={
                "messages": "You never text me back",
                "mode": "savage",
                "custom_tone": None
            }
        )
        if success and 'reply' in response:
            print(f"   Generated reply: {response['reply'][:100]}...")
            return True
        return False

    def test_generate_custom(self):
        """Test generate reply with custom mode"""
        success, response = self.run_test(
            "Generate Reply - Custom Mode",
            "POST",
            "api/generate",
            200,
            data={
                "messages": "I'm feeling really stressed about the exam tomorrow",
                "mode": "custom",
                "custom_tone": "Reply like a motivational coach"
            }
        )
        if success and 'reply' in response:
            print(f"   Generated reply: {response['reply'][:100]}...")
            return True
        return False

    def test_validation_empty_message(self):
        """Test validation for empty message"""
        success, _ = self.run_test(
            "Validation - Empty Message",
            "POST",
            "api/generate",
            422,
            data={
                "messages": "",
                "mode": "flirty",
                "custom_tone": None
            }
        )
        return success

    def test_validation_custom_without_tone(self):
        """Test validation for custom mode without tone"""
        success, _ = self.run_test(
            "Validation - Custom Mode Without Tone",
            "POST",
            "api/generate",
            422,
            data={
                "messages": "Hello there!",
                "mode": "custom",
                "custom_tone": None
            }
        )
        return success

    def test_validation_message_too_long(self):
        """Test validation for message exceeding 2000 chars"""
        long_message = "A" * 2001
        success, _ = self.run_test(
            "Validation - Message Too Long",
            "POST",
            "api/generate",
            422,
            data={
                "messages": long_message,
                "mode": "flirty",
                "custom_tone": None
            }
        )
        return success

    def test_rate_limiting(self):
        """Test rate limiting (10 requests per minute)"""
        print(f"\n🔍 Testing Rate Limiting (10 requests per minute)...")
        print("   Making 11 rapid requests to trigger rate limit...")
        
        rate_limit_hit = False
        for i in range(11):
            try:
                response = requests.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "messages": f"Test message {i}",
                        "mode": "flirty",
                        "custom_tone": None
                    },
                    headers={'Content-Type': 'application/json'},
                    timeout=30
                )
                
                if response.status_code == 429:
                    print(f"   ✅ Rate limit triggered at request {i+1}")
                    print(f"   Response: {response.json()}")
                    rate_limit_hit = True
                    self.tests_passed += 1
                    break
                elif i < 10:
                    print(f"   Request {i+1}: {response.status_code}")
                    
            except Exception as e:
                print(f"   ❌ Error on request {i+1}: {str(e)}")
                
        self.tests_run += 1
        
        if not rate_limit_hit:
            print(f"   ❌ Rate limit was not triggered after 11 requests")
            self.failed_tests.append({
                "test": "Rate Limiting",
                "error": "Rate limit not triggered after 11 requests"
            })
            return False
            
        return True

    def test_response_structure(self):
        """Test that response has correct structure"""
        success, response = self.run_test(
            "Response Structure",
            "POST",
            "api/generate",
            200,
            data={
                "messages": "Test message",
                "mode": "professional",
                "custom_tone": None
            }
        )
        
        if success:
            required_fields = ['reply', 'mode', 'timestamp']
            missing_fields = [field for field in required_fields if field not in response]
            
            if missing_fields:
                print(f"   ❌ Missing fields: {missing_fields}")
                self.failed_tests.append({
                    "test": "Response Structure",
                    "error": f"Missing fields: {missing_fields}"
                })
                return False
            else:
                print(f"   ✅ All required fields present: {required_fields}")
                return True
        return False

def main():
    print("=" * 60)
    print("ReplyAI Backend API Testing")
    print("=" * 60)
    
    tester = ReplyAITester()
    
    # Run all tests
    print("\n📋 Running Backend Tests...\n")
    
    # Basic tests
    tester.test_health_check()
    
    # Mode tests
    tester.test_generate_flirty()
    tester.test_generate_funny()
    tester.test_generate_professional()
    tester.test_generate_roast()
    tester.test_generate_savage()
    tester.test_generate_custom()
    
    # Validation tests
    tester.test_validation_empty_message()
    tester.test_validation_custom_without_tone()
    tester.test_validation_message_too_long()
    
    # Response structure test
    tester.test_response_structure()
    
    # Rate limiting test (run last as it makes many requests)
    print("\n⚠️  Rate limiting test will make 11 rapid requests...")
    time.sleep(2)
    tester.test_rate_limiting()
    
    # Print summary
    print("\n" + "=" * 60)
    print("📊 Test Summary")
    print("=" * 60)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failed in tester.failed_tests:
            print(f"   - {failed.get('test', 'Unknown')}")
            if 'error' in failed:
                print(f"     Error: {failed['error']}")
            elif 'expected' in failed:
                print(f"     Expected: {failed['expected']}, Got: {failed['actual']}")
    
    print("=" * 60)
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
