# ✅ Checklist de Publicação - Click Artes Fotografia

## 📋 Antes de Começar

### Preparação do Ambiente
- [ ] Navegador moderno instalado (Chrome, Firefox, Edge)
- [ ] Conta GitHub ativa
- [ ] Acesso ao repositório: `TriufoDev/click-artes-fotografia`
- [ ] Site conectado ao Netlify

### Verificação Inicial
- [ ] Site está acessível: https://click-artes-fotografia.netlify.app
- [ ] Consegue acessar o painel admin (senha: `admin123`)
- [ ] Editor visual está funcionando

---

## 🎨 Fluxo de Trabalho Completo

### ETAPA 1: Preparação
```
┌──────────────────────────────────────┐
│ 1.1 Abrir o site no navegador       │
│ 1.2 Fazer login no painel admin     │
│ 1.3 Ativar o Editor Visual          │
└──────────────────────────────────────┘
```

**Checklist:**
- [ ] Site aberto no navegador
- [ ] Clicou em "Editar Site" no footer
- [ ] Digitou senha: `admin123`
- [ ] Clicou em "Ativar Editor" (botão roxo)
- [ ] Toolbar do editor apareceu no topo

---

### ETAPA 2: Edição
```
┌──────────────────────────────────────┐
│ 2.1 Fazer as alterações desejadas   │
│ 2.2 Revisar todas as mudanças       │
│ 2.3 Testar navegação                │
└──────────────────────────────────────┘
```

**Tipos de Edição:**

#### 📝 Editar Textos
- [ ] Clique no texto que deseja alterar
- [ ] Digite o novo conteúdo
- [ ] Clique fora para salvar

#### 🖼️ Trocar Imagens
- [ ] Clique na imagem que deseja trocar
- [ ] Escolha nova imagem do computador
- [ ] Aguarde o carregamento

#### 📸 Adicionar Fotos à Galeria
- [ ] Abra a aba "Fotos" no painel admin
- [ ] Escolha o tema (Gestante, Newborn, etc.)
- [ ] Arraste fotos ou clique para selecionar
- [ ] Adicione títulos às fotos
- [ ] Verifique a ordem (drag-and-drop)

#### 🎨 Personalizar Cores
- [ ] Abra a aba "Cores" no painel admin
- [ ] Escolha novas cores nos seletores
- [ ] Ative/desative modo escuro automático
- [ ] Teste em diferentes horários

#### 🎬 Adicionar Vídeo
- [ ] Abra a aba "Vídeo" no painel admin
- [ ] Cole URL do YouTube
- [ ] Verifique prévia

---

### ETAPA 3: Salvamento Local
```
┌──────────────────────────────────────┐
│ 3.1 Clicar em "Salvar Localmente"   │
│ 3.2 Aguardar confirmação             │
│ 3.3 Verificar data do backup         │
└──────────────────────────────────────┘
```

**Checklist:**
- [ ] Clicou no botão "💾 Salvar Localmente" na toolbar
- [ ] Viu mensagem de sucesso: "Backup salvo!"
- [ ] Data do backup está correta

**🔍 Como Verificar:**
```javascript
// Cole no Console do navegador (F12):
console.log('Último backup:', localStorage.getItem('visualEditorBackup'));
```

---

### ETAPA 4: Exportação
```
┌──────────────────────────────────────┐
│ 4.1 Clicar em "Exportar HTML"       │
│ 4.2 Aguardar download                │
│ 4.3 Verificar arquivo baixado       │
└──────────────────────────────────────┘
```

**Checklist:**
- [ ] Clicou no botão "⬇️ Exportar HTML" na toolbar
- [ ] Arquivo baixado: `index_editado_YYYY-MM-DD.html`
- [ ] Arquivo tem tamanho > 0 bytes
- [ ] Consegue abrir o arquivo no navegador

**🔍 Verificação do Arquivo:**
- [ ] Abra o arquivo baixado em um navegador
- [ ] Todas as alterações estão presentes
- [ ] Imagens estão carregando
- [ ] Galeria funciona normalmente

---

### ETAPA 5: Upload no GitHub
```
┌──────────────────────────────────────┐
│ 5.1 Acessar repositório no GitHub   │
│ 5.2 Abrir index.html                 │
│ 5.3 Clicar em editar (ícone lápis)  │
│ 5.4 Substituir todo o conteúdo      │
│ 5.5 Fazer commit                     │
└──────────────────────────────────────┘
```

**Checklist Detalhado:**

#### 5.1 Acessar Repositório
- [ ] Abrir: https://github.com/TriufoDev/click-artes-fotografia
- [ ] Verificar que está logado no GitHub
- [ ] Ver lista de arquivos

#### 5.2 Abrir index.html
- [ ] Clicar no arquivo `index.html` na lista
- [ ] Página do arquivo abriu

#### 5.3 Modo de Edição
- [ ] Clicar no ícone ✏️ (lápis) no canto superior direito
- [ ] Editor de código apareceu

#### 5.4 Substituir Conteúdo
- [ ] Pressionar `Ctrl+A` (selecionar tudo)
- [ ] Abrir arquivo exportado no Bloco de Notas
- [ ] Selecionar todo conteúdo (`Ctrl+A`)
- [ ] Copiar (`Ctrl+C`)
- [ ] Voltar para o GitHub
- [ ] Colar (`Ctrl+V`)

#### 5.5 Commit
- [ ] Rolar até o final da página
- [ ] Ver seção "Commit changes"
- [ ] Adicionar mensagem descritiva
  - Exemplo: `Atualização da galeria - Novos eventos`
- [ ] Clicar em "Commit changes"
- [ ] Aguardar confirmação (✅ verde)

---

### ETAPA 6: Deploy no Netlify
```
┌──────────────────────────────────────┐
│ 6.1 Netlify detecta mudança          │
│ 6.2 Inicia build automático          │
│ 6.3 Deploy concluído (2-3 min)      │
│ 6.4 Site atualizado!                 │
└──────────────────────────────────────┘
```

**Checklist:**
- [ ] Aguardar 2-3 minutos
- [ ] Acessar: https://click-artes-fotografia.netlify.app
- [ ] Pressionar `Ctrl+F5` (atualizar forçado)
- [ ] Verificar se alterações aparecem

**🔍 Verificação Completa:**
- [ ] Textos atualizados
- [ ] Imagens novas aparecem
- [ ] Galeria com fotos corretas
- [ ] Cores personalizadas aplicadas
- [ ] Vídeo do YouTube funciona
- [ ] Links funcionam
- [ ] Navegação OK
- [ ] Responsivo (mobile) OK

---

## 🚨 Solução de Problemas

### ❌ Problema: Arquivo não baixou
**Soluções:**
1. [ ] Verificar bloqueador de pop-ups
2. [ ] Tentar outro navegador
3. [ ] Verificar pasta de Downloads
4. [ ] Clicar com botão direito → "Salvar como"

### ❌ Problema: Alterações não aparecem no GitHub
**Soluções:**
1. [ ] Verificar se fez commit (não apenas editou)
2. [ ] Atualizar página do GitHub
3. [ ] Verificar se está no repositório correto
4. [ ] Conferir se colou todo o conteúdo

### ❌ Problema: Site não atualizou no Netlify
**Soluções:**
1. [ ] Aguardar mais 2-3 minutos
2. [ ] Pressionar `Ctrl+Shift+R` (limpeza cache)
3. [ ] Abrir em aba anônima
4. [ ] Verificar status do Netlify:
   - Acessar https://app.netlify.com
   - Verificar deploy em andamento

### ❌ Problema: Perdeu as alterações
**Soluções:**
1. [ ] Clicar em "Restaurar Backup" na toolbar
2. [ ] Verificar localStorage:
   ```javascript
   // Console do navegador (F12):
   localStorage.getItem('visualEditorBackup')
   ```
3. [ ] Verificar arquivo exportado na pasta Downloads

### ❌ Problema: Imagens muito grandes
**Soluções:**
1. [ ] Comprimir imagens antes do upload
2. [ ] Usar ferramentas online:
   - TinyPNG: https://tinypng.com
   - Compressor.io: https://compressor.io
3. [ ] Manter fotos < 500KB

---

## 📊 Checklist Final

### Antes de Publicar
- [ ] Todas as edições concluídas
- [ ] Backup local salvo
- [ ] HTML exportado e verificado
- [ ] Fotos comprimidas se necessário

### Durante a Publicação
- [ ] Arquivo correto exportado
- [ ] GitHub commit realizado
- [ ] Mensagem de commit descritiva

### Após a Publicação
- [ ] Site atualizou no Netlify
- [ ] Todas alterações visíveis
- [ ] Testes em mobile realizados
- [ ] Links funcionando
- [ ] Galeria funcionando
- [ ] Formulários OK (se houver)

---

## 📅 Manutenção Regular

### Semanal
- [ ] Adicionar novas fotos de eventos
- [ ] Atualizar texto da home se necessário
- [ ] Verificar se vídeo está ativo

### Mensal
- [ ] Backup completo do site
- [ ] Revisar cores/layout
- [ ] Atualizar informações de contato
- [ ] Verificar velocidade do site

### Trimestral
- [ ] Limpar fotos antigas
- [ ] Otimizar imagens
- [ ] Revisar SEO
- [ ] Atualizar copyright

---

## 🎓 Recursos Adicionais

### Documentação
- [ ] Ler `COMO_EDITAR_E_PUBLICAR.md`
- [ ] Consultar `GALERIA_RECURSOS.md`
- [ ] Ver `RESUMO_SISTEMA.md`

### Ferramentas Recomendadas
- [ ] GitHub Desktop (facilita uploads)
- [ ] TinyPNG (compressão de imagens)
- [ ] ColorZilla (capturar cores)
- [ ] Lighthouse (testar performance)

### Tutoriais em Vídeo (Sugestão)
- [ ] Como usar GitHub Desktop
- [ ] Como comprimir imagens
- [ ] Como usar o editor visual
- [ ] Como fazer deploy no Netlify

---

## 📞 Contatos de Emergência

### Problemas com:
- **GitHub**: https://support.github.com
- **Netlify**: https://answers.netlify.com
- **Navegador**: Pressione F12 → Console → Copie erros

---

**✨ Última atualização:** [Data]  
**📸 Click Artes Fotografia** - Sistema de Edição v1.0
