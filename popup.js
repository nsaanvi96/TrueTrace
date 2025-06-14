document.getElementById('analyzeBtn').addEventListener('click', () => {
  const mediaInput = document.getElementById('mediaInput').files[0];
  const urlInput = document.getElementById('urlInput').value.trim();
  const resultDiv = document.getElementById('result');

  // Reset result and show loading state
  resultDiv.textContent = 'Loading...';

  // Validate inputs
  if (mediaInput && urlInput) {
    resultDiv.textContent = 'Please select only one option: either upload an image or enter a URL.';
    return;
  }

  if (!mediaInput && !urlInput) {
    resultDiv.textContent = 'Please upload an image or enter a URL.';
    return;
  }

  // Validate file upload (deepfake analysis)
  if (mediaInput) {
    const validImageTypes = ['image/jpeg', 'image/png'];
    if (!validImageTypes.includes(mediaInput.type)) {
      resultDiv.textContent = 'Please upload a valid image (JPEG or PNG).';
      return;
    }

    // Mock response simulating a trained deepfake model's output
    setTimeout(() => {
      resultDiv.textContent = 'Mock Deepfake Result: Deepfake detected, confidence: 0.85';
    }, 1000); // Simulate processing delay
    return;
  }

  // Validate URL (phishing analysis)
  if (urlInput) {
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/;
    if (!urlPattern.test(urlInput)) {
      resultDiv.textContent = 'Please enter a valid URL (e.g., https://www.google.com).';
      return;
    }

    // Mock response simulating a trained phishing model's output
    setTimeout(() => {
      resultDiv.textContent = 'Mock Phishing Result: Phishing risk: High';
    }, 1000); // Simulate processing delay
  }
});