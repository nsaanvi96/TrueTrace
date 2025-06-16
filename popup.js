document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('analyzeBtn').addEventListener('click', async () => {
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

    try {
      // Deepfake analysis (file upload)
      if (mediaInput) {
        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(mediaInput.type)) {
          resultDiv.textContent = 'Please upload a valid image (JPEG or PNG).';
          return;
        }

        // Prepare form data for file upload
        const formData = new FormData();
        formData.append('file', mediaInput);

        // Send request to Flask endpoint
        const response = await fetch('http://localhost:5000/analyze-deepfake', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (response.ok) {
          resultDiv.textContent = `Deepfake Result: ${data.result}, Confidence: ${data.confidence}`;
        } else {
          resultDiv.textContent = `Error: ${data.error || 'Failed to analyze deepfake'}`;
        }
        return;
      }

      // Phishing analysis (URL)
      if (urlInput) {
        const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/;
        if (!urlPattern.test(urlInput)) {
          resultDiv.textContent = 'Please enter a valid URL (e.g., https://www.google.com).';
          return;
        }

        // Send request to Flask endpoint
        const response = await fetch('http://localhost:5000/analyze-phishing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: urlInput })
        });

        const data = await response.json();
        if (response.ok) {
          resultDiv.textContent = `Phishing Result: ${data.result}`;
        } else {
          resultDiv.textContent = `Error: ${data.error || 'Failed to analyze URL'}`;
        }
      }
    } catch (error) {
      resultDiv.textContent = `Error: ${error.message || 'Network error occurred'}`;
    }
  });
});