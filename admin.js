// ===== SISTEMA DE ADMINISTRAÇÃO =====
// Configurações padrão
const DEFAULT_PASSWORD = 'admin123';
const ADMIN_STORAGE_KEY = 'clickArtes_adminSettings';

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
    checkAutoDarkMode();
    updateGreeting();
    setInterval(updateGreeting, 60000); // Atualiza a cada minuto
    setInterval(checkAutoDarkMode, 60000); // Verifica modo escuro a cada minuto
    initializeDragAndDrop();
});

// ===== NAVEGAÇÃO PARA GALERIA POR TEMA =====
function navigateToGalleryTheme(theme) {
    // Navegar para a página da galeria
    showPage('galeria');
    
    // Aguardar um pouco para a página carregar
    setTimeout(() => {
        filterGallery(theme);
        // Scroll suave para a galeria
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 100);
}

function initializeAdmin() {
    loadAdminSettings();
    loadAdminPhotos();
    loadGalleryPhotos();
    loadYoutubeVideo();
}

// ===== SAUDAÇÕES POR HORÁRIO =====
function updateGreeting() {
    const greetingElement = document.getElementById('greetingMessage');
    if (!greetingElement) return;

    const now = new Date();
    const hour = now.getHours();
    let greeting = '';
    let icon = '';

    if (hour >= 5 && hour < 12) {
        greeting = 'Bom dia';
        icon = '🌅';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Boa tarde';
        icon = '☀️';
    } else {
        greeting = 'Boa noite';
        icon = '🌙';
    }

    greetingElement.innerHTML = `${icon} ${greeting}! Bem-vindo(a) ao painel administrativo`;
}

// ===== MODO ESCURO AUTOMÁTICO =====
function checkAutoDarkMode() {
    const settings = getAdminSettings();
    if (!settings.autoDarkMode) return;

    const now = new Date();
    const hour = now.getHours();
    const shouldBeDark = hour >= 18 || hour < 6; // Escuro entre 18h e 6h

    const html = document.documentElement;
    const isDark = html.classList.contains('dark-mode');

    if (shouldBeDark && !isDark) {
        toggleTheme();
    } else if (!shouldBeDark && isDark) {
        toggleTheme();
    }
}

function toggleAutoDarkMode() {
    const settings = getAdminSettings();
    settings.autoDarkMode = document.getElementById('autoDarkMode').checked;
    saveAdminSettings(settings);
    
    showNotification(
        settings.autoDarkMode 
            ? 'Modo escuro automático ativado!' 
            : 'Modo escuro automático desativado!',
        'success'
    );
    
    checkAutoDarkMode();
}

// ===== SISTEMA DE LOGIN =====
function openAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    modal.classList.add('show');
    updateGreeting();
}

function closeAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    modal.classList.remove('show');
    document.getElementById('adminPassword').value = '';
}

function adminLogin(event) {
    event.preventDefault();
    
    const password = document.getElementById('adminPassword').value;
    const settings = getAdminSettings();
    const storedPassword = settings.password || DEFAULT_PASSWORD;
    
    if (password === storedPassword) {
        closeAdminLogin();
        openAdminPanel();
    } else {
        showNotification('Senha incorreta! Tente novamente.', 'error');
        document.getElementById('adminPassword').value = '';
    }
}

// ===== PAINEL ADMINISTRATIVO =====
function openAdminPanel() {
    const panel = document.getElementById('adminPanel');
    panel.classList.add('show');
    loadCurrentColors();
    loadAutoDarkModeState();
    loadAdminPhotos();
    document.body.style.overflow = 'hidden';
}

function closeAdminPanel() {
    const panel = document.getElementById('adminPanel');
    panel.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function showAdminTab(tabName) {
    // Esconder todas as tabs
    const tabs = document.querySelectorAll('.admin-tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Desativar todos os botões
    const buttons = document.querySelectorAll('.admin-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Mostrar tab selecionada
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Ativar botão correspondente
    event.target.closest('.admin-tab-btn').classList.add('active');
}

// ===== GERENCIAMENTO DE CORES =====
function loadCurrentColors() {
    const settings = getAdminSettings();
    
    // Cores modo claro
    document.getElementById('lightBgColor').value = settings.colors?.light?.bg || '#FFFFFF';
    document.getElementById('lightTextColor').value = settings.colors?.light?.text || '#333333';
    document.getElementById('lightPrimaryColor').value = settings.colors?.light?.primary || '#B8A7D4';
    document.getElementById('lightSecondaryColor').value = settings.colors?.light?.secondary || '#A8D8EA';
    
    // Cores modo escuro
    document.getElementById('darkBgColor').value = settings.colors?.dark?.bg || '#1A1A1A';
    document.getElementById('darkTextColor').value = settings.colors?.dark?.text || '#E8E8E8';
    document.getElementById('darkPrimaryColor').value = settings.colors?.dark?.primary || '#4A3F6B';
    document.getElementById('darkSecondaryColor').value = settings.colors?.dark?.secondary || '#4A5F7F';
}

function loadAutoDarkModeState() {
    const settings = getAdminSettings();
    document.getElementById('autoDarkMode').checked = settings.autoDarkMode || false;
}

function updateColors() {
    const settings = getAdminSettings();
    
    // Obter cores dos inputs
    settings.colors = {
        light: {
            bg: document.getElementById('lightBgColor').value,
            text: document.getElementById('lightTextColor').value,
            primary: document.getElementById('lightPrimaryColor').value,
            secondary: document.getElementById('lightSecondaryColor').value
        },
        dark: {
            bg: document.getElementById('darkBgColor').value,
            text: document.getElementById('darkTextColor').value,
            primary: document.getElementById('darkPrimaryColor').value,
            secondary: document.getElementById('darkSecondaryColor').value
        }
    };
    
    saveAdminSettings(settings);
    applyColors();
    showNotification('Cores atualizadas com sucesso!', 'success');
}

function applyColors() {
    const settings = getAdminSettings();
    if (!settings.colors) return;
    
    const root = document.documentElement;
    const isDarkMode = root.classList.contains('dark-mode');
    
    if (isDarkMode) {
        root.style.setProperty('--branco', settings.colors.dark.bg);
        root.style.setProperty('--texto', settings.colors.dark.text);
        root.style.setProperty('--lilas', settings.colors.dark.primary);
        root.style.setProperty('--azul-claro', settings.colors.dark.secondary);
    } else {
        root.style.setProperty('--branco', settings.colors.light.bg);
        root.style.setProperty('--texto', settings.colors.light.text);
        root.style.setProperty('--lilas', settings.colors.light.primary);
        root.style.setProperty('--azul-claro', settings.colors.light.secondary);
    }
}

function resetColors() {
    if (!confirm('Tem certeza que deseja restaurar as cores padrão?')) return;
    
    const settings = getAdminSettings();
    delete settings.colors;
    saveAdminSettings(settings);
    
    // Resetar variáveis CSS
    const root = document.documentElement;
    root.style.removeProperty('--branco');
    root.style.removeProperty('--texto');
    root.style.removeProperty('--lilas');
    root.style.removeProperty('--azul-claro');
    
    loadCurrentColors();
    showNotification('Cores restauradas para o padrão!', 'success');
}

// ===== GERENCIAMENTO DE FOTOS TEMÁTICAS =====
let currentAdminThemeFilter = 'todos';

function addPhotoToGallery() {
    const theme = document.getElementById('photoTheme').value.trim();
    const url = document.getElementById('photoUrl').value.trim();
    const title = document.getElementById('photoTitle').value.trim();
    const description = document.getElementById('photoDescription').value.trim();
    
    if (!theme) {
        showNotification('Por favor, selecione um tema!', 'error');
        return;
    }
    
    if (!url) {
        showNotification('Por favor, insira a URL da foto ou arraste uma imagem!', 'error');
        return;
    }
    
    const settings = getAdminSettings();
    if (!settings.galleryPhotos) settings.galleryPhotos = [];
    
    settings.galleryPhotos.push({
        id: Date.now(),
        theme: theme,
        url: url,
        title: title || 'Sem título',
        description: description || ''
    });
    
    saveAdminSettings(settings);
    loadAdminPhotos();
    loadGalleryPhotos();
    
    // Limpar campos e preview
    document.getElementById('photoTheme').value = '';
    document.getElementById('photoUrl').value = '';
    document.getElementById('photoTitle').value = '';
    document.getElementById('photoDescription').value = '';
    clearPhotoPreview();
    
    showNotification('Foto adicionada com sucesso!', 'success');
}

function loadAdminPhotos() {
    const settings = getAdminSettings();
    const photosList = document.getElementById('adminPhotosList');
    
    if (!photosList) return;
    
    if (!settings.galleryPhotos || settings.galleryPhotos.length === 0) {
        photosList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Nenhuma foto adicionada ainda.</p>';
        return;
    }
    
    // Filtrar por tema
    let filteredPhotos = settings.galleryPhotos;
    if (currentAdminThemeFilter !== 'todos') {
        filteredPhotos = settings.galleryPhotos.filter(photo => photo.theme === currentAdminThemeFilter);
    }
    
    if (filteredPhotos.length === 0) {
        photosList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Nenhuma foto neste tema.</p>';
        return;
    }
    
    photosList.innerHTML = '';
    
    filteredPhotos.forEach(photo => {
        const themeEmoji = getThemeEmoji(photo.theme);
        const photoCard = document.createElement('div');
        photoCard.className = 'admin-photo-card';
        photoCard.dataset.photoId = photo.id;
        photoCard.innerHTML = `
            <span class="admin-photo-card-theme">${themeEmoji} ${getThemeName(photo.theme)}</span>
            <img src="${photo.url}" alt="${photo.title}" onerror="this.src='logo.png'">
            <div class="admin-photo-card-overlay">
                <h4 class="admin-photo-card-title">${photo.title}</h4>
                <div class="admin-photo-card-actions">
                    <button class="admin-photo-card-btn edit" onclick="editGalleryPhoto(${photo.id})" title="Editar foto">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="admin-photo-card-btn delete" onclick="deleteGalleryPhoto(${photo.id})" title="Remover foto">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        photosList.appendChild(photoCard);
    });
    
    // Tornar fotos arrastáveis para reordenação
    makePhotosDraggable();
}

function filterAdminPhotos(theme) {
    currentAdminThemeFilter = theme;
    
    // Atualizar botões
    document.querySelectorAll('.admin-theme-filter').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
    
    loadAdminPhotos();
}

function editGalleryPhoto(photoId) {
    const settings = getAdminSettings();
    const photo = settings.galleryPhotos.find(p => p.id === photoId);
    
    if (!photo) return;
    
    // Preencher os campos com os dados da foto
    document.getElementById('photoTheme').value = photo.theme;
    document.getElementById('photoUrl').value = photo.url;
    document.getElementById('photoTitle').value = photo.title;
    document.getElementById('photoDescription').value = photo.description;
    
    // Mostrar preview
    const photoPreview = document.getElementById('photoPreview');
    const photoPreviewContainer = document.getElementById('photoPreviewContainer');
    photoPreview.src = photo.url;
    photoPreviewContainer.style.display = 'block';
    
    // Scroll para o topo
    document.querySelector('.admin-panel-content').scrollTop = 0;
    
    // Remover a foto antiga antes de adicionar a editada
    deleteGalleryPhoto(photoId);
    
    showNotification('Foto carregada para edição! Faça as alterações e adicione novamente.', 'info');
}

function deleteGalleryPhoto(photoId) {
    if (!confirm('Tem certeza que deseja remover esta foto da galeria?')) return;
    
    const settings = getAdminSettings();
    settings.galleryPhotos = settings.galleryPhotos.filter(photo => photo.id !== photoId);
    saveAdminSettings(settings);
    loadAdminPhotos();
    loadGalleryPhotos();
    
    showNotification('Foto removida com sucesso!', 'success');
}

function getThemeEmoji(theme) {
    const emojis = {
        'gestante': '👶',
        'newborn': '❤️',
        'bebe': '😊',
        'familia': '👨‍👩‍👧‍👦',
        'smash': '🎂'
    };
    return emojis[theme] || '📷';
}

function getThemeName(theme) {
    const names = {
        'gestante': 'Gestante',
        'newborn': 'Newborn',
        'bebe': 'Bebê',
        'familia': 'Família',
        'smash': 'Smash'
    };
    return names[theme] || theme;
}

// ===== GALERIA PÚBLICA - FILTROS E VISUALIZAÇÃO =====
let currentGalleryFilter = 'todos';
let currentPhotoIndex = 0;
let filteredGalleryPhotos = [];

function loadGalleryPhotos() {
    const settings = getAdminSettings();
    const galleryGrid = document.getElementById('galleryGrid');
    const noPhotosMessage = document.getElementById('noPhotosMessage');
    
    if (!galleryGrid) return;
    
    if (!settings.galleryPhotos || settings.galleryPhotos.length === 0) {
        galleryGrid.innerHTML = '';
        if (noPhotosMessage) noPhotosMessage.style.display = 'block';
        return;
    }
    
    // Filtrar por tema
    filteredGalleryPhotos = currentGalleryFilter === 'todos' 
        ? settings.galleryPhotos 
        : settings.galleryPhotos.filter(photo => photo.theme === currentGalleryFilter);
    
    if (filteredGalleryPhotos.length === 0) {
        galleryGrid.innerHTML = '';
        if (noPhotosMessage) noPhotosMessage.style.display = 'block';
        return;
    }
    
    if (noPhotosMessage) noPhotosMessage.style.display = 'none';
    galleryGrid.innerHTML = '';
    
    filteredGalleryPhotos.forEach((photo, index) => {
        const themeEmoji = getThemeEmoji(photo.theme);
        const photoItem = document.createElement('div');
        photoItem.className = 'gallery-item';
        photoItem.onclick = () => openPhotoModal(index);
        photoItem.innerHTML = `
            <span class="gallery-item-theme">${themeEmoji} ${getThemeName(photo.theme)}</span>
            <img src="${photo.url}" alt="${photo.title}" onerror="this.src='logo.png'">
            <div class="gallery-item-overlay">
                <div class="gallery-item-title">${photo.title}</div>
                ${photo.description ? `<div class="gallery-item-description">${photo.description}</div>` : ''}
            </div>
        `;
        galleryGrid.appendChild(photoItem);
    });
}

function filterGallery(theme) {
    currentGalleryFilter = theme;
    
    // Atualizar botões
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
    
    loadGalleryPhotos();
}

// ===== MODAL DE VISUALIZAÇÃO DE FOTO =====
function openPhotoModal(index) {
    currentPhotoIndex = index;
    const photo = filteredGalleryPhotos[index];
    
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage.src = photo.url;
    modalTitle.textContent = photo.title;
    modalDescription.textContent = photo.description;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    loadModalThumbnails();
}

function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function navigatePhoto(direction) {
    currentPhotoIndex += direction;
    
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = filteredGalleryPhotos.length - 1;
    } else if (currentPhotoIndex >= filteredGalleryPhotos.length) {
        currentPhotoIndex = 0;
    }
    
    const photo = filteredGalleryPhotos[currentPhotoIndex];
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage.src = photo.url;
    modalTitle.textContent = photo.title;
    modalDescription.textContent = photo.description;
    
    updateActiveThumbnail();
}

function loadModalThumbnails() {
    const thumbnailsContainer = document.getElementById('modalThumbnails');
    if (!thumbnailsContainer) return;
    
    thumbnailsContainer.innerHTML = '';
    
    filteredGalleryPhotos.forEach((photo, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'photo-modal-thumbnail';
        if (index === currentPhotoIndex) {
            thumbnail.classList.add('active');
        }
        thumbnail.onclick = () => {
            currentPhotoIndex = index;
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            
            modalImage.src = photo.url;
            modalTitle.textContent = photo.title;
            modalDescription.textContent = photo.description;
            
            updateActiveThumbnail();
        };
        
        thumbnail.innerHTML = `<img src="${photo.url}" alt="${photo.title}">`;
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function updateActiveThumbnail() {
    document.querySelectorAll('.photo-modal-thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentPhotoIndex);
    });
}

// Fechar modal ao pressionar ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePhotoModal();
    }
});

// Navegação com setas do teclado
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('photoModal');
    if (!modal || !modal.classList.contains('show')) return;
    
    if (e.key === 'ArrowLeft') {
        navigatePhoto(-1);
    } else if (e.key === 'ArrowRight') {
        navigatePhoto(1);
    }
});

// ===== DRAG AND DROP DE IMAGENS =====
function initializeDragAndDrop() {
    const dropZone = document.getElementById('photoDropZone');
    if (!dropZone) return;
    
    // Prevenir comportamento padrão
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight da drop zone
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle drop
    dropZone.addEventListener('drop', handleDrop, false);
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    const dropZone = document.getElementById('photoDropZone');
    dropZone.classList.add('dragover');
}

function unhighlight(e) {
    const dropZone = document.getElementById('photoDropZone');
    dropZone.classList.remove('dragover');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        handleFiles(files);
    }
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFiles(files);
    }
}

function handleFiles(files) {
    const file = files[0];
    
    if (!file.type.startsWith('image/')) {
        showNotification('Por favor, selecione apenas arquivos de imagem!', 'error');
        return;
    }
    
    // Mostrar preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const photoUrl = document.getElementById('photoUrl');
        const photoPreview = document.getElementById('photoPreview');
        const photoPreviewContainer = document.getElementById('photoPreviewContainer');
        
        photoUrl.value = e.target.result; // Base64 da imagem
        photoPreview.src = e.target.result;
        photoPreviewContainer.style.display = 'block';
        
        showNotification('Imagem carregada! Preencha o tema e adicione à galeria.', 'success');
    };
    reader.readAsDataURL(file);
}

function clearPhotoPreview() {
    const photoUrl = document.getElementById('photoUrl');
    const photoPreview = document.getElementById('photoPreview');
    const photoPreviewContainer = document.getElementById('photoPreviewContainer');
    const photoFileInput = document.getElementById('photoFileInput');
    
    photoUrl.value = '';
    photoPreview.src = '';
    photoPreviewContainer.style.display = 'none';
    photoFileInput.value = '';
}

// ===== REORDENAR FOTOS (DRAG AND DROP NA LISTA) =====
let draggedPhotoId = null;

function makePhotosDraggable() {
    const photoCards = document.querySelectorAll('.admin-photo-card');
    
    photoCards.forEach(card => {
        card.setAttribute('draggable', 'true');
        
        card.addEventListener('dragstart', function(e) {
            draggedPhotoId = parseInt(this.dataset.photoId);
            this.style.opacity = '0.5';
        });
        
        card.addEventListener('dragend', function(e) {
            this.style.opacity = '1';
        });
        
        card.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.border = '2px dashed var(--lilas)';
        });
        
        card.addEventListener('dragleave', function(e) {
            this.style.border = 'none';
        });
        
        card.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.border = 'none';
            
            const targetPhotoId = parseInt(this.dataset.photoId);
            
            if (draggedPhotoId !== targetPhotoId) {
                reorderPhotos(draggedPhotoId, targetPhotoId);
            }
        });
    });
}

function reorderPhotos(draggedId, targetId) {
    const settings = getAdminSettings();
    const photos = settings.galleryPhotos;
    
    const draggedIndex = photos.findIndex(p => p.id === draggedId);
    const targetIndex = photos.findIndex(p => p.id === targetId);
    
    // Remover foto da posição original
    const [draggedPhoto] = photos.splice(draggedIndex, 1);
    
    // Inserir na nova posição
    photos.splice(targetIndex, 0, draggedPhoto);
    
    settings.galleryPhotos = photos;
    saveAdminSettings(settings);
    
    loadAdminPhotos();
    loadGalleryPhotos();
    
    showNotification('Ordem das fotos atualizada!', 'success');
}

// ===== GERENCIAMENTO DE VÍDEO YOUTUBE =====
function updateYoutubeVideo() {
    const url = document.getElementById('youtubeUrl').value.trim();
    
    if (!url) {
        showNotification('Por favor, insira a URL do vídeo!', 'error');
        return;
    }
    
    // Extrair ID do vídeo
    const videoId = extractYoutubeId(url);
    
    if (!videoId) {
        showNotification('URL do YouTube inválida!', 'error');
        return;
    }
    
    const settings = getAdminSettings();
    settings.youtubeVideoId = videoId;
    saveAdminSettings(settings);
    
    loadYoutubeVideo();
    showNotification('Vídeo atualizado com sucesso!', 'success');
}

function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function loadYoutubeVideo() {
    const settings = getAdminSettings();
    const videoPreview = document.getElementById('videoPreview');
    
    if (!videoPreview) return;
    
    if (!settings.youtubeVideoId) {
        videoPreview.innerHTML = '<p style="color: #666;">Nenhum vídeo configurado ainda</p>';
        return;
    }
    
    videoPreview.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${settings.youtubeVideoId}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
    
    // Atualizar vídeo na página principal se existir
    updateMainPageVideo(settings.youtubeVideoId);
}

function updateMainPageVideo(videoId) {
    const videoSection = document.querySelector('.video-container iframe');
    if (videoSection) {
        videoSection.src = `https://www.youtube.com/embed/${videoId}`;
    }
}

// ===== GERENCIAMENTO DE SENHA =====
function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const settings = getAdminSettings();
    const storedPassword = settings.password || DEFAULT_PASSWORD;
    
    // Validações
    if (currentPassword !== storedPassword) {
        showNotification('Senha atual incorreta!', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('A nova senha deve ter pelo menos 6 caracteres!', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('As senhas não coincidem!', 'error');
        return;
    }
    
    // Atualizar senha
    settings.password = newPassword;
    saveAdminSettings(settings);
    
    // Limpar campos
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    showNotification('Senha alterada com sucesso!', 'success');
}

// ===== EXPORTAR / IMPORTAR CONFIGURAÇÕES =====
function exportSettings() {
    const settings = getAdminSettings();
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `clickartes_config_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Configurações exportadas com sucesso!', 'success');
}

function importSettings(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const settings = JSON.parse(e.target.result);
            saveAdminSettings(settings);
            
            // Recarregar interface
            loadCurrentColors();
            loadAdminPhotos();
            loadGalleryPhotos();
            loadYoutubeVideo();
            loadAutoDarkModeState();
            applyColors();
            
            showNotification('Configurações importadas com sucesso!', 'success');
        } catch (error) {
            showNotification('Erro ao importar configurações!', 'error');
        }
    };
    reader.readAsText(file);
    
    // Limpar input
    event.target.value = '';
}

function clearCache() {
    if (!confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita!')) return;
    
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    showNotification('Cache limpo! Recarregando página...', 'success');
    
    setTimeout(() => {
        location.reload();
    }, 1500);
}

// ===== SISTEMA DE ARMAZENAMENTO =====
function getAdminSettings() {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

function saveAdminSettings(settings) {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(settings));
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    // Remover notificação anterior se existir
    const existingNotification = document.querySelector('.admin-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adicionar estilos para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .admin-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    }
    
    .admin-notification.show {
        transform: translateX(0);
    }
    
    .admin-notification-success {
        border-left: 4px solid #28a745;
        color: #28a745;
    }
    
    .admin-notification-error {
        border-left: 4px solid #dc3545;
        color: #dc3545;
    }
    
    .admin-notification-info {
        border-left: 4px solid #17a2b8;
        color: #17a2b8;
    }
    
    .admin-notification i {
        font-size: 1.5rem;
    }
    
    .admin-notification span {
        color: #333;
        font-size: 0.95rem;
    }
`;
document.head.appendChild(notificationStyles);

// ===== CARREGAR CORES SALVAS AO INICIAR =====
window.addEventListener('DOMContentLoaded', function() {
    applyColors();
});

// Aplicar cores quando o tema é alterado
const originalToggleTheme = window.toggleTheme;
if (originalToggleTheme) {
    window.toggleTheme = function() {
        originalToggleTheme();
        setTimeout(applyColors, 50);
    };
}
