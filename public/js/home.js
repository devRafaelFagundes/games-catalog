const selector = document.getElementById('filter');
const container = document.getElementById('container');
const filterButton = document.getElementById('filterButton');

async function fetchGames() {
  const genre = selector.value;
  const url = genre ? `/games?genre=${genre}` : '/games';
  const res = await fetch(url);
  const data = await res.json();
  return data.allGames || [];
}

function renderGames(gamesArray) {
  container.innerHTML = "";

  gamesArray.forEach(game => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("cardWrapper");

    const card = document.createElement("div");
    card.id = "gameCard";

    const imageDiv = document.createElement("div");
    imageDiv.id = "image";
    imageDiv.innerHTML = game.imageUrl ? `<img src="${game.imageUrl}" alt="${game.title}">` : "<span>📷</span>";

    const title = document.createElement("h3");
    title.textContent = game.title;

    const about = document.createElement("p");
    about.id = "about";
    about.textContent = game.about;

    const info = document.createElement("p");
    info.textContent = `Owner: ${game.owner} | Year: ${game.year} | Genre: ${game.genre}`;

    const rating = document.createElement("p");
    rating.textContent = `⭐ ${game.rating}/10`;

    const actionButtons = document.createElement("div");
    actionButtons.id = "actionButtons";

    const editBtn = document.createElement("button");
    editBtn.classList.add("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      window.location.href = `/update/${game._id}`;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
      if (confirm(`Você tem certeza que deseja deletar "${game.title}"?`)) {
        try {
          const res = await fetch(`/delete/${game._id}`, { method: "DELETE" });
          if (res.ok) {
            loadAndRender();
          } else {
            alert("Erro ao deletar o jogo.");
          }
        } catch (error) {
          console.error(error);
          alert("Erro ao deletar jogo.");
        }
      }
    });

    actionButtons.appendChild(editBtn);
    actionButtons.appendChild(deleteBtn);

    card.appendChild(imageDiv);
    card.appendChild(title);
    card.appendChild(about);
    card.appendChild(info);
    card.appendChild(rating);
    card.appendChild(actionButtons);

    wrapper.appendChild(card);
    container.appendChild(wrapper);
  });
}

async function loadAndRender() {
  const games = await fetchGames();
  renderGames(games);
}

filterButton.addEventListener('click', async (e) => {
  e.preventDefault();
  loadAndRender();
});

document.addEventListener('DOMContentLoaded', loadAndRender);
