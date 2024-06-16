import requests
import time

# URL of the Node.js server
url = 'http://localhost:3000/get-otp'

def get_otp(username):
    response = requests.post(url, json={'username': username})
    if response.status_code == 200:
        data = response.json()
        print(f"Client - User: {data['username']}, OTP: {data['otp']}, Secret: {data['secret']}")
        log_message = f"User: {data['username']}, OTP: {data['otp']}, Secret: {data['secret']}, Timestamp: {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
        with open(f"{username}_otp_log.txt", "a") as f:
            f.write(log_message)
    else:
        print(f"Failed to get OTP for {username}: {response.status_code}, {response.text}")

# Ask for username only once
username = input("Enter your username: ")
if username:
    while True:
        get_otp(username)
        time.sleep(10)
else:
    print("Username cannot be empty.")
