// Function to search for anime episode
        function searchEpisode() {
            const query = document.getElementById('search-input').value;
            if (query) {
                window.location.href = `/search/?q=${encodeURIComponent(query)}`;
            }
        }

        // Add event listener for 'Enter' key press on the search input
        document.getElementById('search-input').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchEpisode();  // Trigger search when Enter key is pressed
            }
        });

        // Get query from URL
        const urlParams = new URLSearchParams(window.location.search);
        const episodeQuery = urlParams.get('id');

        // Split the episodeQuery to get the anime title and episode number
        const [animeTitle, episodeNum] = episodeQuery.split('-episode-'); 
        const formattedEpisodeName = `${animeTitle.charAt(0).toUpperCase() + animeTitle.slice(1)} Episode ${episodeNum}`;

        // Set the episode name dynamically
        document.getElementById('episodeName').textContent = formattedEpisodeName;

        // Fetch the video data from the API
        fetch(`https://animetize-api.vercel.app/watch/${episodeQuery}`)
            .then(response => response.json())
            .then(data => {
          
          
          
               // Function to simulate video loading process (you can replace this with actual video loading check)
window.onload = function() {
    // Hide preloader and show video player after 3 seconds (adjust based on your need)
    setTimeout(() => {
        document.getElementById('preloader').style.display = 'none'; // Hide preloader
        document.getElementById('videoContainer').style.display = 'block'; // Show video player container
    }, 3000); // 3 seconds delay to simulate video load
}


          
          

                const videoPlayer = document.getElementById('videoPlayer');
                const qualityButtonsContainer = document.getElementById('qualityButtons');

                // Set the default video source (the highest quality)
                const defaultSource = data.sources.find(source => source.quality === '1080p')?.url || data.sources[0].url;
                videoPlayer.src = defaultSource;

                // Create quality buttons
                data.sources.forEach(source => {
                    const button = document.createElement('button');
                    button.textContent = `${source.quality}`;
                    button.onclick = () => changeVideoSource(source.url);
                    qualityButtonsContainer.appendChild(button);
                });

                // Set previous and next episode buttons
                const episodeNumInt = parseInt(episodeNum, 10);
                const previousEpisode = episodeNumInt > 1 ? episodeNumInt - 1 : episodeNumInt;
                const nextEpisode = episodeNumInt + 1;

                document.getElementById('previousButton').onclick = () => navigateToEpisode(animeTitle, previousEpisode);
                document.getElementById('nextButton').onclick = () => navigateToEpisode(animeTitle, nextEpisode);
            })
            .catch(error => console.error('Error fetching video data:', error));

        // Function to change video source based on quality selected
        function changeVideoSource(url) {
            const videoPlayer = document.getElementById('videoPlayer');
            videoPlayer.src = url;
            videoPlayer.play();
        }

        // Function to navigate to previous or next episode
        function navigateToEpisode(animeTitle, episodeNum) {
            window.location.href = `./?id=${animeTitle}-episode-${episodeNum}`;
        }
// Extract the query from the URL
  const queryParams = new URLSearchParams(window.location.search);
  let query = queryParams.get('id'); // Get the full "id" from the URL

  // Extract the part before "-episode-" if present
  if (query && query.includes('-episode-')) {
    query = query.split('-episode-')[0];
  }

  if (query) {
    const apiURL = `https://animetize-api.vercel.app/info/${query}`;
    const episodeListContainer = document.getElementById('episode-list-container');

    // Fetch episode data
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        const episodes = data.episodes;
        if (!episodes || episodes.length === 0) {
          throw new Error('No episodes found');
        }

        // Clear existing content and generate buttons for each episode
        episodeListContainer.innerHTML = '';
        episodes.forEach((episode) => {
          const episodeButton = document.createElement('button');
          episodeButton.textContent = `Ep ${episode.number}`;
          episodeButton.addEventListener('click', () => {
            window.location.href = `/episode/?id=${episode.id}`; // Redirect to download with episode ID
          });
          episodeListContainer.appendChild(episodeButton);
        });
      })
      .catch((error) => {
        console.error('Error fetching episodes:', error);
        episodeListContainer.textContent = 'Failed to load episodes. Please try again later.';
      });
  } else {
    console.error('Query parameter "id" is missing.');
    document.getElementById('episode-list-container').textContent = 'Invalid URL or missing query parameter.';
  }
