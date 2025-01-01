document.addEventListener('DOMContentLoaded', () => {
  const packContainer = document.querySelector('.pack-container');
  const modal = document.querySelector('.pack-details-modal');
  const searchInput = document.getElementById('searchInput');

  // Fetch data from packs.json
  fetch('packs.json')
    .then(response => response.json())
    .then(data => {
      // Create a tile for each pack in the JSON
      data.forEach(pack => {
        const tile = document.createElement('div');
        tile.classList.add('pack-tile');

        // Populate each tile with pack info
        tile.innerHTML = `
          <img src="${pack.img}" alt="${pack.name}">
          <h3>${pack.name}</h3>
          <p>MSRP: $${pack.msrp}</p>
          <p>Current Price: $${pack.current_price}</p>
        `;

        // When a tile is clicked, open the modal with detailed info
        tile.addEventListener('click', () => openPackDetails(pack));
        
        // Append the tile to the container
        packContainer.appendChild(tile);
      });
    })
    .catch(error => console.error('Error fetching pack data:', error));

  // Function to open the pack details modal
  function openPackDetails(pack) {
    modal.innerHTML = `
      <div class="pack-details-modal-content">
        <h2>${pack.name}</h2>
        <img src="${pack.img}" alt="${pack.name}" style="width:100%; margin-bottom:1rem;" />
        <p><strong>MSRP:</strong> $${pack.msrp}</p>
        <p><strong>Current Price:</strong> $${pack.current_price}</p>
        <p>${pack.description}</p>
        <button id="closeModal">Close</button>
      </div>
    `;
    // Reveal the modal
    modal.classList.remove('hidden');

    // Close button inside the modal
    document.getElementById('closeModal').addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  // ====== SEARCH FUNCTIONALITY ======
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    // Grab all pack tiles
    const tiles = document.querySelectorAll('.pack-tile');

    tiles.forEach(tile => {
      // We'll match against all text in the tile (name, price, etc.)
      const tileText = tile.innerText.toLowerCase();

      // If the tile's text includes the search term, show it; otherwise hide it
      if (tileText.includes(searchTerm)) {
        tile.style.display = 'block';  // or 'flex', depending on your layout
      } else {
        tile.style.display = 'none';
      }
    });
  });
});
