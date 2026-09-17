# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o projeto

Biblioteca Node.js (`gerador-guia-spsadt`) que gera, em PDF, as guias TISS "SP/SADT" e "Consulta"
usadas por operadoras de saúde brasileiras, seguindo o layout definido pela ANS. Publicada no npm;
o consumidor importa as classes de modelo, monta um objeto `Guia` e chama um `Gerador*` para obter o PDF.

## Comandos

- `npm run build` — limpa `lib/`, copia as fontes TTF e transpila `src/` → `lib/` via Babel. É o único
  build; não há suíte de testes automatizada no projeto (ver seção "Melhorias" do README).
- `npm run clean` — remove `lib/`.
- Não há `npm test` nem `npm run lint` configurados no `package.json`, apesar de o eslint estar como
  devDependency e `.eslintrc.js` existir (`eslint-config-standard`). Para lintar manualmente: `npx eslint src`.
- `npm run exemplos` — builda a lib e gera os quatro PDFs de exemplo (SP/SADT e Consulta, com e sem
  o parâmetro `semFundo`). É a forma mais rápida de validar uma mudança visualmente.
- Scripts individuais, cada um builda antes de rodar (os exemplos importam de `../../lib`, não de
  `src`): `exemplo:spsadt`, `exemplo:spsadt:sem-fundo`, `exemplo:consulta`, `exemplo:consulta:sem-fundo`.
  Cada um sobrescreve o `.pdf` correspondente na pasta do exemplo — abra o arquivo para inspecionar
  visualmente o resultado do layout. Os dados fictícios de cada guia ficam em `exemplos/<gerador>/dados.js`
  (compartilhados entre `guia.js` e `guia-sem-fundo.js`), não duplicados em cada script.

## Arquitetura

O código-fonte fica em `src/` e é publicado (transpilado) em `lib/` (`main` do `package.json` aponta
para `lib/index.js`; `lib/` não é versionado).

`src/index.js` é o único ponto de entrada público e reexporta:
- **Modelos** (`src/model/*.js`): classes simples, todas seguindo o mesmo padrão — construtor com
  parâmetros posicionais que são apenas atribuídos a `this` (sem validação, sem métodos). `Guia` é o
  modelo raiz e compõe todos os demais (`Autorizacao`, `Beneficiario` → `Convenio`,
  `ContratadoSolicitante` → `ProfissionalSolicitante`, `Solicitacao` → `Procedimento[]`,
  `ContratadoExecutante` → `Endereco`, `Atendimento`, `ConsultaReferencia`,
  `ProcedimentosRealizados` → `Procedimento[]`, `OPMSolicitados[]`/`OPMRealizados[]`). A ordem
  posicional dos parâmetros do construtor é a API pública — ao alterar um modelo, é preciso atualizar
  em conjunto todos os `new X(...)` que o instanciam (exemplos em `exemplos/`, e o próprio gerador).
  Veja a árvore completa de campos no README.md.
- **Geradores** (`src/gerador/spsadt/` e `src/gerador/consulta/`): cada um tem um `index.js` (fachada
  fina, ex. `GeradorGuiaSPSADT.gerarPdf(guia, opcoes?)`) e um `GeradorDePdf.js` (a implementação real,
  grande — ~600 e ~320 linhas respectivamente). `GeradorDePdf` usa `pdfkit` diretamente para desenhar o
  layout fixo da guia: dimensões de página, posições x/y, retângulos e campos são todos coordenadas
  absolutas calibradas visualmente para bater com o layout oficial da ANS. Métodos utilitários internos
  (`secao`, `retangulo`, `campo`, `titulo`, `normal`, `italico`, `negrito`, `valor`, `logotipo`) formam
  um pequeno DSL de desenho reutilizado ao longo do método `gerar()`. Alterações de layout exigem
  ajuste fino de coordenadas e devem ser conferidas visualmente (gere os PDFs de exemplo e abra-os).
  `retangulo(pdf, x, y, largura, altura, cor)` é o único ponto do arquivo que preenche fundo
  (`.fillAndStroke`) — é o chokepoint usado pela opção `semFundo` (ver README) para zerar o cinza sem
  tocar nos dezenas de call sites de `campo`/`secao`. Cuidado: `opcoes`, `cinza` e as demais constantes
  de layout são `let` de **nível de módulo**, compartilhadas por todas as instâncias — estado
  específico de uma chamada (como `semFundo`) deve ficar em `this`, nunca reatribuído a essas variáveis
  de módulo, sob risco de vazar entre chamadas concorrentes de `gerarPdf` no mesmo processo.
- **Fontes**: `src/gerador/fontes/*.ttf` (Times New Roman e variantes) são copiadas para `lib/` no
  build via `cpx` — são um artefato de build, não algo importado por `require`/`import` normal.

`exemplos/` contém um uso completo de cada gerador, servindo como a documentação viva mais próxima de
"como montar um objeto `Guia` válido" — útil como referência ao mexer nos modelos.

## Estilo de código

- Sintaxe ES6 com Babel (`babel-preset-env`), sem `;` no fim das linhas, aspas simples — segue
  `eslint-config-standard` (mesmo sem script de lint configurado).
- Nomes de classes, campos e comentários no código são em português (domínio TISS/ANS é brasileiro).
