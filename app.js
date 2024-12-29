document.addEventListener('DOMContentLoaded', () => { // needed in order to load the dom first then start js 
  
    const packContainer = document.querySelector('.pack-container'); 
    const modal = document.querySelector('.pack-details-modal');  

  

    fetch('packs.json') // if using API: fetch('https://yourapi.com/packs')
      .then(response => response.json())
      .then(data => {
        data.forEach(pack => {
          // Create a tile for each pack
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
  });
  