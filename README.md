# Simple Clipboard Bridge 📋🔄📱

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?logo=tailwind-css&logoColor=white)

A lightweight, privacy-focused web application designed to bridge the gap between your desktop and mobile clipboard. Draft text, code, or notes on one device and instantly transfer them to another using QR Codes or SMS protocols—all without a backend server or login.

## ✨ Features

*   **🔒 Privacy First**: Runs entirely in the browser. No data is sent to any cloud server.
*   **🔗 Instant Connection**: Generate a "Connection QR Code" to quickly open the app on a second device.
*   **📱 Cross-Device Transfer**:
    *   **QR Transfer**: Convert your text into a QR code to scan and copy on mobile.
    *   **SMS Integration**: Open your phone's native messaging app with your text pre-filled.
*   **💾 Auto-Save**: Content is automatically saved to your browser's Local Storage, so you never lose your draft.
*   **🌑 Modern UI**: Built with a clean, dark-mode interface using Tailwind CSS.
*   **📂 Export Options**: Download your content as a `.txt` file with one click.

## 🚀 How to Use

### 1. Establish Connection (Optional but Recommended)
1.  Open the web app on your primary device (e.g., Laptop/PC).
2.  You will see a **Connection QR Code**.
3.  Scan this code with your secondary device (e.g., Phone) to open the same app URL.

### 2. Compose & Edit
1.  Click **"Ready, Start Editing"** (or "Reconnect" if you are already in the editor).
2.  Type or paste your text, code snippets, or notes into the main editor area.
3.  The app auto-saves your progress locally.

### 3. Transfer
*   **Via QR**: Click the **Transfer Data** button (Phone icon). Scan the generated QR code with your other device to copy the text to its clipboard.
*   **Via SMS**: Click the **Message icon** to open your device's SMS app with the text ready to send.
*   **Download**: Click the **Download icon** to save the content as a `.txt` file.

## 🛠️ Tech Stack

*   **Framework**: React 19
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **QR Generation**: qrcode.react
*   **Build**: ESM-based (No complex bundler required for dev)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Made for seamless productivity across devices.*
