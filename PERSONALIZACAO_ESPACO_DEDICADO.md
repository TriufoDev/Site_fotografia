# 🎨 Guia de Personalização - Seção "Espaço Dedicado"

## Como Personalizar a Seção

Esta seção foi desenvolvida de forma flexível para facilitar futuras personalizações. Aqui estão as principais formas de customizar:

---

## 📝 Alterar Textos

### Título Principal
**Arquivo:** `index.html`
**Linha:** Procure por `espaco-dedicado-title`

```html
<!-- Encontre esta linha: -->
<h2 class="espaco-dedicado-title">Um Espaço Dedicado a Capturar</h2>

<!-- E altere para seu texto, ex: -->
<h2 class="espaco-dedicado-title">Seu Novo Título</h2>
```

### Subtítulo
**Arquivo:** `index.html`
**Procure por:** `espaco-dedicado-subtitle`

```html
<!-- Altere este texto: -->
<h3 class="espaco-dedicado-subtitle">Os Momentos Mais Preciosos da Sua Família</h3>
```

### Descrição Principal
**Arquivo:** `index.html`
**Procure por:** `espaco-dedicado-text`

```html
<!-- Altere este parágrafo: -->
<p class="espaco-dedicado-text">
    Aqui, cada sorriso, olhar e detalhe se transformam em arte...
</p>
```

### Rótulos dos Itens
**Arquivo:** `index.html`
**Procure por:** `espaco-dedicado-item`

Para cada item, altere o texto do `<p>`:
```html
<p>Gestante</p>      <!-- Mude para outro texto -->
<p>Recém-Nascido</p> <!-- Mude para outro texto -->
<!-- etc... -->
```

---

## 🎯 Adicionar ou Remover Itens

### Para ADICIONAR um novo item:

```html
<!-- Copie este bloco e cole dentro de .espaco-dedicado-grid -->
<div class="espaco-dedicado-item">
    <div class="espaco-dedicado-placeholder">
        <i class="fas fa-icone"></i>  <!-- Altere o ícone -->
    </div>
    <p>Seu Texto Aqui</p>
</div>
```

**Ícones disponíveis (Font Awesome):**
- `fa-baby` - Bebê
- `fa-heart` - Coração
- `fa-users` - Pessoas
- `fa-cake-candles` - Bolo
- `fa-image` - Imagem
- `fa-camera` - Câmera
- [Veja mais em: fontawesome.com](https://fontawesome.com)

### Para REMOVER um item:

Simplesmente delete o bloco `<div class="espaco-dedicado-item">...</div>`

---

## 🎨 Alterar Cores

**Arquivo:** `style.css`

### Cor do Título
```css
.espaco-dedicado-title {
    color: var(--lilas);  /* Altere para outra variável ou cor */
}
```

### Cor dos Rótulos
```css
.espaco-dedicado-item p {
    color: var(--lilas);  /* Altere para outra cor */
}
```

### Gradiente dos Placeholders
```css
.espaco-dedicado-placeholder {
    background: linear-gradient(135deg, var(--lilas), var(--azul-claro));
    /* Altere as cores do gradiente */
}
```

### Fundo da Seção
```css
.espaco-dedicado-section {
    background: linear-gradient(135deg, rgba(184, 167, 212, 0.05), rgba(168, 216, 234, 0.05));
    /* Altere o gradiente aqui */
}
```

---

## 📐 Alterar Dimensões

### Altura dos Placeholders (Desktop)
```css
.espaco-dedicado-placeholder {
    height: 280px;  /* Aumente ou diminua */
}
```

### Tamanho do Ícone
```css
.espaco-dedicado-placeholder {
    font-size: 4rem;  /* Aumente ou diminua */
}
```

### Tamanho do Título
```css
.espaco-dedicado-title {
    font-size: 2.8rem;  /* Aumente ou diminua */
}
```

### Espaçamento entre Itens
```css
.espaco-dedicado-grid {
    gap: 2rem;  /* Aumentar para mais espaço, diminuir para menos */
}
```

---

## 🖼️ Adicionar Imagens (em vez de ícones)

Você pode substituir os ícones por imagens. Altere:

```html
<!-- De (com ícone): -->
<div class="espaco-dedicado-placeholder">
    <i class="fas fa-baby"></i>
</div>

<!-- Para (com imagem): -->
<div class="espaco-dedicado-placeholder">
    <img src="caminho/para/imagem.jpg" alt="Gestante">
</div>
```

**Ajuste o CSS para imagens:**
```css
.espaco-dedicado-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;  /* Adapta a imagem ao tamanho */
    border-radius: 15px;
}
```

---

## 🌙 Alterar Cores em Modo Escuro

**Arquivo:** `style.css`

```css
body.dark-mode .espaco-dedicado-placeholder {
    background: linear-gradient(135deg, #4A3F6B, #4A5F7F);
    /* Altere essas cores para o modo escuro */
}
```

---

## ⚡ Alterar Efeitos de Hover

### Movimento ao passar o mouse
```css
.espaco-dedicado-item:hover {
    transform: translateY(-10px);  /* Mude -10px para outro valor */
}
```

### Zoom ao passar o mouse no placeholder
```css
.espaco-dedicado-placeholder:hover {
    transform: scale(1.05);  /* Mude 1.05 para outro valor (1.1 = 10%) */
}
```

### Duração da transição
```css
.espaco-dedicado-item {
    transition: transform 0.3s, box-shadow 0.3s;
    /* Mude 0.3s para 0.5s (mais lento) ou 0.2s (mais rápido) */
}
```

---

## 📱 Alterar Responsividade

**Arquivo:** `style.css`
**Procure por:** `@media (max-width: 768px)`

```css
/* Mobile (≤ 768px) */
@media (max-width: 768px) {
    .espaco-dedicado-grid {
        grid-template-columns: 1fr;  /* Mude para 2 colunas: repeat(2, 1fr) */
    }

    .espaco-dedicado-placeholder {
        height: 200px;  /* Altere a altura */
    }
}
```

---

## 🔄 Alterar Número de Colunas

**Desktop (4 colunas):**
```css
.espaco-dedicado-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    /* Aumente minmax(200px) para 250px para menos colunas */
}
```

---

## 🎬 Adicionar Animações de Scroll

Se quiser adicionar animações ao scroll, você pode usar:

```html
<!-- Adicione ao <head> do seu HTML: -->
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
```

Então no HTML:
```html
<section class="espaco-dedicado-section" data-aos="fade-up">
    <!-- Conteúdo -->
</section>

<div class="espaco-dedicado-item" data-aos="zoom-in" data-aos-delay="100">
    <!-- Item -->
</div>
```

---

## 🔗 Links Úteis

### Ícones Font Awesome
https://fontawesome.com/icons

### Geradores de Gradiente
https://cssgradient.io/

### Cores (Paleta)
https://coolors.co/

---

## ✅ Dicas Importantes

1. **Sempre faça backup** antes de grandes alterações
2. **Teste em mobile** após cada mudança importante
3. **Use Firefox DevTools ou Chrome DevTools** para testar responsividade (F12)
4. **Verifique o modo escuro** após alterar cores
5. **Mantenha a legibilidade** - certifique-se de que o texto está sempre legível

---

## 📚 Estrutura de Pastas

```
seu-projeto/
├── index.html          (Conteúdo HTML)
├── style.css           (Estilos CSS)
├── script.js           (JavaScript)
├── logo.png            (Logo)
└── imagens/            (Se usar imagens)
    ├── gestante.jpg
    ├── newborn.jpg
    └── familia.jpg
```

---

## 🆘 Troubleshooting

### Ícone não aparece?
- Verifique se o Font Awesome está carregando
- Verifique a ortografia do ícone (ex: `fa-baby`)

### Cores não aparecem?
- Verifique se as variáveis CSS estão corretas
- Use nomes de cores válidas (hex, rgb, etc)

### Grid não funciona?
- Verifique se tem espaço suficiente
- Aumente o valor de `minmax(200px)` para valores maiores

### Responsividade não funciona?
- Verifique se o media query é o correto (`@media (max-width: 768px)`)
- Teste com F12 (DevTools)

---

## 📧 Suporte

Para dúvidas ou sugestões, consulte a documentação completa em:
- `SECAO_ESPACO_DEDICADO.md` - Documentação técnica completa
- `RESUMO_SECAO_ESPACO.txt` - Resumo visual das alterações

---

**Boa sorte com suas personalizações! 🚀**
