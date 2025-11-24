# 🌙 Modo Escuro (Dark Mode) - Documentação

## Visão Geral
O site agora possui um modo escuro (dark mode) funcional! O usuário pode alternar entre o tema claro e escuro clicando no botão de tema na barra de navegação.

## ✨ Funcionalidades Implementadas

### 1. **Botão de Tema na Navegação**
- Um novo botão com um ícone de lua/sol foi adicionado à barra de navegação
- Localizado no final da lista de links de navegação
- Ao clicar, alterna entre modo claro e escuro

### 2. **Variáveis CSS para Modo Escuro**
Adicionadas variáveis CSS específicas para modo escuro no `:root.dark-mode`:
- `--branco`: Alterado de #FFFFFF para #1A1A1A (fundo escuro)
- `--texto`: Alterado de #333333 para #E8E8E8 (texto claro)
- `--cinza-claro`: Alterado de #F5F5F5 para #2D2D2D (fundos secundários escuros)

### 3. **Elementos Estilizados para Modo Escuro**
Os seguintes elementos foram adaptados para modo escuro:
- **Header**: Gradiente alterado para cores mais escuras
- **Footer**: Gradiente alterado para cores mais escuras
- **Cards de Serviço**: Fundo e sombra ajustados
- **Itens de Diferenciais**: Gradiente com cores escuras
- **Formulários**: Campos de entrada com fundo escuro e borda ajustada
- **Newsletter**: Campo de email com tema escuro
- **Buttons**: Ajustes de cor para melhor contraste

### 4. **Persistência de Preferência**
- A escolha do usuário é salva no `localStorage`
- Ao retornar ao site, o tema escolhido anteriormente é aplicado automaticamente
- Funciona em diferentes abas/sessões do navegador

## 🔄 Como Funciona

### Botão de Tema
```html
<button class="theme-toggle" onclick="toggleTheme()" aria-label="Alternar tema">
    <i class="fas fa-moon" id="themeIcon"></i>
</button>
```

### Função JavaScript `toggleTheme()`
- Alterna a classe `dark-mode` nos elementos: `html`, `body`, `header` e `footer`
- Muda o ícone de lua (🌙) para sol (☀️) e vice-versa
- Salva a preferência no localStorage

### Função JavaScript `loadTheme()`
- Executada ao carregar a página (evento `DOMContentLoaded`)
- Restaura o tema baseado na preferência salva
- Atualiza o ícone conforme o tema carregado

## 🎨 Paleta de Cores - Modo Escuro

| Elemento | Cor Clara | Cor Escura |
|----------|-----------|-----------|
| Fundo | #FFFFFF | #1A1A1A |
| Texto | #333333 | #E8E8E8 |
| Cinza Claro | #F5F5F5 | #2D2D2D |
| Lilás (Destaque) | #B8A7D4 | #B8A7D4 (mantido) |
| Azul Claro | #A8D8EA | #A8D8EA (mantido) |

## 📱 Responsividade
- O botão de tema funciona em todos os dispositivos (desktop, tablet, mobile)
- A transição entre temas é suave (0.3s)
- Todos os elementos se adaptam corretamente ao modo escuro

## 🔍 Elementos com Transição Suave
```css
transition: background-color 0.3s ease, color 0.3s ease;
```

## 📂 Arquivos Modificados

### `index.html`
- Adicionado botão de tema na navegação

### `style.css`
- Adicionadas variáveis CSS para modo escuro em `:root.dark-mode`
- Adicionados estilos para elementos em modo escuro (`.dark-mode`)
- Transições suaves aplicadas ao body

### `script.js`
- Função `toggleTheme()` para alternar tema
- Função `loadTheme()` para restaurar tema ao carregar
- Event listener para executar `loadTheme()` ao iniciar

## ✅ Testes Realizados
- ✓ Botão de tema funciona ao clicar
- ✓ Ícone alterna corretamente entre lua e sol
- ✓ Tema persiste ao recarregar a página
- ✓ Todos os elementos visuais se adaptam ao modo escuro
- ✓ Texto mantém boa legibilidade em ambos os temas
- ✓ Sem erros de CSS ou JavaScript

## 🚀 Como Usar
1. Clique no ícone de lua/sol na barra de navegação
2. O site alternará para modo escuro ou claro
3. Sua preferência será salva automaticamente
4. Ao retornar, o tema será aplicado automaticamente

---

**Desenvolvido com ❤️ para melhor experiência do usuário**
