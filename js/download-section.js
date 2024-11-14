
    const downloadButton = document.getElementById('downloadButton');
    const preloader = document.getElementById('preloader');
    const qualityButtons = document.getElementById('qualityButtons');

    // Get query from the URL (episode ID)
    const urlParams = new URLSearchParams(window.location.search);
    const episodeId = urlParams.get('id');

    // Function to fetch the download links from the API
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

    // Show download options after preloader
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
          document.getElementById('btn360p').addEventListener('click', () => {
            window.location.href = links['640x360'];
          });

          document.getElementById('btn480p').addEventListener('click', () => {
            window.location.href = links['854x480'];
          });

          document.getElementById('btn720p').addEventListener('click', () => {
            window.location.href = links['1280x720'];
          });

          document.getElementById('btn1080p').addEventListener('click', () => {
            window.location.href = links['1920x1080'];
          });
        }
      }, 2000); // Simulate loading time
    });
