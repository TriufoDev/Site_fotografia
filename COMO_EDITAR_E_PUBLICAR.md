# 📝 Como Editar e Publicar o Site

## 🎯 Visão Geral

O **Editor Visual** permite editar o site diretamente no navegador, mas como o site está hospedado no **GitHub/Netlify**, as alterações precisam ser exportadas e enviadas manualmente.

---

## 🔄 Fluxo de Trabalho

```
┌─────────────────┐
│  1. EDITAR      │ ← Faça as alterações no Editor Visual
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. SALVAR      │ ← Salve localmente (backup no navegador)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  3. EXPORTAR    │ ← Baixe o arquivo HTML editado
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  4. GITHUB      │ ← Substitua o index.html no repositório
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  5. NETLIFY     │ ← Atualização automática em 2-3 minutos
└─────────────────┘
```

---

## 📋 Passo a Passo Detalhado

### 1️⃣ Ativar o Editor Visual

1. Acesse o **Painel Administrativo** (ícone ⚙️ no canto inferior esquerdo)
2. Faça login com sua senha
3. Clique na aba **"✏️ Editar Site"**
4. Clique no botão **"Ativar Editor Visual"**

### 2️⃣ Editar o Conteúdo

**Editar Textos:**
- Clique em qualquer texto
- Digite as alterações
- Pressione Enter ou clique fora para salvar

**Editar Imagens:**
- Clique na imagem
- Cole uma nova URL ou faça upload
- A imagem será atualizada

**Adicionar Elementos:**
- Use os botões da toolbar no topo:
  - **📄 Nova Seção**: Adiciona uma seção completa
  - **🔤 Texto**: Adiciona um parágrafo
  - **🖼️ Imagem**: Adiciona uma imagem
  - **🔘 Botão**: Adiciona um botão clicável

**Remover Elementos:**
- Clique com botão direito no elemento
- Selecione "Excluir"
- Confirme a remoção

### 3️⃣ Salvar as Alterações

1. Clique em **"💾 Salvar Localmente"** na toolbar
2. Isso cria um backup no seu navegador
3. ✅ Você verá a mensagem: "Alterações salvas localmente!"

> ⚠️ **Importante**: Este backup fica apenas no seu navegador!

### 4️⃣ Exportar o HTML

1. Clique em **"⬇️ Exportar HTML"** na toolbar
2. Um arquivo será baixado: `index_editado_[timestamp].html`
3. Guarde este arquivo em local seguro

### 5️⃣ Publicar no GitHub

**Opção A: Interface Web do GitHub**

1. Acesse seu repositório no GitHub:
   ```
   https://github.com/TriufoDev/click-artes-fotografia
   ```

2. Clique no arquivo `index.html`

3. Clique no ícone de **✏️ lápis** (Edit this file)

4. Abra o arquivo exportado no bloco de notas

5. **Selecione todo o conteúdo** (Ctrl+A) e **copie** (Ctrl+C)

6. No GitHub, **selecione todo o conteúdo** e **cole** o novo código

7. Role até o final da página

8. Em "Commit changes":
   - Título: `Atualização visual do site`
   - Descrição: `Editado via Editor Visual`

9. Clique em **"Commit changes"**

**Opção B: GitHub Desktop** (Mais Fácil)

1. Instale o [GitHub Desktop](https://desktop.github.com/)
2. Clone seu repositório
3. Substitua o arquivo `index.html` pelo arquivo exportado
4. Commit e Push das alterações

### 6️⃣ Aguardar Deploy no Netlify

1. O Netlify detectará as alterações automaticamente
2. Em **2-3 minutos**, o site estará atualizado
3. Acesse seu site para verificar as alterações

---

## 🔧 Funcionalidades do Editor

### ✏️ Edição Inline
- Clique em textos para editar
- Suporte a formatação básica
- Alterações em tempo real

### 🖼️ Gerenciamento de Imagens
- Upload de arquivos
- URLs externas
- Redimensionamento automático

### 📦 Componentes
- Seções completas
- Elementos de texto
- Imagens
- Botões
- Ícones

### 🎨 Personalização
- Cores e temas
- Fontes e tamanhos
- Espaçamentos
- Alinhamentos

---

## 💾 Backups e Recuperação

### Criar Backup
```
1. Editor Visual → Salvar Localmente
2. Backup salvo no navegador ✓
```

### Restaurar Backup
```
1. Editor Visual → Restaurar Backup
2. Confirmar restauração
3. Conteúdo restaurado ✓
```

### Exportar Configurações
```
1. Painel Admin → Configurações
2. Exportar → Arquivo JSON baixado
3. Guarde em local seguro
```

---

## ❓ Perguntas Frequentes

### Por que as alterações não aparecem no site público?

**R:** As alterações ficam apenas no seu navegador até você exportar o HTML e fazer upload no GitHub.

### Posso editar de outro computador?

**R:** Sim! Mas precisará:
1. Fazer login no painel admin
2. Se tiver backup local, restaurá-lo
3. Ou começar novas edições

### As edições são perdidas ao fechar o navegador?

**R:** Se você clicar em "Salvar Localmente", o backup fica guardado. Mas é recomendado sempre exportar o HTML.

### Quanto tempo demora para atualizar no Netlify?

**R:** Geralmente 2-3 minutos após fazer o commit no GitHub.

### Posso desfazer alterações?

**R:** Sim! Use o botão "Restaurar Backup" ou recarregue a página sem salvar.

### Como faço para atualizar apenas uma parte?

**R:** Edite normalmente e exporte. Você pode fazer edições parciais sem problemas.

---

## 🚨 Solução de Problemas

### ❌ "Não consigo clicar nos elementos"
- Verifique se o Editor Visual está ativado (toolbar no topo)
- Recarregue a página e tente novamente
- Limpe o cache do navegador

### ❌ "Exportação não funciona"
- Verifique se tem permissão para downloads
- Tente outro navegador
- Desative bloqueadores de popup

### ❌ "Alterações desapareceram"
- Restaure o backup local (botão na toolbar)
- Se não tiver backup, refaça as edições
- Sempre salve localmente antes de fechar

### ❌ "GitHub não aceita o código"
- Verifique se copiou todo o conteúdo
- Certifique-se que é o arquivo HTML completo
- Tente fazer upload do arquivo ao invés de copiar/colar

---

## 📞 Suporte

Para dúvidas ou problemas:

1. **Leia esta documentação** completa
2. **Consulte o tutorial** no Editor Visual
3. **Entre em contato** através do site

---

## 🎓 Dicas Profissionais

### ✅ Boas Práticas

1. **Sempre faça backup** antes de grandes edições
2. **Teste localmente** antes de publicar
3. **Exporte regularmente** para não perder trabalho
4. **Mantenha backups** dos arquivos exportados
5. **Documente mudanças** nos commits do GitHub

### ⚡ Atalhos Úteis

- `Ctrl + S`: Salvar localmente (em breve)
- `Esc`: Sair do modo de edição
- `Ctrl + Z`: Desfazer (dentro de elementos editáveis)
- Clique direito: Menu de contexto do elemento

### 🎯 Fluxo Recomendado

```
1. Fazer pequenas edições
2. Salvar localmente
3. Testar as mudanças
4. Se OK → Exportar HTML
5. Commit no GitHub
6. Aguardar deploy
7. Verificar site público
```

---

## 📚 Recursos Adicionais

- [Documentação do GitHub](https://docs.github.com)
- [Documentação do Netlify](https://docs.netlify.com)
- [Tutorial de Git](https://git-scm.com/doc)

---

**Desenvolvido com ❤️ para Click Artes Fotografia**

Última atualização: 24 de novembro de 2025
