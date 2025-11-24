# 🌙 GUIA DE USO - MODO ESCURO

## O que foi adicionado?

Um **botão de alternância de tema** foi adicionado à barra de navegação do seu site. Ele permite que os usuários altern entre modo claro e modo escuro com um clique!

---

## 🎯 Como Usar

### Para Usuários do Site:
1. **Localize o botão** 🌙 na barra de navegação (canto superior direito)
2. **Clique no ícone** para ativar o modo escuro
3. **Clique novamente** para retornar ao modo claro
4. Sua preferência é **salva automaticamente** - ao retornar ao site, o tema escolhido será aplicado

### Indicador Visual:
- 🌙 **Lua** = Modo claro está ativo, clique para modo escuro
- ☀️ **Sol** = Modo escuro está ativo, clique para modo claro

---

## 🎨 O que Muda no Modo Escuro?

### Cores Principais:
- ⬜ Fundo: Branco → **Preto/Cinza Escuro**
- 🔤 Texto: Cinza Escuro → **Branco/Cinza Claro**
- 📦 Cards/Containers: Adaptados para tema escuro

### Elementos Afetados:
✓ Header (barra de navegação)
✓ Footer (rodapé)
✓ Cards de serviços
✓ Formulários
✓ Newsletter
✓ Galeria
✓ Seção "Sobre"
✓ Todos os elementos de texto

---

## 💾 Persistência de Dados

O site **lembra da sua preferência**:
- Ao clicar no botão, a escolha é salva em seu navegador
- Quando você retorna ao site, o tema é restaurado automaticamente
- A preferência é armazenada por navegador/dispositivo

---

## 🌐 Compatibilidade

✓ **Todos os navegadores modernos:**
  - Google Chrome
  - Mozilla Firefox
  - Safari
  - Microsoft Edge
  - Opera

✓ **Todos os dispositivos:**
  - Desktop
  - Tablet
  - Mobile

✓ **Totalmente responsivo** em qualquer tamanho de tela

---

## ⚡ Características Técnicas

- ✨ **Transições suaves** (0.3 segundos)
- 🔄 **Alternância instantânea** entre temas
- 💾 **Armazenamento local** (localStorage)
- ♿ **Acessível** com atributos ARIA
- 📱 **Responsivo** em todos os devices

---

## 📋 Arquivos Modificados

Se você quer entender o que foi feito tecnicamente:

1. **index.html** - Adicionado botão de tema
2. **style.css** - Adicionadas variáveis e estilos para modo escuro
3. **script.js** - Adicionadas funções de alternância e persistência

---

## 🔧 Personalizações Possíveis

Se você quiser customizar as cores do modo escuro, abra o arquivo `style.css` e procure por:

```css
:root.dark-mode {
    --branco: #1A1A1A;           /* Altere a cor de fundo */
    --texto: #E8E8E8;            /* Altere a cor de texto */
    --cinza-claro: #2D2D2D;      /* Altere cores secundárias */
}
```

As cores usadas em hexadecimal podem ser alteradas conforme sua preferência!

---

## ❓ Perguntas Frequentes

**P: Como faço para desativar o modo escuro?**
A: Clique no ícone do sol (☀️) na barra de navegação.

**P: Minha preferência desaparece quando fecho o navegador?**
A: A preferência é salva em seu navegador e deve persistir mesmo após fechá-lo. Se isso não acontecer, limpe os dados do navegador e tente novamente.

**P: O modo escuro funciona em todos os sites?**
A: Não, o modo escuro foi implementado especificamente para este site.

**P: Posso reportar problemas com o modo escuro?**
A: Sim! Se encontrar algo que não está funcionando corretamente, entre em contato com o desenvolvedor.

---

## 🎉 Aproveite o Novo Modo Escuro!

O modo escuro foi desenvolvido para oferecer melhor experiência visual, especialmente para uso noturno. Divirta-se alternando entre os temas!

---

**Versão:** 1.0
**Data:** 12 de novembro de 2025
**Status:** ✅ Produção
