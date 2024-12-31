document.addEventListener('DOMContentLoaded', () => {
  const packContainer = document.querySelector('.pack-container');
  const modal = document.querySelector('.pack-details-modal');

  // Fetch packs (or if you're adding them manually, skip this step)
  fetch('packs.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(pack => {
        const tile = document.createElement('div');
        tile.classList.add('pack-tile');
        tile.innerHTML = `
          <img src="${pack.img}" alt="${pack.name}">
          <h3>${pack.name}</h3>
          <p>$${pack.price}</p>
        `;
        tile.addEventListener('click', () => openPackDetails(pack));
        packContainer.appendChild(tile);
      });
    })
    .catch(error => console.error('Error fetching pack data:', error));

  function openPackDetails(pack) {
    modal.innerHTML = `
      <div class="pack-details-modal-content">
        <h2>${pack.name}</h2>
        <img src="${pack.img}" alt="${pack.name}" style="width:100%; margin-bottom:1rem;" />
        <p><strong>Price:</strong> $${pack.price}</p>
        <p>${pack.description}</p>
        <button id="closeModal">Close</button>
      </div>
    `;
    modal.classList.remove('hidden');
    document.getElementById('closeModal').addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  // ====== SEARCH FUNCTIONALITY ======
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    // Grab all pack tiles
    const tiles = document.querySelectorAll('.pack-tile');

    tiles.forEach(tile => {
      // We’ll match against the text inside the tile (name, price, etc.)
      const tileText = tile.innerText.toLowerCase();

      // If the tile's text includes the search term, show it; otherwise hide it
      if (tileText.includes(searchTerm)) {
        tile.style.display = 'block'; // or 'flex', whatever you prefer
      } else {
        tile.style.display = 'none';
      }
    });
  });
});
