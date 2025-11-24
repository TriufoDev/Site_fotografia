// ===== VISUAL EDITOR - MODO DE EDIÇÃO ESTILO WIX =====

let isEditMode = false;
let selectedElement = null;
let editHistory = [];
let originalContent = {};

// ===== ATIVAR/DESATIVAR EDITOR VISUAL =====
function activateVisualEditor() {
    isEditMode = true;
    
    // Fechar painel admin
    closeAdminPanel();
    
    // Mostrar toolbar
    const toolbar = document.getElementById('visualEditorToolbar');
    toolbar.classList.add('show');
    
    // Adicionar classe de modo de edição ao body
    document.body.classList.add('edit-mode');
    
    // Salvar conteúdo original
    saveOriginalContent();
    
    // Tornar elementos editáveis
    makeElementsEditable();
    
    // Mostrar tutorial na primeira vez
    const hasSeenTutorial = localStorage.getItem('visualEditor_tutorialSeen');
    if (!hasSeenTutorial) {
        setTimeout(() => {
            showQuickTutorial();
            localStorage.setItem('visualEditor_tutorialSeen', 'true');
        }, 500);
    }
    
    showNotification('✨ Editor Visual ativado! Edite e depois exporte para o GitHub.', 'success');
}

function showQuickTutorial() {
    const tutorial = `
        <div style="text-align: left; padding: 1.5rem;">
            <h3 style="color: var(--lilas); margin-bottom: 1.5rem; text-align: center;">
                <i class="fas fa-graduation-cap"></i> Tutorial Rápido
            </h3>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                <h4 style="margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-info-circle"></i> Como Funciona?
                </h4>
                <p style="margin: 0; line-height: 1.8;">
                    Este editor permite modificar o site visualmente, mas as alterações são salvas 
                    apenas no seu navegador. Para aplicar no site público (GitHub/Netlify), 
                    você precisa exportar e fazer upload manual.
                </p>
            </div>
            
            <div style="display: grid; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; gap: 1rem; align-items: start;">
                    <div style="background: var(--lilas); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
                    <div>
                        <strong style="color: var(--lilas);">Edite o Site</strong>
                        <p style="margin: 0.3rem 0 0 0; color: #666;">Clique nos textos e imagens para editar. Use os botões da toolbar para adicionar seções.</p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; align-items: start;">
                    <div style="background: var(--azul-claro); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
                    <div>
                        <strong style="color: var(--azul-claro);">Salve Localmente</strong>
                        <p style="margin: 0.3rem 0 0 0; color: #666;">Clique em "Salvar Localmente" para criar um backup no seu navegador.</p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; align-items: start;">
                    <div style="background: #28a745; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
                    <div>
                        <strong style="color: #28a745;">Exportar HTML</strong>
                        <p style="margin: 0.3rem 0 0 0; color: #666;">Clique em "Exportar HTML" para baixar o arquivo editado.</p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; align-items: start;">
                    <div style="background: #17a2b8; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</div>
                    <div>
                        <strong style="color: #17a2b8;">Publicar no GitHub</strong>
                        <p style="margin: 0.3rem 0 0 0; color: #666;">Substitua o arquivo index.html no GitHub. O Netlify atualiza automaticamente!</p>
                    </div>
                </div>
            </div>
            
            <div style="background: #fff3cd; padding: 1rem; border-radius: 10px; border-left: 4px solid #ffc107;">
                <strong>⚠️ Importante:</strong> As edições ficam apenas no seu navegador até você exportar e fazer upload no GitHub!
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'admin-modal show';
    modal.innerHTML = `
        <div class="admin-modal-content" style="max-width: 650px;">
            <span class="admin-close" onclick="this.closest('.admin-modal').remove()">&times;</span>
            ${tutorial}
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                <button class="admin-btn" onclick="showGitHubInstructions(); this.closest('.admin-modal').remove();" style="flex: 1;">
                    <i class="fab fa-github"></i> Ver Instruções Detalhadas
                </button>
                <button class="admin-btn" onclick="this.closest('.admin-modal').remove()" style="flex: 1;">
                    <i class="fas fa-check"></i> Começar a Editar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function deactivateVisualEditor() {
    if (!confirm('Deseja sair do modo de edição? Alterações não salvas serão perdidas.')) return;
    
    isEditMode = false;
    
    // Ocultar toolbar
    const toolbar = document.getElementById('visualEditorToolbar');
    toolbar.classList.remove('show');
    
    // Remover classe de modo de edição
    document.body.classList.remove('edit-mode');
    
    // Remover editabilidade dos elementos
    removeElementsEditability();
    
    // Restaurar conteúdo original
    restoreOriginalContent();
    
    showNotification('Modo de edição desativado.', 'info');
}

// ===== EXPORTAR HTML EDITADO =====
function exportEditedHTML() {
    if (!isEditMode) {
        showNotification('Ative o modo de edição primeiro!', 'error');
        return;
    }
    
    // Clonar o documento para não afetar a página atual
    const clonedDoc = document.documentElement.cloneNode(true);
    
    // Remover elementos do editor
    const editElements = clonedDoc.querySelectorAll('.visual-editor-toolbar, .visual-editor-highlight, .edit-mode-indicator, #visualEditorToolbar');
    editElements.forEach(el => el.remove());
    
    // Remover classes de edição
    clonedDoc.querySelector('body')?.classList.remove('edit-mode');
    const editableElements = clonedDoc.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(el => {
        el.removeAttribute('contenteditable');
        el.classList.remove('editable-element');
    });
    
    // Gerar HTML completo
    const htmlContent = '<!DOCTYPE html>\n' + clonedDoc.outerHTML;
    
    // Criar blob e download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `index_editado_${new Date().getTime()}.html`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('HTML exportado! Substitua o arquivo no GitHub.', 'success');
}

// ===== SALVAR NO LOCALSTORAGE (BACKUP) =====
function saveToLocalStorage() {
    if (!isEditMode) {
        showNotification('Ative o modo de edição primeiro!', 'error');
        return;
    }
    
    const editedContent = {
        timestamp: new Date().toISOString(),
        body: document.body.innerHTML,
        title: document.title
    };
    
    localStorage.setItem('visualEditor_backup', JSON.stringify(editedContent));
    showNotification('Alterações salvas localmente! Use "Exportar HTML" para subir ao GitHub.', 'success');
}

// ===== RESTAURAR DO LOCALSTORAGE =====
function restoreFromLocalStorage() {
    const backup = localStorage.getItem('visualEditor_backup');
    
    if (!backup) {
        showNotification('Nenhum backup encontrado!', 'error');
        return;
    }
    
    if (!confirm('Deseja restaurar o backup salvo? Isso substituirá o conteúdo atual.')) return;
    
    try {
        const editedContent = JSON.parse(backup);
        document.body.innerHTML = editedContent.body;
        document.title = editedContent.title;
        
        // Reinicializar scripts
        initializeAdmin();
        loadGalleryPhotos();
        
        showNotification('Backup restaurado com sucesso!', 'success');
    } catch (error) {
        showNotification('Erro ao restaurar backup!', 'error');
    }
}

// ===== INSTRUÇÕES PARA GITHUB/NETLIFY =====
function showGitHubInstructions() {
    const instructions = `
        <div style="text-align: left; padding: 1.5rem;">
            <h3 style="color: var(--lilas); margin-bottom: 1.5rem; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <i class="fab fa-github"></i> Como Publicar no GitHub/Netlify
            </h3>
            
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 1.2rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: center;">
                <strong style="font-size: 1.1rem;">⚠️ IMPORTANTE</strong>
                <p style="margin: 0.5rem 0 0 0;">
                    As edições ficam apenas no seu navegador!<br>
                    Siga os passos abaixo para publicar no site.
                </p>
            </div>
            
            <div style="display: grid; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; gap: 1rem; align-items: start; background: #f8f9fa; padding: 1rem; border-radius: 10px; border-left: 4px solid var(--lilas);">
                    <div style="background: var(--lilas); color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
                    <div>
                        <strong style="color: var(--lilas); font-size: 1.05rem;">Salvar Localmente</strong>
                        <p style="margin: 0.3rem 0 0 0; color: #666;">
                            Clique no botão <strong>"💾 Salvar Localmente"</strong> na toolbar para criar um backup.
                        </p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; align-items: start; background: #f8f9fa; padding: 1rem; border-radius: 10px; border-left: 4px solid #28a745;">
                    <div style="background: #28a745; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
                    <div>
                        <strong style="color: #28a745; font-size: 1.05rem;">Exportar HTML</strong>
                        <p style="margin: 0.3rem 0 0 0; color: #666;">
                            Clique em <strong>"⬇️ Exportar HTML"</strong>. Um arquivo será baixado automaticamente.
                        </p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; align-items: start; background: #f8f9fa; padding: 1rem; border-radius: 10px; border-left: 4px solid #17a2b8;">
                    <div style="background: #17a2b8; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
                    <div>
                        <strong style="color: #17a2b8; font-size: 1.05rem;">Abrir GitHub</strong>
                        <p style="margin: 0.3rem 0 0.5rem 0; color: #666;">
                            Acesse seu repositório:
                        </p>
                        <code style="background: white; padding: 0.5rem; border-radius: 5px; display: block; color: #e83e8c; font-size: 0.9rem;">
                            github.com/TriufoDev/click-artes-fotografia
                        </code>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; align-items: start; background: #f8f9fa; padding: 1rem; border-radius: 10px; border-left: 4px solid #ffc107;">
                    <div style="background: #ffc107; color: #333; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</div>
                    <div>
                        <strong style="color: #ffc107; font-size: 1.05rem;">Editar no GitHub</strong>
                        <p style="margin: 0.3rem 0 0 0; color: #666;">
                            Clique em <code style="background: white; padding: 0.2rem 0.5rem; border-radius: 3px;">index.html</code> → 
                            Ícone <strong>✏️ lápis</strong> → Selecione tudo (Ctrl+A)
                        </p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; align-items: start; background: #f8f9fa; padding: 1rem; border-radius: 10px; border-left: 4px solid #dc3545;">
                    <div style="background: #dc3545; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">5</div>
                    <div>
                        <strong style="color: #dc3545; font-size: 1.05rem;">Substituir e Salvar</strong>
                        <p style="margin: 0.3rem 0 0 0; color: #666;">
                            Cole o conteúdo do arquivo exportado → Role para baixo → 
                            Clique em <strong>"Commit changes"</strong>
                        </p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; align-items: start; background: #f8f9fa; padding: 1rem; border-radius: 10px; border-left: 4px solid #6f42c1;">
                    <div style="background: #6f42c1; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">6</div>
                    <div>
                        <strong style="color: #6f42c1; font-size: 1.05rem;">Aguardar Deploy</strong>
                        <p style="margin: 0.3rem 0 0 0; color: #666;">
                            O Netlify atualizará automaticamente em <strong>2-3 minutos</strong>! 🚀
                        </p>
                    </div>
                </div>
            </div>
            
            <div style="background: #d4edda; padding: 1rem; border-radius: 10px; border-left: 4px solid #28a745;">
                <strong style="color: #155724;">✅ Pronto!</strong> Seu site estará atualizado.
            </div>
            
            <div style="background: #fff3cd; padding: 1rem; border-radius: 10px; margin-top: 1rem; border-left: 4px solid #ffc107;">
                <strong style="color: #856404;">💡 Dica Profissional:</strong>
                <p style="margin: 0.5rem 0 0 0; color: #856404;">
                    Instale o <a href="https://desktop.github.com/" target="_blank" style="color: #17a2b8; text-decoration: underline;">GitHub Desktop</a> 
                    para facilitar! Basta substituir o arquivo e fazer commit.
                </p>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'admin-modal show';
    modal.innerHTML = `
        <div class="admin-modal-content" style="max-width: 700px; max-height: 90vh; overflow-y: auto;">
            <span class="admin-close" onclick="this.closest('.admin-modal').remove()">&times;</span>
            ${instructions}
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem; padding: 0 1.5rem 1.5rem;">
                <button class="admin-btn admin-btn-success" onclick="exportEditedHTML(); this.closest('.admin-modal').remove();" style="flex: 1;">
                    <i class="fas fa-download"></i> Exportar Agora
                </button>
                <button class="admin-btn" onclick="this.closest('.admin-modal').remove()" style="flex: 1;">
                    <i class="fas fa-check"></i> Entendi
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// ===== SALVAR E RESTAURAR CONTEÚDO =====
function saveOriginalContent() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
        originalContent.main = mainContent.innerHTML;
    }
}

function restoreOriginalContent() {
    const mainContent = document.querySelector('main');
    if (mainContent && originalContent.main) {
        mainContent.innerHTML = originalContent.main;
    }
}

function savePageChanges() {
    const settings = getAdminSettings();
    
    // Salvar conteúdo atual
    const mainContent = document.querySelector('main');
    if (mainContent) {
        settings.customContent = mainContent.innerHTML;
    }
    
    // Adicionar ao histórico
    editHistory.push({
        timestamp: new Date().toISOString(),
        content: settings.customContent
    });
    
    saveAdminSettings(settings);
    
    showNotification('Alterações salvas com sucesso!', 'success');
    updateChangesHistory();
}

function loadCustomContent() {
    const settings = getAdminSettings();
    
    if (settings.customContent) {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = settings.customContent;
        }
    }
}

function discardChanges() {
    if (!confirm('Deseja descartar todas as alterações não salvas?')) return;
    
    restoreOriginalContent();
    showNotification('Alterações descartadas.', 'info');
}

function previewChanges() {
    deactivateVisualEditor();
    showNotification('Visualizando alterações. Use o painel admin para voltar ao modo de edição.', 'info');
}

// ===== TORNAR ELEMENTOS EDITÁVEIS =====
function makeElementsEditable() {
    // Selecionar elementos editáveis
    const editableSelectors = 'h1, h2, h3, h4, h5, h6, p, a, button, .service-card, .gallery-item, img, .espaco-dedicado-item';
    const elements = document.querySelectorAll(editableSelectors);
    
    elements.forEach(element => {
        // Adicionar classe editável
        element.classList.add('editable-element');
        
        // Adicionar evento de clique
        element.addEventListener('click', handleElementClick);
        
        // Adicionar evento de hover
        element.addEventListener('mouseenter', handleElementHover);
        element.addEventListener('mouseleave', handleElementUnhover);
    });
}

function removeElementsEditability() {
    const elements = document.querySelectorAll('.editable-element');
    
    elements.forEach(element => {
        element.classList.remove('editable-element', 'element-hover', 'element-selected');
        element.removeEventListener('click', handleElementClick);
        element.removeEventListener('mouseenter', handleElementHover);
        element.removeEventListener('mouseleave', handleElementUnhover);
    });
}

function handleElementClick(e) {
    if (!isEditMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const element = e.currentTarget;
    
    // Remover seleção anterior
    if (selectedElement) {
        selectedElement.classList.remove('element-selected');
    }
    
    // Selecionar novo elemento
    selectedElement = element;
    element.classList.add('element-selected');
    
    // Mostrar menu de contexto
    showContextMenu(e);
}

function handleElementHover(e) {
    if (!isEditMode) return;
    e.currentTarget.classList.add('element-hover');
}

function handleElementUnhover(e) {
    if (!isEditMode) return;
    e.currentTarget.classList.remove('element-hover');
}

// ===== MENU DE CONTEXTO =====
function showContextMenu(e) {
    const menu = document.getElementById('elementContextMenu');
    menu.style.display = 'block';
    menu.style.left = e.pageX + 'px';
    menu.style.top = e.pageY + 'px';
    
    // Fechar menu ao clicar fora
    setTimeout(() => {
        document.addEventListener('click', closeContextMenu);
    }, 100);
}

function closeContextMenu() {
    const menu = document.getElementById('elementContextMenu');
    menu.style.display = 'none';
    document.removeEventListener('click', closeContextMenu);
}

// ===== EDITAR CONTEÚDO DO ELEMENTO =====
function editElementContent() {
    if (!selectedElement) return;
    
    closeContextMenu();
    
    const tagName = selectedElement.tagName.toLowerCase();
    
    if (tagName === 'img') {
        openEditImageModal();
    } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'button'].includes(tagName)) {
        openEditTextModal();
    } else {
        // Para outros elementos, tornar editável inline
        makeElementInlineEditable();
    }
}

function makeElementInlineEditable() {
    if (!selectedElement) return;
    
    selectedElement.contentEditable = true;
    selectedElement.focus();
    
    // Salvar ao sair do foco
    selectedElement.addEventListener('blur', function() {
        this.contentEditable = false;
        showNotification('Conteúdo atualizado. Lembre-se de salvar as alterações!', 'info');
    }, { once: true });
}

// ===== MODAL DE EDIÇÃO DE TEXTO =====
function openEditTextModal() {
    const modal = document.getElementById('editTextModal');
    const textContent = document.getElementById('editTextContent');
    const textSize = document.getElementById('editTextSize');
    const textColor = document.getElementById('editTextColor');
    
    // Preencher com valores atuais
    textContent.value = selectedElement.textContent;
    
    const computedStyle = window.getComputedStyle(selectedElement);
    textSize.value = parseInt(computedStyle.fontSize);
    textColor.value = rgbToHex(computedStyle.color);
    
    // Atualizar label do tamanho
    document.getElementById('textSizeValue').textContent = textSize.value + 'px';
    textSize.oninput = function() {
        document.getElementById('textSizeValue').textContent = this.value + 'px';
    };
    
    modal.classList.add('show');
}

function applyTextChanges() {
    if (!selectedElement) return;
    
    const textContent = document.getElementById('editTextContent').value;
    const textSize = document.getElementById('editTextSize').value;
    const textColor = document.getElementById('editTextColor').value;
    
    selectedElement.textContent = textContent;
    selectedElement.style.fontSize = textSize + 'px';
    selectedElement.style.color = textColor;
    
    closeEditModal();
    showNotification('Texto atualizado!', 'success');
}

function setTextAlign(align) {
    if (!selectedElement) return;
    selectedElement.style.textAlign = align;
}

// ===== MODAL DE EDIÇÃO DE IMAGEM =====
function openEditImageModal() {
    const modal = document.getElementById('editImageModal');
    const imageUrl = document.getElementById('editImageUrl');
    const imageAlt = document.getElementById('editImageAlt');
    const imageWidth = document.getElementById('editImageWidth');
    
    // Preencher com valores atuais
    imageUrl.value = selectedElement.src || '';
    imageAlt.value = selectedElement.alt || '';
    
    const computedWidth = window.getComputedStyle(selectedElement).width;
    const parentWidth = selectedElement.parentElement.offsetWidth;
    const widthPercent = (parseInt(computedWidth) / parentWidth) * 100;
    imageWidth.value = Math.round(widthPercent);
    
    // Atualizar label da largura
    document.getElementById('imageWidthValue').textContent = imageWidth.value + '%';
    imageWidth.oninput = function() {
        document.getElementById('imageWidthValue').textContent = this.value + '%';
    };
    
    // Inicializar drag and drop para imagem
    initImageDropZone();
    
    modal.classList.add('show');
}

function initImageDropZone() {
    const dropZone = document.getElementById('imageDropZone');
    const fileInput = document.getElementById('imageFileInput');
    
    dropZone.onclick = () => fileInput.click();
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('editImageUrl').value = e.target.result;
                showNotification('Imagem carregada!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });
    
    dropZone.addEventListener('drop', function(e) {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            fileInput.onchange({ target: { files: files } });
        }
    }, false);
}

function applyImageChanges() {
    if (!selectedElement) return;
    
    const imageUrl = document.getElementById('editImageUrl').value;
    const imageAlt = document.getElementById('editImageAlt').value;
    const imageWidth = document.getElementById('editImageWidth').value;
    
    if (imageUrl) {
        selectedElement.src = imageUrl;
    }
    
    selectedElement.alt = imageAlt;
    selectedElement.style.width = imageWidth + '%';
    
    closeEditModal();
    showNotification('Imagem atualizada!', 'success');
}

// ===== DUPLICAR ELEMENTO =====
function duplicateElement() {
    if (!selectedElement) return;
    
    closeContextMenu();
    
    const clone = selectedElement.cloneNode(true);
    selectedElement.parentNode.insertBefore(clone, selectedElement.nextSibling);
    
    // Tornar o clone editável
    clone.classList.add('editable-element');
    clone.addEventListener('click', handleElementClick);
    clone.addEventListener('mouseenter', handleElementHover);
    clone.addEventListener('mouseleave', handleElementUnhover);
    
    showNotification('Elemento duplicado!', 'success');
}

// ===== EXCLUIR ELEMENTO =====
function deleteElement() {
    if (!selectedElement) return;
    
    if (!confirm('Deseja realmente excluir este elemento?')) return;
    
    closeContextMenu();
    
    selectedElement.remove();
    selectedElement = null;
    
    showNotification('Elemento excluído!', 'success');
}

// ===== ALTERAR ESTILO DO ELEMENTO =====
function changeElementStyle() {
    if (!selectedElement) return;
    
    closeContextMenu();
    
    // Criar um painel de estilos simples
    const stylePanel = document.createElement('div');
    stylePanel.className = 'style-panel';
    stylePanel.innerHTML = `
        <h4>Estilo do Elemento</h4>
        <div class="style-controls">
            <label>Cor de Fundo:</label>
            <input type="color" id="styleBgColor" value="${rgbToHex(window.getComputedStyle(selectedElement).backgroundColor)}">
            
            <label>Espaçamento Interno:</label>
            <input type="range" id="stylePadding" min="0" max="50" value="${parseInt(window.getComputedStyle(selectedElement).padding)}">
            <span id="paddingValue"></span>
            
            <label>Borda Arredondada:</label>
            <input type="range" id="styleBorderRadius" min="0" max="50" value="${parseInt(window.getComputedStyle(selectedElement).borderRadius)}">
            <span id="borderRadiusValue"></span>
            
            <button class="admin-btn" onclick="applyStyleChanges()">Aplicar</button>
            <button class="admin-btn-secondary" onclick="closeStylePanel()">Fechar</button>
        </div>
    `;
    
    document.body.appendChild(stylePanel);
    
    // Atualizar valores
    const padding = document.getElementById('stylePadding');
    const borderRadius = document.getElementById('styleBorderRadius');
    
    padding.oninput = function() {
        document.getElementById('paddingValue').textContent = this.value + 'px';
        selectedElement.style.padding = this.value + 'px';
    };
    
    borderRadius.oninput = function() {
        document.getElementById('borderRadiusValue').textContent = this.value + 'px';
        selectedElement.style.borderRadius = this.value + 'px';
    };
    
    document.getElementById('styleBgColor').oninput = function() {
        selectedElement.style.backgroundColor = this.value;
    };
}

function closeStylePanel() {
    const panel = document.querySelector('.style-panel');
    if (panel) panel.remove();
}

// ===== ADICIONAR NOVOS ELEMENTOS =====
function addTextElement() {
    const text = prompt('Digite o texto:');
    if (!text) return;
    
    const p = document.createElement('p');
    p.textContent = text;
    p.className = 'editable-element';
    p.style.padding = '1rem';
    
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.appendChild(p);
        
        // Tornar editável
        p.addEventListener('click', handleElementClick);
        p.addEventListener('mouseenter', handleElementHover);
        p.addEventListener('mouseleave', handleElementUnhover);
        
        showNotification('Texto adicionado!', 'success');
    }
}

function addImageElement() {
    const url = prompt('Digite a URL da imagem:');
    if (!url) return;
    
    const img = document.createElement('img');
    img.src = url;
    img.className = 'editable-element';
    img.style.maxWidth = '100%';
    img.style.margin = '1rem';
    
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.appendChild(img);
        
        // Tornar editável
        img.addEventListener('click', handleElementClick);
        img.addEventListener('mouseenter', handleElementHover);
        img.addEventListener('mouseleave', handleElementUnhover);
        
        showNotification('Imagem adicionada!', 'success');
    }
}

function addButtonElement() {
    const text = prompt('Digite o texto do botão:');
    if (!text) return;
    
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'btn editable-element';
    button.style.margin = '1rem';
    
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.appendChild(button);
        
        // Tornar editável
        button.addEventListener('click', handleElementClick);
        button.addEventListener('mouseenter', handleElementHover);
        button.addEventListener('mouseleave', handleElementUnhover);
        
        showNotification('Botão adicionado!', 'success');
    }
}

// ===== ADICIONAR NOVA SEÇÃO =====
function addNewSection() {
    const modal = document.getElementById('addSectionModal');
    modal.classList.add('show');
}

function insertSection(type) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    
    let sectionHTML = '';
    
    switch(type) {
        case 'hero':
            sectionHTML = `
                <section class="hero editable-section" style="padding: 4rem 2rem; background: linear-gradient(135deg, var(--lilas), var(--azul-claro)); color: white; text-align: center;">
                    <h2 class="editable-element">Título do Hero</h2>
                    <p class="editable-element">Descrição do hero banner</p>
                    <button class="btn editable-element">Ação</button>
                </section>
            `;
            break;
        case 'text':
            sectionHTML = `
                <section class="editable-section" style="padding: 3rem 2rem; max-width: 1200px; margin: 0 auto;">
                    <h2 class="editable-element">Título da Seção</h2>
                    <p class="editable-element">Conteúdo de texto aqui. Clique para editar.</p>
                </section>
            `;
            break;
        case 'gallery':
            sectionHTML = `
                <section class="editable-section" style="padding: 3rem 2rem;">
                    <h2 class="editable-element" style="text-align: center;">Galeria</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                        <img src="https://via.placeholder.com/300" class="editable-element" style="width: 100%; border-radius: 10px;">
                        <img src="https://via.placeholder.com/300" class="editable-element" style="width: 100%; border-radius: 10px;">
                        <img src="https://via.placeholder.com/300" class="editable-element" style="width: 100%; border-radius: 10px;">
                    </div>
                </section>
            `;
            break;
        case 'cards':
            sectionHTML = `
                <section class="editable-section" style="padding: 3rem 2rem;">
                    <h2 class="editable-element" style="text-align: center;">Serviços</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem;">
                        <div class="editable-element" style="text-align: center; padding: 2rem; background: white; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                            <i class="fas fa-star" style="font-size: 3rem; color: var(--lilas);"></i>
                            <h3>Card 1</h3>
                            <p>Descrição do card</p>
                        </div>
                        <div class="editable-element" style="text-align: center; padding: 2rem; background: white; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                            <i class="fas fa-heart" style="font-size: 3rem; color: var(--lilas);"></i>
                            <h3>Card 2</h3>
                            <p>Descrição do card</p>
                        </div>
                    </div>
                </section>
            `;
            break;
        case 'blank':
            sectionHTML = `
                <section class="editable-section" style="padding: 3rem 2rem; min-height: 200px; background: #f5f5f5;">
                    <p class="editable-element" style="text-align: center; color: #999;">Seção em branco - Adicione seu conteúdo aqui</p>
                </section>
            `;
            break;
    }
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sectionHTML;
    const section = tempDiv.firstElementChild;
    
    mainContent.appendChild(section);
    
    // Tornar elementos editáveis
    const editableElements = section.querySelectorAll('.editable-element');
    editableElements.forEach(el => {
        el.addEventListener('click', handleElementClick);
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementUnhover);
    });
    
    // Tornar seção arrastável
    makeSectionDraggable(section);
    
    closeEditModal();
    showNotification('Seção adicionada!', 'success');
}

// ===== ARRASTAR E SOLTAR SEÇÕES =====
function makeSectionDraggable(section) {
    section.setAttribute('draggable', 'true');
    section.style.cursor = 'move';
    
    section.addEventListener('dragstart', function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        this.style.opacity = '0.4';
    });
    
    section.addEventListener('dragend', function(e) {
        this.style.opacity = '1';
    });
    
    section.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.style.borderTop = '3px solid var(--lilas)';
    });
    
    section.addEventListener('dragleave', function(e) {
        this.style.borderTop = '';
    });
    
    section.addEventListener('drop', function(e) {
        e.stopPropagation();
        this.style.borderTop = '';
        return false;
    });
}

// ===== FECHAR MODAIS =====
function closeEditModal() {
    const modals = document.querySelectorAll('.editor-modal');
    modals.forEach(modal => modal.classList.remove('show'));
}

function cancelEditing() {
    deactivateVisualEditor();
}

// ===== HISTÓRICO DE ALTERAÇÕES =====
function updateChangesHistory() {
    const historyContainer = document.getElementById('changesHistory');
    if (!historyContainer) return;
    
    if (editHistory.length === 0) {
        historyContainer.innerHTML = '<p style="text-align: center; color: #666;">Nenhuma alteração registrada ainda.</p>';
        return;
    }
    
    historyContainer.innerHTML = '';
    
    editHistory.slice().reverse().forEach((change, index) => {
        const item = document.createElement('div');
        item.className = 'history-item';
        const date = new Date(change.timestamp);
        item.innerHTML = `
            <div class="history-item-header">
                <i class="fas fa-history"></i>
                <span>${date.toLocaleString('pt-BR')}</span>
            </div>
            <button class="admin-btn-secondary" onclick="restoreVersion(${editHistory.length - 1 - index})">
                <i class="fas fa-undo"></i> Restaurar
            </button>
        `;
        historyContainer.appendChild(item);
    });
}

function restoreVersion(index) {
    if (!confirm('Deseja restaurar esta versão?')) return;
    
    const version = editHistory[index];
    const mainContent = document.querySelector('main');
    
    if (mainContent && version.content) {
        mainContent.innerHTML = version.content;
        showNotification('Versão restaurada!', 'success');
    }
}

// ===== UTILITÁRIOS =====
function rgbToHex(rgb) {
    if (!rgb) return '#000000';
    
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return '#000000';
    
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    
    return "#" + hex(match[1]) + hex(match[2]) + hex(match[3]);
}

// ===== INICIALIZAÇÃO =====
window.addEventListener('DOMContentLoaded', function() {
    // Carregar conteúdo customizado se existir
    loadCustomContent();
    
    // Tornar seções existentes arrastáveis quando em modo de edição
    document.addEventListener('click', function(e) {
        if (isEditMode && e.target.classList.contains('editable-section')) {
            makeSectionDraggable(e.target);
        }
    });
});
