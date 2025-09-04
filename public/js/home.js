const selector = document.getElementById('filter')

function renderGames(array) {
    array.forEach(game => {
    });
}

const filterButton = document.getElementById('filterButton');
async function fetchGames() {
    const genre = selector.value;
    const url = genre ? `/games?genre=${genre}` : '/games';
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

filterButton.addEventListener('click', async (event) => {
    event.preventDefault(); 

    const data = await fetchGames();

})