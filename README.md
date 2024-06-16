# OTP Generation with Python Client and Node.js Server

This project demonstrates OTP (One-Time Password) generation similar to Google Authenticator, utilizing a Python client and a Node.js server. The client-server interaction allows for dynamic OTP generation based on user-specific secrets.

## Features

- **Python Client (`multi_user_otp_client.py`)**:
  - Prompts the user for their username.
  - Sends the username to a Node.js server via HTTP POST requests.
  - Receives OTPs and secrets from the server every 10 seconds.
  - Logs received OTPs, secrets, and usernames locally in `{username}_otp_log.txt` files.

- **Node.js Server (`multi_user_otp_server.js`)**:
  - Listens for HTTP POST requests at `/get-otp` endpoint.
  - Generates a new secret for each unique username if not already generated.
  - Uses `speakeasy` library to generate OTPs based on the current time and the secret.
  - Logs generated OTPs, secrets, and usernames in `otp_logs.txt` file.
  - Responds to clients with generated OTPs and secrets.

## Usage

1. **Prerequisites**:
   - Python 3.x installed.
   - Node.js and npm installed.

2. **Setup**:
   - Clone the repository:
     ```bash
     git clone https://github.com/your-username/otp-generator.git
     ```
   - Install dependencies:
     - For Python client: `pip install requests`
     - For Node.js server: `npm install`

3. **Running the Project**:
   - Start the Node.js server:
     ```bash
     node multi_user_otp_server.js
     ```
   - Run the Python client:
     ```bash
     python multi_user_otp_client.py
     ```
   - Enter a username when prompted by the Python client.
   - The client will fetch OTPs every 10 seconds and log them locally (`{username}_otp_log.txt`).
   - The server will log OTPs, secrets, and usernames in `otp_logs.txt` simultaneously.

## Notes

- This project illustrates basic OTP generation and client-server interaction.
- Adjustments can be made for production environments, such as securing communication with HTTPS and implementing user authentication.
- Contributions and enhancements are welcome!
