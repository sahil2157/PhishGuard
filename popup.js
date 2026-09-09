function showError(message) {
  document.getElementById("result").innerHTML = `
    <div class="warning error">
      ❌ ${escapeHTML(message)}
    </div>
  `;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function displayResult(data) {
  const result = document.getElementById("result");

  let color = "#22c55e";

  if (data.score >= 70) {
    color = "#dc2626";
  } else if (data.score >= 40) {
    color = "#eab308";
  }

  let warningsHTML = "";

  if (!data.warnings || data.warnings.length === 0) {
    warningsHTML = `
      <div class="warning safe">
        ✅ No obvious phishing indicators detected.
      </div>
    `;
  } else {
    warningsHTML = data.warnings
      .map(warning => `
        <div class="warning">
          ⚠️ ${escapeHTML(warning)}
        </div>
      `)
      .join("");
  }

  result.innerHTML = `
    <div
      class="score"
      style="background:${color}"
    >
      <div class="score-number">
        ${data.score}
      </div>
      <div>/100</div>
    </div>

    <div
      class="risk"
      style="color:${color}"
    >
      ${escapeHTML(data.level)} RISK
    </div>

    ${warningsHTML}
  `;
}

chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  function(tabs) {

    const tab = tabs[0];

    if (!tab || !tab.id) {
      showError("Cannot access the current page.");
      return;
    }

    chrome.tabs.sendMessage(
      tab.id,
      { action: "analyze" },
      function(response) {

        if (chrome.runtime.lastError) {
          showError(
            "Cannot analyze this page. " +
            chrome.runtime.lastError.message
          );
          return;
        }

        if (!response) {
          showError("No analysis result received.");
          return;
        }

        displayResult(response);
      }
    );
  }
);

