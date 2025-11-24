# 📸 Recursos da Galeria Temática - Click Artes Fotografia

## ✨ Funcionalidades Implementadas

### 🎯 Navegação Temática
- **Botões na Home**: Ao clicar nos cards "Gestante", "Recém-Nascido", "Detalhes Especiais" ou "Momentos em Família", o visitante é redirecionado automaticamente para a galeria filtrada pelo tema escolhido.

### 🖼️ Galeria Pública
- **6 Categorias**: Gestante, Newborn, Bebê, Família, Smash the Cake e Todos
- **Filtros Dinâmicos**: Botões de filtro no topo da galeria
- **Layout Responsivo**: Grid adaptável a diferentes tamanhos de tela
- **Modal de Visualização**: Lightbox com carrossel ao clicar nas fotos

### 🎨 Modal de Visualização (Lightbox)
- **Imagem em tamanho grande**
- **Navegação por setas** (← e →)
- **Navegação por teclado** (setas e ESC)
- **Carrossel de miniaturas** na parte inferior
- **Informações da foto**: título e descrição
- **Botão X para fechar**

### 🛠️ Painel Administrativo

#### Adicionar Fotos - 3 Métodos:
1. **Arrastar e Soltar (Drag & Drop)**
   - Arraste uma imagem diretamente para a área indicada
   - Suporta imagens locais
   - Preview instantâneo

2. **Seleção de Arquivo**
   - Clique no botão "Escolher Arquivo"
   - Navegue e selecione uma imagem
   - Preview automático

3. **URL Externa**
   - Cole o link de uma imagem hospedada
   - Suporta: Imgur, Google Drive, etc.
   - Validação automática

#### Gerenciar Fotos:
- **Visualização por tema**: Filtros no painel admin
- **Editar fotos**: Botão ✏️ para carregar dados e editar
- **Remover fotos**: Botão ❌ com confirmação
- **Reordenar fotos**: Arraste e solte para reorganizar
- **Preview**: Visualização prévia antes de adicionar
- **Campos obrigatórios**: Tema e URL/arquivo

### 📋 Campos do Formulário:
- **Tema** (obrigatório): Dropdown com opções
- **URL da Foto**: Link externo ou arquivo local
- **Título**: Nome da foto
- **Descrição**: Texto descritivo

### 🎯 Funcionalidades de Reordenação:
- **Drag & Drop entre fotos**: Arraste uma foto sobre outra para trocar posições
- **Indicador visual**: Ícone ⋮⋮ indica que pode ser arrastado
- **Feedback visual**: Borda destacada ao arrastar sobre uma foto
- **Salvamento automático**: Ordem salva instantaneamente

## 🚀 Como Usar

### Para Visitantes:
1. Clique nos cards temáticos na home page
2. Navegue pela galeria filtrada
3. Clique em qualquer foto para visualizar em tamanho grande
4. Use as setas ou teclado para navegar entre as fotos

### Para Administradores:

#### Adicionar Foto via Drag & Drop:
1. Acesse o painel administrativo (ícone ⚙️ no canto inferior esquerdo)
2. Faça login com a senha
3. Vá para a aba "Fotos"
4. Arraste uma imagem para a área indicada
5. Selecione o tema
6. Adicione título e descrição (opcional)
7. Clique em "Adicionar Foto"

#### Adicionar Foto via URL:
1. Acesse o painel administrativo
2. Vá para a aba "Fotos"
3. Selecione o tema
4. Cole a URL da imagem
5. Adicione título e descrição
6. Clique em "Adicionar Foto"

#### Editar Foto:
1. Localize a foto desejada
2. Passe o mouse sobre ela
3. Clique no botão ✏️ (editar)
4. Os dados serão carregados no formulário
5. Faça as alterações
6. Clique em "Adicionar Foto" (a antiga será substituída)

#### Reordenar Fotos:
1. Clique e segure uma foto
2. Arraste sobre outra foto
3. Solte para trocar as posições
4. A ordem é salva automaticamente

#### Remover Foto:
1. Passe o mouse sobre a foto
2. Clique no botão ❌
3. Confirme a remoção

## 💾 Armazenamento

Todas as fotos são armazenadas localmente no navegador usando `localStorage`:
- **Vantagem**: Não requer servidor ou banco de dados
- **Limitação**: Dados ficam no navegador usado
- **Backup**: Use "Exportar Configurações" na aba Configurações

## 🔐 Segurança

- **Login protegido**: Senha padrão "admin123"
- **Troca de senha**: Disponível no painel
- **Validação**: Campos obrigatórios e tipos de arquivo

## 📱 Responsividade

- **Desktop**: Layout otimizado em grade
- **Tablet**: Grid adaptável
- **Mobile**: Layout vertical otimizado
- **Touch**: Suporte a gestos touch para navegação

## 🎨 Personalização

Todas as cores e temas podem ser personalizados através da aba "Cores" no painel administrativo.

## ⚡ Performance

- **Lazy Loading**: Imagens carregam conforme necessário
- **Otimização**: Transições suaves sem travamentos
- **Cache**: Configurações salvas localmente

## 🐛 Solução de Problemas

### Foto não aparece:
- Verifique se a URL está correta e acessível
- Teste a URL diretamente no navegador
- Use serviços confiáveis (Imgur, Google Drive público)

### Drag & Drop não funciona:
- Certifique-se de estar usando um navegador moderno
- Verifique se o arquivo é uma imagem válida
- Tente o método de seleção de arquivo

### Fotos desapareceram:
- Verifique se está no mesmo navegador
- Importe o backup de configurações
- Contate o desenvolvedor

## 📞 Suporte

Para dúvidas ou problemas, entre em contato através do site.

---

**Desenvolvido com ❤️ para Click Artes Fotografia**
