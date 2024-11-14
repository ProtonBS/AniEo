// JavaScript for Download Section

const downloadButton = document.getElementById('download-section-button');
const preloader = document.getElementById('download-section-preloader');
const qualityButtons = document.getElementById('download-section-quality-buttons');

// Get episode ID from URL (Query parameter)
const urlParams = new URLSearchParams(window.location.search);
const episodeId = urlParams.get('id');

// Fetch download links from API based on episode ID
async function fetchDownloadLinks(query) {
  try {
    const response = await fetch(`https://api.bhoothihu.workers.dev/download/${query}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Show preloader and fetch download links
downloadButton.addEventListener('click', async () => {
  if (!episodeId) return;

  // Show preloader
  preloader.classList.remove('hidden');
  qualityButtons.classList.add('hidden');

  // Fetch download links after 2 seconds
  setTimeout(async () => {
    const links = await fetchDownloadLinks(episodeId);
    if (links) {
      // Hide preloader and show quality buttons
      preloader.classList.add('hidden');
      qualityButtons.classList.remove('hidden');

      // Add event listeners to buttons for each quality
      document.getElementById('download-section-btn360p').addEventListener('click', () => {
        window.location.href = links['640x360'];
      });

      document.getElementById('download-section-btn480p').addEventListener('click', () => {
        window.location.href = links['854x480'];
      });

      document.getElementById('download-section-btn720p').addEventListener('click', () => {
        window.location.href = links['1280x720'];
      });

      document.getElementById('download-section-btn1080p').addEventListener('click', () => {
        window.location.href = links['1920x1080'];
      });
    }
  }, 2000); // Simulate loading time
});
