document.addEventListener("DOMContentLoaded", function() {
  // Create and append the advertisement note
  const adNote = document.createElement("p");
  adNote.textContent = "Advertisement";

  // Find the ad container div and append the ad note
  const adContainer = document.getElementById("ad-container-320-50");
  adContainer.appendChild(adNote);

  // Ad script options
  const atOptions = {
    'key': 'f5944715842e6425397e93e3277a8eab',
    'format': 'iframe',
    'height': 50,
    'width': 320,
    'params': {}
  };

  // Create and append the ad script
  const adScript = document.createElement("script");
  adScript.type = "text/javascript";
  adScript.src = "//www.topcreativeformat.com/f5944715842e6425397e93e3277a8eab/invoke.js";
  
  // Append the ad script to the ad container
  adContainer.appendChild(adScript);
});
