# 📸 Nova Seção: "Um Espaço Dedicado a Capturar"

## 📋 Visão Geral

Uma nova seção foi adicionada ao seu site, entre a seção Hero e a seção "Nossos Serviços". Esta seção apresenta o estúdio e seus diferenciais de forma visual e atrativa.

---

## 🎨 Características da Seção

### 1. **Título Principal**
- **Texto:** "Um Espaço Dedicado a Capturar"
- **Estilo:** Maiúsculas, cor lilás, fonte grande e elegante
- **Efeito:** Destaca o propósito do estúdio

### 2. **Subtítulo**
- **Texto:** "Os Momentos Mais Preciosos da Sua Família"
- **Estilo:** Maiúsculas, cor padrão do texto
- **Propósito:** Complementa o título com a promessa

### 3. **Texto Descritivo**
- **Conteúdo:** Descrição envolvente sobre o serviço
- **Texto:** "Aqui, cada sorriso, olhar e detalhe se transformam em arte. Dos primeiros momentos do seu bebê, desde a barriguinha até à sua jornada com os pais, estamos prontos para contar a sua história com amor e naturalidade."
- **Estilo:** Fonte legível, tamanho 1.1rem

### 4. **Grid de 4 Itens Visuais**
Cada item contém:
- Um ícone representativo
- Um placeholder visual (gradiente lilás/azul)
- Um rótulo descritivo

**Itens:**
1. **Gestante** - Ícone: bebê 👶
2. **Recém-Nascido** - Ícone: coração ❤️
3. **Detalhes Especiais** - Ícone: mão com coração 🤲
4. **Momentos em Família** - Ícone: pessoas 👥

---

## 🎯 Localização

A seção está posicionada:
- ✅ **Após:** Seção Hero
- ✅ **Antes:** Seção "Nossos Serviços"
- ✅ **Na página:** Home (id="home")

---

## 💻 Estrutura HTML

```html
<!-- Um Espaço Dedicado -->
<section class="espaco-dedicado-section">
    
    <!-- Container com textos -->
    <div class="espaco-dedicado-container">
        <h2 class="espaco-dedicado-title">Um Espaço Dedicado a Capturar</h2>
        <h3 class="espaco-dedicado-subtitle">Os Momentos Mais Preciosos da Sua Família</h3>
        <p class="espaco-dedicado-text">Aqui, cada sorriso...</p>
    </div>

    <!-- Grid com 4 itens visuais -->
    <div class="espaco-dedicado-grid">
        <div class="espaco-dedicado-item">
            <div class="espaco-dedicado-placeholder">
                <i class="fas fa-baby"></i>
            </div>
            <p>Gestante</p>
        </div>
        <!-- ... mais 3 itens ... -->
    </div>
</section>
```

---

## 🎨 Estilos CSS Principais

### Classes Utilizadas:

| Classe | Função |
|--------|--------|
| `.espaco-dedicado-section` | Container principal da seção |
| `.espaco-dedicado-container` | Área com textos centralizados |
| `.espaco-dedicado-title` | Título principal (2.8rem) |
| `.espaco-dedicado-subtitle` | Subtítulo (1.8rem) |
| `.espaco-dedicado-text` | Texto descritivo |
| `.espaco-dedicado-grid` | Grid responsivo com 4 colunas |
| `.espaco-dedicado-item` | Item individual |
| `.espaco-dedicado-placeholder` | Box visual com gradiente |

### Cores:
- **Fundo da seção:** Gradiente suave lilás/azul (5% de opacidade)
- **Placeholders:** Gradiente lilás → azul claro
- **Texto título:** Lilás (#B8A7D4)
- **Texto padrão:** Cinza escuro (#333333)
- **Ícones:** Branco

---

## 📱 Responsividade

### Desktop (> 768px)
- Grid com 4 colunas
- Título: 2.8rem
- Placeholders: altura 280px
- Ícones: 4rem

### Mobile (≤ 768px)
- Grid com 1 coluna
- Título: 1.8rem
- Subtítulo: 1.3rem
- Placeholders: altura 200px
- Ícones: 2.5rem

---

## 🌙 Modo Escuro

A seção se adapta automaticamente ao modo escuro:
- **Fundo:** Gradiente escuro (74, 63, 107 e 74, 95, 127)
- **Placeholders:** Gradiente com cores escuras
- **Texto:** Automaticamente ajustado via variáveis CSS

---

## ✨ Efeitos Interativos

### Ao passar o mouse nos itens:
- O item se move 10px para cima
- O placeholder aumenta 5% (scale 1.05)
- Transição suave de 0.3 segundos

---

## 🔄 Animações

- **Transição suave:** 0.3s em todas as transformações
- **Hover no placeholder:** Scale(1.05)
- **Hover no item:** translateY(-10px)

---

## 📝 Textos Utilizados

### Títulos:
- Título: "Um Espaço Dedicado a Capturar"
- Subtítulo: "Os Momentos Mais Preciosos da Sua Família"

### Descrição:
"Aqui, cada sorriso, olhar e detalhe se transformam em arte. Dos primeiros momentos do seu bebê, desde a barriguinha até à sua jornada com os pais, estamos prontos para contar a sua história com amor e naturalidade."

### Rótulos dos itens:
1. Gestante
2. Recém-Nascido
3. Detalhes Especiais
4. Momentos em Família

---

## 🎯 Objetivo da Seção

✓ Criar uma transição visual agradável entre o hero e os serviços
✓ Apresentar os principais tipos de sessão fotográfica
✓ Destacar o comprometimento do estúdio com momentos preciosos
✓ Usar placeholders visuais para criar impacto visual
✓ Preparar o usuário para conhecer os serviços em detalhes

---

## 📂 Arquivos Modificados

1. **index.html**
   - Adicionada seção com HTML estruturado
   - Localizada entre hero e serviços

2. **style.css**
   - Adicionadas classes `.espaco-dedicado-*`
   - Adicionados estilos responsivos
   - Adicionados estilos para modo escuro

---

## ✅ Testes Realizados

- ✅ HTML sem erros
- ✅ CSS sem erros
- ✅ Responsivo em mobile (≤ 768px)
- ✅ Responsivo em desktop (> 768px)
- ✅ Modo escuro funciona corretamente
- ✅ Efeitos hover funcionam
- ✅ Texto legível e bem estruturado

---

## 🚀 Próximas Melhorias Possíveis

- Adicionar imagens reais em vez de placeholders
- Adicionar animações ao scroll (Intersection Observer)
- Adicionar links clicáveis em cada item
- Implementar carrossel de imagens
- Adicionar mais itens visuais

---

**Desenvolvido com ❤️ para melhor experiência visual**
**Data:** 13 de novembro de 2025
