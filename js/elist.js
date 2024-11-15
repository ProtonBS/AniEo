// Global variable to store episodes data
let episodesData = [];

// Function to fetch episodes based on URL query parameter
function fetchEpisodes(query) {
    const apiUrl = `https://animetize-api.vercel.app/info/${query}`;
    const episodeBox = document.getElementById('episode-box');
    const loader = document.getElementById('loader');
    const episodeHeading = document.getElementById('episode-heading');

    // Fetch episode data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch episodes');
            }
            return response.json();
        })
        .then(data => {
            // Store the fetched data
            episodesData = data.episodes;

            // Hide the loader
            loader.style.display = 'none';
            episodeHeading.textContent = `Episodes for ${data.title}`;

            // Update the episode list
            updateEpisodeList(episodesData);
        })
        .catch(error => {
            // Handle errors
            loader.style.display = 'none';
            episodeBox.innerHTML = `<p class="error-message">Error loading episodes. Please try again.</p>`;
        });
}

// Function to update episode list
function updateEpisodeList(filteredEpisodes) {
    const episodeBox = document.getElementById('episode-box');

    if (filteredEpisodes.length === 0) {
        episodeBox.innerHTML = `<p class="no-episodes">No episodes found.</p>`;
    } else {
        episodeBox.innerHTML = `
            <div class="episode-buttons">
                ${filteredEpisodes.map(episode => `
                    <a href="https://original-website-url/episode/?id=${episode.id}" class="episode-button" target="_blank">
                        Episode ${episode.number}
                    </a>
                `).join('')}
            </div>
        `;
    }
}

// Function to filter episodes based on search input
function filterEpisodes() {
    const searchText = document.getElementById('search-input').value.trim().toLowerCase();

    // If search is empty, show all episodes
    if (searchText === "") {
        updateEpisodeList(episodesData);
        return;
    }

    // Filter episodes based on exact episode number
    const filteredEpisodes = episodesData.filter(episode => 
        episode.number.toString().includes(searchText)
    );

    updateEpisodeList(filteredEpisodes);
}
