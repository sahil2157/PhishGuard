🛡️ PhishGuard

Real-Time Phishing Detector — Educational Chrome Extension

PhishGuard is an educational browser extension designed to demonstrate how common phishing indicators can be detected directly on a webpage.

It analyzes the current webpage for suspicious characteristics such as insecure HTTP connections, suspicious language, credential fields, OTP requests, unusual URLs, external form destinations, and other potential phishing indicators.

⚠️ Educational project: PhishGuard is a demonstration tool and should not be considered a complete or production-grade phishing protection system.

✨ Features
🔍 Real-time webpage analysis
📊 Phishing risk score from 0–100
🟢 Low, 🟡 Medium, and 🔴 High risk classifications
🔐 Detects password and login fields
🔑 Detects OTP/verification-code requests
🌐 Checks for HTTP instead of HTTPS
🔗 Detects URLs containing @
📏 Detects unusually long URLs
🌳 Detects URLs with many subdomains
⚠️ Detects common phishing-related phrases
📤 Checks whether forms submit data to another domain
👁️ Detects certain hidden page elements
🚨 Displays an on-page warning for high-risk pages
🧪 Includes a safe phishing simulation page for testing
📁 Project Structure
PhishGuard/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── simulation.html
├── README.md
└── LICENSE

🚀 Installation

PhishGuard can be loaded into Chrome as an unpacked extension.

1. Clone the repository
git clone https://github.com/YOUR-USERNAME/PhishGuard.git
cd PhishGuard


Or download the repository as a ZIP file and extract it.

2. Open Chrome Extensions

Open:

chrome://extensions

3. Enable Developer Mode

Turn on Developer mode in the top-right corner.

4. Load PhishGuard

Click:

Load unpacked → Select the PhishGuard project folder

The PhishGuard extension should now appear in your installed extensions.

🧪 Testing

A phishing simulation page is included for educational testing.

Open simulation.html in a browser and use the PhishGuard extension to analyze it.

The simulation intentionally contains several phishing indicators, including:

Urgent security language
Account suspension messages
Password input
Email/login input
OTP/verification-code input
Hidden test content
Multiple suspicious phrases

The simulation does not transmit the entered information.

Expected Result

The simulation should produce a HIGH risk score and display a PhishGuard warning.

🧠 How Detection Works

PhishGuard uses a simple rule-based scoring system.

Each detected indicator adds points to the risk score.

Examples:

Indicator	Score
HTTP connection	+15
@ in URL	+20
Very long URL	+10
Many subdomains	+15
Password field	+20
Login field	+10
OTP field	+15
External form destination	+20
Suspicious phrases	Variable
Hidden elements	+5

The final score is capped at 100.

Risk Levels
0–39    LOW
40–69   MEDIUM
70–100  HIGH

🔒 Privacy

PhishGuard is designed as a local educational demonstration.

The current implementation does not send analyzed webpage content to an external server or phishing-detection API.

The extension analyzes webpage information locally using JavaScript.

However, because the extension runs on webpages matched by its content-script configuration, users should review the source code before installing any modified version of the project.

⚠️ Limitations

Phishing detection is a complex security problem. This project uses simple heuristics and therefore can produce:

False positives
False negatives
Incorrect risk scores
Warnings on legitimate login pages
Missed phishing pages using more sophisticated techniques

For example, the presence of a password field alone does not mean that a website is malicious.

PhishGuard should therefore be treated as an educational demonstration, not as a replacement for browser security features, antivirus software, security gateways, or professional phishing intelligence services.

🎓 Educational Purpose

This project demonstrates concepts including:

Chrome Extension Manifest V3
Content scripts
DOM inspection
URL analysis
Rule-based risk scoring
Browser extension messaging
Basic phishing indicators
Client-side security analysis

It can be useful for cybersecurity students, beginners learning browser extensions, and demonstrations of phishing-awareness concepts.

🛠️ Technologies
HTML5
CSS3
JavaScript
Chrome Extensions Manifest V3
🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you find a bug or have an idea for improving the detection logic, feel free to open an issue or submit a pull request.

When contributing, please keep the project focused on defensive and educational cybersecurity purposes.

📜 License

This project is licensed under the MIT License.

See the LICENSE file for details.

⚠️ Disclaimer

PhishGuard is provided for educational and research purposes.

The project does not guarantee that a website is safe or malicious. A LOW risk score does not mean that a website is trustworthy, and a HIGH risk score does not by itself prove that a website is malicious.

Always verify websites independently and avoid entering sensitive information into suspicious webpages.
