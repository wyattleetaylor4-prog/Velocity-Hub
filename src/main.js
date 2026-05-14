/**
 * Unblocked Games Vault - Core Controller
 */

let allGames = [];
let filteredGames = [];
let activeCategory = 'All';
let searchQuery = '';

// DOM Elements
const gameGrid = document.getElementById('game-grid');
const gameCount = document.getElementById('game-count');
const categoryFilters = document.getElementById('category-filters');
const searchInput = document.getElementById('search-input');
const gameViewer = document.getElementById('game-viewer');
const gameIframe = document.getElementById('game-iframe');
const viewerTitle = document.getElementById('viewer-title');

// Initialize
async function init() {
  try {
    const response = await fetch('./src/data/games.json');
    allGames = await response.json();
    filteredGames = [...allGames];
    
    renderCategories();
    renderGames();
    lucide.createIcons();
    
    // Add event listeners
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase();
      applyFilters();
    });

  } catch (error) {
    console.error('Error loading assets:', error);
    gameGrid.innerHTML = `<div class="col-span-full py-20 text-center text-gray-500">Error loading catalog. Please check your network connection.</div>`;
  }
}

function renderCategories() {
  const cats = ['All', ...new Set(allGames.map(g => g.category))];
  categoryFilters.innerHTML = cats.map(cat => `
    <button 
      onclick="setCategory('${cat}')"
      class="px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-gaming-accent text-white' : 'text-gray-400 hover:text-white'}"
    >
      ${cat}
    </button>
  `).join('');
}

function setCategory(cat) {
  activeCategory = cat;
  renderCategories();
  applyFilters();
}

function applyFilters() {
  filteredGames = allGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery) || 
                          game.description.toLowerCase().includes(searchQuery);
    const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  renderGames();
}

function renderGames() {
  gameCount.textContent = filteredGames.length;
  
  if (filteredGames.length === 0) {
    gameGrid.innerHTML = `
      <div class="col-span-full py-20 text-center">
        <h3 class="text-xl font-display font-bold text-white mb-2">No Entries Found</h3>
        <p class="text-gray-500">Try adjusting your filters.</p>
      </div>
    `;
    return;
  }

  gameGrid.innerHTML = filteredGames.map(game => `
    <div class="gaming-card rounded-2xl overflow-hidden cursor-pointer flex flex-col group" onclick="openGame('${game.id}')">
      <div class="relative aspect-video overflow-hidden">
        <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div class="p-4 bg-gaming-accent rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <i data-lucide="play" class="w-8 h-8 fill-current text-white"></i>
          </div>
        </div>
        <div class="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-widest border border-white/10">
          ${game.category}
        </div>
      </div>
      <div class="p-5 flex flex-col flex-grow">
        <h3 class="font-display text-lg font-bold text-white mb-2 group-hover:text-gaming-accent transition-colors">${game.title}</h3>
        <p class="text-sm text-gray-400 line-clamp-2 leading-relaxed flex-grow">${game.description}</p>
      </div>
    </div>
  `).join('');
  
  lucide.createIcons();
}

// Viewer Logic
window.openGame = function(id) {
  const game = allGames.find(g => g.id === id);
  if (!game) return;

  viewerTitle.textContent = game.title;
  gameIframe.src = game.iframeUrl;
  gameViewer.style.display = 'block';
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

window.closeViewer = function() {
  gameViewer.style.display = 'none';
  gameIframe.src = '';
  document.body.style.overflow = 'auto';
}

window.reloadGame = function() {
  const currentSrc = gameIframe.src;
  gameIframe.src = '';
  setTimeout(() => gameIframe.src = currentSrc, 50);
}

window.toggleFullScreen = function() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

window.resetView = function() {
  activeCategory = 'All';
  searchQuery = '';
  searchInput.value = '';
  renderCategories();
  applyFilters();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.playRandom = function() {
  const randomIndex = Math.floor(Math.random() * allGames.length);
  openGame(allGames[randomIndex].id);
}

init();
