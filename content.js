function analyzePage() {

  let score = 0;
  const warnings = [];

  const url = window.location.href;
  const hostname = window.location.hostname.toLowerCase();

  const pageText = document.body
    ? document.body.innerText.toLowerCase()
    : "";

  // -------------------------
  // URL ANALYSIS
  // -------------------------

  if (window.location.protocol === "http:") {
    score += 15;
    warnings.push("Website does not use HTTPS");
  }

  if (url.includes("@")) {
    score += 20;
    warnings.push("URL contains an @ symbol");
  }

  if (url.length > 100) {
    score += 10;
    warnings.push("URL is unusually long");
  }

  const domainParts = hostname.split(".");

  if (domainParts.length >= 5) {
    score += 15;
    warnings.push("URL contains many subdomains");
  }

  // -------------------------
  // SUSPICIOUS LANGUAGE
  // -------------------------

  const suspiciousWords = {
    "urgent": 8,
    "immediate action": 8,
    "verify your account": 10,
    "verify account": 10,
    "account suspended": 12,
    "account has been suspended": 12,
    "confirm your identity": 10,
    "security alert": 8,
    "security warning": 8,
    "password": 8,
    "otp": 10,
    "one time password": 10,
    "verification code": 10,
    "bank account": 10,
    "credit card": 10,
    "claim your prize": 12,
    "you have won": 12,
    "free money": 12,
    "limited time": 5,
    "click here": 4,
    "permanent suspension": 10
  };

  for (const phrase in suspiciousWords) {

    if (pageText.includes(phrase)) {

      score += suspiciousWords[phrase];

      warnings.push(
        `Suspicious phrase: "${phrase}"`
      );
    }
  }

  // -------------------------
  // PASSWORD FIELD
  // -------------------------

  const passwordFields =
    document.querySelectorAll(
      'input[type="password"]'
    );

  if (passwordFields.length > 0) {

    score += 20;

    warnings.push(
      "Page requests a password"
    );
  }

  // -------------------------
  // LOGIN FIELDS
  // -------------------------

  const loginFields =
    document.querySelectorAll(
      'input[type="email"],' +
      'input[name*="email" i],' +
      'input[name*="user" i],' +
      'input[name*="login" i]'
    );

  if (loginFields.length > 0) {

    score += 10;

    warnings.push(
      "Page requests login information"
    );
  }

  // -------------------------
  // OTP FIELD
  // -------------------------

  const inputs =
    document.querySelectorAll("input");

  inputs.forEach(input => {

    const info = (
      (input.placeholder || "") +
      " " +
      (input.name || "") +
      " " +
      (input.id || "")
    ).toLowerCase();

    if (
      info.includes("otp") ||
      info.includes("verification code") ||
      info.includes("one time")
    ) {

      score += 15;

      warnings.push(
        "Page requests an OTP/verification code"
      );
    }
  });

  // -------------------------
  // FORMS
  // -------------------------

  const forms =
    document.querySelectorAll("form");

  forms.forEach(form => {

    const action =
      form.getAttribute("action");

    if (!action) {
      return;
    }

    try {

      const actionURL =
        new URL(
          action,
          window.location.href
        );

      if (
        actionURL.hostname !==
        window.location.hostname
      ) {

        score += 20;

        warnings.push(
          "Form sends information to another domain"
        );
      }

    } catch {
      warnings.push(
        "Form has an unusual action URL"
      );
    }
  });

  // -------------------------
  // HIDDEN ELEMENTS
  // -------------------------

  const hiddenElements =
    document.querySelectorAll(
      '[style*="display:none"],' +
      '[style*="visibility:hidden"]'
    );

  if (hiddenElements.length > 0) {

    score += 5;

    warnings.push(
      "Page contains hidden elements"
    );
  }

  // -------------------------
  // PASSWORD + HTTP COMBINATION
  // -------------------------

  if (
    passwordFields.length > 0 &&
    window.location.protocol === "http:"
  ) {

    score += 15;

    warnings.push(
      "Password form is displayed on an HTTP page"
    );
  }

  // -------------------------
  // FINAL SCORE
  // -------------------------

  score = Math.min(score, 100);

  const uniqueWarnings =
    [...new Set(warnings)];

  let level = "LOW";

  if (score >= 70) {
    level = "HIGH";
  } else if (score >= 40) {
    level = "MEDIUM";
  }

  return {
    score,
    level,
    warnings: uniqueWarnings,
    url
  };
}

// -------------------------
// POPUP MESSAGE HANDLER
// -------------------------

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.action === "analyze") {

      sendResponse(
        analyzePage()
      );
    }

    return true;
  }
);

// -------------------------
// LIVE PAGE WARNING
// -------------------------

function showWarning(score) {

  if (
    document.getElementById(
      "phishguard-warning"
    )
  ) {
    return;
  }

  const box =
    document.createElement("div");

  box.id =
    "phishguard-warning";

  box.innerHTML = `
    <div style="
      font-size:20px;
      font-weight:bold;
      margin-bottom:8px;
    ">
      🚨 PhishGuard Warning
    </div>

    <div>
      This webpage contains multiple
      phishing indicators.
    </div>

    <div style="
      margin-top:8px;
      font-weight:bold;
    ">
      Risk Score: ${score}/100
    </div>

    <button id="phishguard-close"
      style="
        margin-top:10px;
        padding:7px 14px;
        border:0;
        border-radius:5px;
        cursor:pointer;
      ">
      Dismiss
    </button>
  `;

  box.style.cssText = `
    position:fixed;
    top:20px;
    right:20px;
    width:300px;
    padding:18px;
    background:#b91c1c;
    color:white;
    border-radius:12px;
    z-index:2147483647;
    font-family:Arial,sans-serif;
    box-shadow:0 5px 25px rgba(0,0,0,.4);
  `;

  document.body.appendChild(box);

  document
    .getElementById("phishguard-close")
    .onclick = function() {
      box.remove();
    };
}

setTimeout(function() {

  const result = analyzePage();

  if (result.score >= 70) {
    showWarning(result.score);
  }

}, 500);

