
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() !== '') {
        searchGoogle(searchInput);
    }
});

function searchGoogle(query) {
    const apiKey = 'YOUR_GOOGLE_API_KEY';
    const cx = 'YOUR_GOOGLE_CUSTOM_SEARCH_ENGINE_ID';
    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error fetching search results:', error));
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a><p>${item.snippet}</p>`;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}
