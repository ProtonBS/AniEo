// Declare a global variable to store episodes data
let customEpisodesData = [];

// Fetch episodes based on URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const customQuery = urlParams.get('id');

if (customQuery) {
    const customApiUrl = `https://animetize-api.vercel.app/info/${customQuery}`;
    const customEpisodeBox = document.getElementById('custom-episode-box');
    const customLoader = document.getElementById('custom-loader');
    const customEpisodeHeading = document.querySelector('.custom-episode-heading');

    // Fetch episode data from the API
    fetch(customApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch episodes');
            }
            return response.json();
        })
        .then(data => {
            // Store the fetched data
            customEpisodesData = data.episodes;
            
            // Hide the loader
            customLoader.style.display = 'none';
            customEpisodeHeading.textContent = `Episodes for ${data.title}`;

            // Update the episode list
            updateCustomEpisodeList(customEpisodesData);
        })
        .catch(error => {
            // Handle errors
            customLoader.style.display = 'none';
            customEpisodeBox.innerHTML = `<p class="text-red-500">Error loading episodes. Please try again.</p>`;
        });
}

// Update episode list
function updateCustomEpisodeList(filteredEpisodes) {
    const customEpisodeBox = document.getElementById('custom-episode-box');

    if (filteredEpisodes.length === 0) {
        customEpisodeBox.innerHTML = `<p class="text-yellow-400">No episodes found.</p>`;
    } else {
        customEpisodeBox.innerHTML = `
            <div class="flex flex-wrap gap-2">
                ${filteredEpisodes.map(episode => `
                    <a href="https:/ani.mom/episode/?id=${episode.id}" class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition" target="_blank">
                        ${episode.number}
                    </a>
                `).join('')}
            </div>
        `;
    }
}

// Function to filter episodes based on the search input
function customFilterEpisodes() {
    const searchText = document.getElementById('custom-search-input').value.trim().toLowerCase();

    // If search is empty, show all episodes
    if (searchText === "") {
        updateCustomEpisodeList(customEpisodesData);
        return;
    }

    // Filter episodes based on exact episode number
    const filteredEpisodes = customEpisodesData.filter(episode => 
        episode.number.toString().includes(searchText) // Match episode number as string
    );

    updateCustomEpisodeList(filteredEpisodes);
}
