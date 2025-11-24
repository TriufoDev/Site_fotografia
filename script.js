// ===== FUNÇÕES DE NAVEGAÇÃO =====
// Função para mostrar páginas diferentes
function showPage(pageName) {
    // Oculta todas as páginas
    const pages = document.querySelectorAll('.page');
    // Seleciona todos os elementos com classe page
    pages.forEach(page => {
        // Para cada página
        page.classList.remove('active');
        // Remove classe active (deixa oculta)
    });

    // Mostra a página selecionada
    const activePage = document.getElementById(pageName);
    // Encontra o elemento com o ID da página
    if (activePage) {
        // Se a página existe
        activePage.classList.add('active');
        // Adiciona classe active (deixa visível)
    }

    // Fecha menu mobile se estiver aberto
    const navLinks = document.getElementById('navLinks');
    // Seleciona o elemento de navegação
    if (navLinks) {
        // Se o elemento existe
        navLinks.classList.remove('active');
        // Remove classe active (fecha o menu)
    }

    // Scroll para o topo da página
    window.scrollTo(0, 0);
    // Volta para o topo da página
}

// Função para abrir/fechar menu em mobile
function toggleMenu() {
    // Alterna classe active no menu
    const navLinks = document.getElementById('navLinks');
    // Seleciona o elemento de navegação
    navLinks.classList.toggle('active');
    // Alterna classe active (abre/fecha)
}

// ===== FUNÇÕES DE TEMA ESCURO =====
// Função para alternar entre tema claro e escuro
function toggleTheme() {
    // Alterna classe dark-mode no elemento raiz (html)
    const html = document.documentElement;
    // Obtém o elemento HTML
    html.classList.toggle('dark-mode');
    // Alterna a classe dark-mode
    
    // Alterna classe no body também para garantir aplicação dos estilos
    document.body.classList.toggle('dark-mode');
    // Alterna a classe dark-mode no body
    
    // Alterna classe no header para mudar a cor do gradiente
    const header = document.querySelector('header');
    // Obtém o elemento header
    if (header) {
        // Se o header existe
        header.classList.toggle('dark-mode');
        // Alterna a classe dark-mode
    }
    
    // Alterna classe no footer para mudar a cor do gradiente
    const footer = document.querySelector('footer');
    // Obtém o elemento footer
    if (footer) {
        // Se o footer existe
        footer.classList.toggle('dark-mode');
        // Alterna a classe dark-mode
    }
    
    // Alterna o ícone entre lua e sol
    const themeIcon = document.getElementById('themeIcon');
    // Obtém o elemento do ícone
    if (themeIcon) {
        // Se o ícone existe
        themeIcon.classList.toggle('fa-moon');
        // Alterna classe fa-moon (lua)
        themeIcon.classList.toggle('fa-sun');
        // Alterna classe fa-sun (sol)
    }
    
    // Salva a preferência no localStorage
    const isDarkMode = html.classList.contains('dark-mode');
    // Verifica se o modo escuro está ativo
    localStorage.setItem('darkMode', isDarkMode);
    // Salva a preferência no armazenamento local
}

// Função para carregar tema salvo ao abrir a página
function loadTheme() {
    // Carrega o tema salvo no localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    // Obtém o valor salvo do localStorage
    if (isDarkMode) {
        // Se o modo escuro estava ativo
        // Alterna para modo escuro
        const html = document.documentElement;
        // Obtém o elemento HTML
        html.classList.add('dark-mode');
        // Adiciona classe dark-mode
        
        document.body.classList.add('dark-mode');
        // Adiciona classe dark-mode no body
        
        const header = document.querySelector('header');
        // Obtém o elemento header
        if (header) {
            // Se o header existe
            header.classList.add('dark-mode');
            // Adiciona classe dark-mode
        }
        
        const footer = document.querySelector('footer');
        // Obtém o elemento footer
        if (footer) {
            // Se o footer existe
            footer.classList.add('dark-mode');
            // Adiciona classe dark-mode
        }
        
        const themeIcon = document.getElementById('themeIcon');
        // Obtém o elemento do ícone
        if (themeIcon) {
            // Se o ícone existe
            themeIcon.classList.remove('fa-moon');
            // Remove classe fa-moon (lua)
            themeIcon.classList.add('fa-sun');
            // Adiciona classe fa-sun (sol)
        }
    }
}

// Carrega o tema ao iniciar a página
document.addEventListener('DOMContentLoaded', loadTheme);
// Executa loadTheme quando o DOM está pronto

// ===== FUNÇÕES DO FORMULÁRIO =====
// Função para atualizar campos adicionais baseado no serviço
function atualizarCamposAdicionais() {
    // Obtém o serviço selecionado
    const servico = document.getElementById('servico').value;
    // Pega o valor selecionado
    const camposContainer = document.getElementById('camposAdicionais');
    // Seleciona container de campos adicionais

    // Limpa conteúdo anterior
    camposContainer.innerHTML = '';
    // Remove HTML anterior

    // Define campos por serviço
    let campos = '';
    // Variável para armazenar HTML dos campos

    if (servico === 'Gestante') {
        // Se serviço é Gestante
        campos = `
            <h3>Informações da Gestante</h3>
            <!-- Título da seção -->
            <div class="form-group">
                <!-- Grupo do campo Semanas de Gestação -->
                <label for="semanas">Quantas semanas de gestação? *</label>
                <!-- Label da pergunta -->
                <input type="number" id="semanas" name="semanas" min="12" max="40" placeholder="Digite o número de semanas" required>
                <!-- Campo de número com mínimo 12 e máximo 40 semanas -->
            </div>
            <div class="form-group">
                <!-- Grupo do campo Tipo de Ensaio -->
                <label for="tipo_gestante">Tipo de Ensaio Preferido *</label>
                <!-- Label da pergunta -->
                <select id="tipo_gestante" name="tipo_gestante" required>
                    <!-- Dropdown para tipo de ensaio -->
                    <option value="">Selecione...</option>
                    <!-- Opção vazia -->
                    <option value="romantico">Romântico</option>
                    <!-- Opção de estilo -->
                    <option value="natural">Natural</option>
                    <!-- Opção de estilo -->
                    <option value="criativo">Criativo</option>
                    <!-- Opção de estilo -->
                    <option value="familia">Com a Família</option>
                    <!-- Opção de estilo -->
                </select>
            </div>
        `;
        // HTML com campos específicos para Gestante
    } 
    else if (servico === 'Newborn') {
        // Se serviço é Newborn
        campos = `
            <h3>Informações do Newborn</h3>
            <!-- Título da seção -->
            <div class="form-group">
                <!-- Grupo do campo Idade do Bebê -->
                <label for="idade_bebe">Idade do Bebê (em dias) *</label>
                <!-- Label da pergunta -->
                <input type="number" id="idade_bebe" name="idade_bebe" min="0" max="14" placeholder="Ideal entre 5 a 14 dias" required>
                <!-- Campo de número para idade em dias -->
            </div>
            <div class="form-group">
                <!-- Grupo do campo Tema/Cores -->
                <label for="tema_cores">Tema ou Cores Preferidas *</label>
                <!-- Label da pergunta -->
                <input type="text" id="tema_cores" name="tema_cores" placeholder="Ex: Tons pastel, azul, rosa, neutro..." required>
                <!-- Campo de texto para tema ou cores -->
            </div>
        `;
        // HTML com campos específicos para Newborn
    } 
    else if (servico === 'Batizado') {
        // Se serviço é Batizado
        campos = `
            <h3>Informações do Batizado</h3>
            <!-- Título da seção -->
            <div class="form-group">
                <!-- Grupo do campo Local do Batizado -->
                <label for="local_batizado">Local do Batizado *</label>
                <!-- Label da pergunta -->
                <input type="text" id="local_batizado" name="local_batizado" placeholder="Ex: Igreja São José, Capela..." required>
                <!-- Campo de texto para local -->
            </div>
            <div class="form-group">
                <!-- Grupo do campo Horário do Evento -->
                <label for="horario_evento">Horário do Evento *</label>
                <!-- Label da pergunta -->
                <input type="time" id="horario_evento" name="horario_evento" required>
                <!-- Campo de hora para horário do evento -->
            </div>
        `;
        // HTML com campos específicos para Batizado
    } 
    else if (servico === 'Aniversário') {
        // Se serviço é Aniversário
        campos = `
            <h3>Informações do Aniversário</h3>
            <!-- Título da seção -->
            <div class="form-group">
                <!-- Grupo do campo Idade Aniversariante -->
                <label for="idade_aniversario">Idade que a Criança Fará *</label>
                <!-- Label da pergunta -->
                <input type="number" id="idade_aniversario" name="idade_aniversario" min="1" placeholder="Digite a idade" required>
                <!-- Campo de número para idade -->
            </div>
            <div class="form-group">
                <!-- Grupo do campo Tema do Aniversário -->
                <label for="tema_aniversario">Tema do Aniversário *</label>
                <!-- Label da pergunta -->
                <input type="text" id="tema_aniversario" name="tema_aniversario" placeholder="Ex: Princesa, Dinossauro, Frozen..." required>
                <!-- Campo de texto para tema -->
            </div>
            <div class="form-group">
                <!-- Grupo do campo Local do Evento -->
                <label for="local_evento">Local do Evento *</label>
                <!-- Label da pergunta -->
                <input type="text" id="local_evento" name="local_evento" placeholder="Ex: Chácara, Parque, Salão..." required>
                <!-- Campo de texto para local -->
            </div>
        `;
        // HTML com campos específicos para Aniversário
    } 
    else if (servico === 'Feminino') {
        // Se serviço é Feminino
        campos = `
            <h3>Informações do Ensaio Feminino</h3>
            <!-- Título da seção -->
            <div class="form-group">
                <!-- Grupo do campo Tipo de Ensaio -->
                <label for="tipo_feminino">Tipo de Ensaio Desejado *</label>
                <!-- Label da pergunta -->
                <select id="tipo_feminino" name="tipo_feminino" required>
                    <!-- Dropdown para tipo de ensaio feminino -->
                    <option value="">Selecione...</option>
                    <!-- Opção vazia -->
                    <option value="sensual">Sensual</option>
                    <!-- Opção de tipo -->
                    <option value="natural">Natural</option>
                    <!-- Opção de tipo -->
                    <option value="estilo">Estilo/Moda</option>
                    <!-- Opção de tipo -->
                    <option value="empoderamento">Empoderamento</option>
                    <!-- Opção de tipo -->
                </select>
            </div>
            <div class="form-group">
                <!-- Grupo do campo Figurino -->
                <label for="figurino_feminino">Gostaria de Usar Figurinos Nossos? *</label>
                <!-- Label da pergunta -->
                <select id="figurino_feminino" name="figurino_feminino" required>
                    <!-- Dropdown para escolher figurino -->
                    <option value="">Selecione...</option>
                    <!-- Opção vazia -->
                    <option value="sim">Sim, quero usar os figurinos</option>
                    <!-- Opção sim -->
                    <option value="meu">Prefiro usar os meus</option>
                    <!-- Opção próprio -->
                    <option value="ambos">Ambos (Combo)</option>
                    <!-- Opção combinada -->
                </select>
            </div>
        `;
        // HTML com campos específicos para Feminino
    } 
    else if (servico === 'Corporativo') {
        // Se serviço é Corporativo
        campos = `
            <h3>Informações Corporativas</h3>
            <!-- Título da seção -->
            <div class="form-group">
                <!-- Grupo do campo Empresa/Profissão -->
                <label for="empresa">Empresa/Profissão *</label>
                <!-- Label da pergunta -->
                <input type="text" id="empresa" name="empresa" placeholder="Ex: Advogada, Empresária..." required>
                <!-- Campo de texto para empresa ou profissão -->
            </div>
            <div class="form-group">
                <!-- Grupo do campo Finalidade -->
                <label for="finalidade_corporativo">Finalidade da Sessão *</label>
                <!-- Label da pergunta -->
                <select id="finalidade_corporativo" name="finalidade_corporativo" required>
                    <!-- Dropdown para finalidade -->
                    <option value="">Selecione...</option>
                    <!-- Opção vazia -->
                    <option value="linkedin">LinkedIn/Redes Sociais</option>
                    <!-- Opção de uso -->
                    <option value="cartao">Cartão de Visita</option>
                    <!-- Opção de uso -->
                    <option value="site">Site Profissional</option>
                    <!-- Opção de uso -->
                    <option value="todos">Todos os Anteriores</option>
                    <!-- Opção de uso -->
                </select>
            </div>
        `;
        // HTML com campos específicos para Corporativo
    } 
    else if (servico === 'Smash the Cake') {
        // Se serviço é Smash the Cake
        campos = `
            <h3>Informações do Smash the Cake</h3>
            <!-- Título da seção -->
            <div class="form-group">
                <!-- Grupo do campo Sabor do Bolo -->
                <label for="sabor_bolo">Sabor do Bolo Preferido *</label>
                <!-- Label da pergunta -->
                <input type="text" id="sabor_bolo" name="sabor_bolo" placeholder="Ex: Chocolate, Baunilha, Cenoura..." required>
                <!-- Campo de texto para sabor -->
            </div>
            <div class="form-group">
                <!-- Grupo do campo Tema/Cores -->
                <label for="tema_cores_smash">Cores/Tema Preferido *</label>
                <!-- Label da pergunta -->
                <input type="text" id="tema_cores_smash" name="tema_cores_smash" placeholder="Ex: Azul e Branco, Rosa, Arco-íris..." required>
                <!-- Campo de texto para tema e cores -->
            </div>
            <div class="form-group">
                <!-- Grupo do campo Convidados -->
                <label for="convidados">Aproximadamente Quantos Convidados? *</label>
                <!-- Label da pergunta -->
                <input type="number" id="convidados" name="convidados" min="1" placeholder="Número de pessoas" required>
                <!-- Campo de número para quantidade de convidados -->
            </div>
        `;
        // HTML com campos específicos para Smash the Cake
    }

    // Insere campos no container
    camposContainer.innerHTML = campos;
    // Adiciona o HTML dos campos
}

// Função para enviar o formulário via WhatsApp
function submitForm(event) {
    // Evita envio padrão do formulário
    event.preventDefault();
    // Cancela comportamento padrão

    // Valida se serviço foi selecionado
    const servico = document.getElementById('servico').value;
    // Pega o serviço selecionado
    if (!servico) {
        // Se nenhum serviço foi selecionado
        alert('Por favor, selecione um serviço!');
        // Mostra alerta
        return false;
        // Retorna false
    }

    // Valida campos adicionais se existirem
    const camposAdicionais = document.getElementById('camposAdicionais');
    // Seleciona container de campos adicionais
    const inputsAdicionais = camposAdicionais.querySelectorAll('input[required], select[required]');
    // Seleciona todos os inputs e selects obrigatórios

    for (let input of inputsAdicionais) {
        // Para cada input obrigatório
        if (!input.value) {
            // Se o campo está vazio
            alert(`Por favor, preencha: ${input.previousElementSibling.textContent}`);
            // Mostra alerta
            return false;
            // Retorna false
        }
    }

    // Coleta dados do formulário diretamente dos elementos
    const nome = document.getElementById('nome').value;
    // Pega o valor do nome
    const email = document.getElementById('email').value;
    // Pega o valor do email
    const telefone = document.getElementById('telefone').value;
    // Pega o valor do telefone
    const data = document.getElementById('data').value;
    // Pega o valor da data
    const local = document.getElementById('local').value;
    // Pega o valor do local
    const mensagem = document.getElementById('mensagem').value;
    // Pega o valor da mensagem

    // Monta mensagem WhatsApp
    let mensagemWhatsApp = '*📸 SOLICITAÇÃO DE AGENDAMENTO - CLICK ARTES FOTOGRAFIA 📸*\n\n';
    // Começa a mensagem com emojis

    mensagemWhatsApp += '═══════════════════════════════════════\n\n';
    // Adiciona separador

    mensagemWhatsApp += '*👤 DADOS PESSOAIS*\n';
    // Adiciona seção de dados
    mensagemWhatsApp += `• *Nome:* ${nome}\n`;
    // Adiciona nome
    mensagemWhatsApp += `• *Email:* ${email}\n`;
    // Adiciona email
    mensagemWhatsApp += `• *Telefone:* ${telefone}\n\n`;
    // Adiciona telefone

    mensagemWhatsApp += '═══════════════════════════════════════\n\n';
    // Adiciona separador

    mensagemWhatsApp += '*📷 SERVIÇO SOLICITADO*\n';
    // Adiciona seção de serviço
    mensagemWhatsApp += `• *Serviço:* ${servico}\n\n`;
    // Adiciona serviço

    // Adiciona campos adicionais se existirem
    const inputs = camposAdicionais.querySelectorAll('input, select, textarea');
    // Seleciona todos os inputs, selects e textareas

    if (inputs.length > 0) {
        // Se há campos adicionais
        mensagemWhatsApp += '*ℹ️ INFORMAÇÕES ESPECÍFICAS DO SERVIÇO*\n';
        // Adiciona título de informações específicas
        inputs.forEach(input => {
            // Para cada campo
            if (input.value) {
                // Se tem valor
                const label = input.previousElementSibling.textContent.replace(' *', '');
                // Pega o label e remove o asterisco
                mensagemWhatsApp += `• *${label}:* ${input.value}\n`;
                // Adiciona label e valor
            }
        });
        mensagemWhatsApp += '\n';
        // Adiciona quebra de linha
    }

    mensagemWhatsApp += '═══════════════════════════════════════\n\n';
    // Adiciona separador

    mensagemWhatsApp += '*📅 DISPONIBILIDADE*\n';
    // Adiciona seção de disponibilidade
    
    // Formata data para formato brasileiro
    const dataParts = data.split('-');
    // Separa data em partes
    const dataFormatada = `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;
    // Formata para DD/MM/YYYY
    
    mensagemWhatsApp += `• *Data Desejada:* ${dataFormatada}\n`;
    // Adiciona data formatada

    // Mapeia valor do local para descrição
    const localMap = {
        'estudio': 'Estúdio (Indoor)',
        'externo': 'Ambiente Externo (Outdoor)',
        'ambos': 'Ambos (Combo)'
    };
    // Define mapeamento de locais

    const localDescricao = localMap[local] || local;
    // Pega descrição do local
    mensagemWhatsApp += `• *Local Preferido:* ${localDescricao}\n\n`;
    // Adiciona local com descrição

    // Adiciona mensagem do usuário se houver
    if (mensagem) {
        // Se há mensagem adicional
        mensagemWhatsApp += '═══════════════════════════════════════\n\n';
        // Adiciona separador
        mensagemWhatsApp += '*💬 MENSAGEM ADICIONAL*\n';
        // Adiciona título
        mensagemWhatsApp += `${mensagem}\n\n`;
        // Adiciona mensagem
    }

    mensagemWhatsApp += '═══════════════════════════════════════\n';
    // Adiciona separador final
    mensagemWhatsApp += '_Enviado através do site Click Artes Fotografia_';
    // Adiciona rodapé

    // Abre WhatsApp com mensagem pré-preenchida
    const numeroWhatsApp = '5535988028402';
    // Número do WhatsApp (código do país + DDD + número)
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemWhatsApp)}`;
    // Monta URL do WhatsApp codificando a mensagem

    // Abre em nova aba
    window.open(urlWhatsApp, '_blank');
    // Abre WhatsApp em nova aba

    // Mostra mensagem de sucesso
    alert('✅ Formulário enviado com sucesso!\n\nVocê será redirecionado para o WhatsApp para confirmar o agendamento.');
    // Mostra alerta de sucesso

    // Reseta o formulário
    document.querySelector('form').reset();
    // Limpa todos os campos

    // Limpa campos adicionais
    document.getElementById('camposAdicionais').innerHTML = '';
    // Remove campos dinâmicos

    return false;
    // Retorna false para não recarregar página
}

// Função para newsletter
function submitNewsletter(event) {
    // Evita envio padrão
    event.preventDefault();
    // Cancela comportamento padrão

    const email = event.target.querySelector('input[type="email"]').value;
    // Pega o email

    alert(`Obrigado por se inscrever! Confirmaremos seu email: ${email}`);
    // Mostra mensagem de sucesso

    event.target.reset();
    // Limpa o formulário

    return false;
    // Retorna false
}

// ===== CARROSSEL DE DEPOIMENTOS =====
// Variável para controlar o índice do depoimento atual
let depoimentoAtual = 0;

// Função para mostrar um depoimento específico
function mostrarDepoimento(indice) {
    // Seleciona todos os cards de depoimento
    const cards = document.querySelectorAll('.depoimento-card');
    const dots = document.querySelectorAll('.depoimentos-dots .dot');
    
    // Se não houver cards, retorna
    if (cards.length === 0) return;
    
    // Garante que o índice está dentro dos limites
    if (indice >= cards.length) {
        depoimentoAtual = 0;
    } else if (indice < 0) {
        depoimentoAtual = cards.length - 1;
    } else {
        depoimentoAtual = indice;
    }
    
    // Remove classe active de todos os cards e dots
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Adiciona classe active ao card e dot atuais
    cards[depoimentoAtual].classList.add('active');
    dots[depoimentoAtual].classList.add('active');
}

// Função para navegar pelos depoimentos (prev/next)
function slideDepoimento(direcao) {
    mostrarDepoimento(depoimentoAtual + direcao);
}

// Função para ir para um depoimento específico (via dots)
function currentDepoimento(indice) {
    mostrarDepoimento(indice);
}

// Função para expandir/contrair texto do depoimento
function expandirDepoimento(botao) {
    const card = botao.closest('.depoimento-card');
    const texto = card.querySelector('.depoimento-texto');
    
    if (card.classList.contains('expandido')) {
        card.classList.remove('expandido');
        botao.textContent = 'Saiba Mais';
    } else {
        card.classList.add('expandido');
        botao.textContent = 'Mostrar Menos';
    }
}

// Auto-rotação dos depoimentos (opcional)
let autoRotateDepoimentos = null;

function iniciarAutoRotate() {
    // Roda automaticamente a cada 3 segundos
    autoRotateDepoimentos = setInterval(() => {
        slideDepoimento(1);
    }, 3000);
}

function pararAutoRotate() {
    if (autoRotateDepoimentos) {
        clearInterval(autoRotateDepoimentos);
    }
}

// Pausa auto-rotação quando usuário interage
document.addEventListener('DOMContentLoaded', function() {
    const depoimentosContainer = document.querySelector('.depoimentos-container');
    
    if (depoimentosContainer) {
        // Inicia auto-rotação
        iniciarAutoRotate();
        
        // Para quando usuário passa o mouse
        depoimentosContainer.addEventListener('mouseenter', pararAutoRotate);
        
        // Reinicia quando usuário tira o mouse
        depoimentosContainer.addEventListener('mouseleave', iniciarAutoRotate);
        
        // Para quando usuário clica nos botões
        const navButtons = depoimentosContainer.querySelectorAll('.depoimento-nav, .dot');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                pararAutoRotate();
                setTimeout(iniciarAutoRotate, 8000); // Reinicia após 8 segundos
            });
        });
    }
});

// ===== FUNÇÃO PARA ABRIR MAPA =====
// Função para abrir o endereço no Google Maps
function abrirMapa() {
    // Substitua pelo endereço real do estúdio
    const endereco = 'Rua Pinheiros, Pouso Alegre - MG';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    window.open(url, '_blank');
    // Abre em uma nova aba
}

// Inicialização na primeira carga
document.addEventListener('DOMContentLoaded', function() {
    // Quando DOM estiver carregado
    showPage('home');
    // Mostra página home
});