[![Build Status](https://travis-ci.org/joelxr/gerador-guia-spsdat.svg?branch=master)](https://travis-ci.org/joelxr/gerador-guia-spsadt)
![npm bundle size](https://img.shields.io/bundlephobia/min/gerador-guia-spsadt.svg?style=popout)
![GitHub](https://img.shields.io/github/license/joelxr/gerador-guia-spsadt.svg)
![GitHub package.json version](https://img.shields.io/github/package-json/v/joelxr/gerador-guia-spsadt.svg)

# gerador-guia-spsadt

Biblioteca para gerar guias SP/SADT no formato PDF para impressão.

## Sobre a guia SP/SADT

A guia SP/SADT é um documento utilizado pelos planos de saúde brasileiros para autorizar procedimentos dos paciente, esse documento possui um formato estabelecido pela Agência Nacional de Saúde (ANS), caso exista interesse o _layout_ estabelecido pela ANS pode ser visto [neste documento](http://www.ans.gov.br/images/stories/Plano_de_saude_e_Operadoras/tiss/Padrao_tiss/manual_de_conteudo_e_estrutura_v2110.pdf) (página 15).

## Dependências

O gerador utiliza o [`pdfkit`](http://pdfkit.org/) para gerar os arquivos PDF e essa é a ûnica depêndencia que ele possui.

## Como usar

Veja o código de exemplo: [guia.js](exemplos/spsadt/guia.js).

Basicamente, deve ser criado um objeto e depois chamar o gerador para ter o PDF. Como uma guia tem muitas informações o objeto possui muitas propriedades.

```js
var pdf = new GeradorGuiaSPSADT().gerarPdf(guia)
// ou, para a guia de Consulta:
var pdf = new GeradorGuiaConsulta().gerarPdf(guia)

pdf.pipe(fs.createWriteStream('guia.pdf'))
```

## Opções

`gerarPdf(guia, opcoes)` aceita um segundo parâmetro opcional. Quando omitido, o layout atual
(com fundo cinza nos campos) é mantido.

| Opção | Tipo | Padrão | Descrição |
|---|---|---|---|
| `semFundo` | `boolean` | `false` | Quando `true`, remove o preenchimento cinza dos campos, tabelas e faixas de seção, deixando tudo com fundo branco. Bordas e textos não são afetados. |

```js
var pdf = new GeradorGuiaSPSADT().gerarPdf(guia, { semFundo: true })
```

Veja os exemplos [guia-sem-fundo.js](exemplos/spsadt/guia-sem-fundo.js) (SP/SADT) e
[guia-sem-fundo.js](exemplos/consulta/guia-sem-fundo.js) (Consulta).

Uma guia é composta pelos seguintes campos:

- guia
  - autorizacao
    - registroANS
    - numeroGuia
    - numeroGuiaPrincipal
    - dataAutorizacao
    - senha
    - validadeSenha
    - dataEmissao
  - beneficiario
    - convenio
      - numeroCarteira
      - validadeCarteira
      - plano
      - logotipo
      - nome
    - nome
    - numeroCartaoNacionalSaude
  - contratadoSolicitante
    - documentoSolicitante
    - nome
    - cnes
    - profissionalSolicitante
      - nome
      - conselho
      - numeroConselho
      - ufConselho
      - cbo
  - solicitacao
    - dataHora
    - carater
    - cid10
    - indicacao
    - procedimentos []
      - codigoTabela
      - codigo
      - nome
      - qtdSolicitadao
      - qtdAutorizada
      - data
      - horaInicial
      - horaFinal
      - qtdRealizada
      - viaAcesso
      - tecnica
      - reducaoAcrescimoPct
      - valorUnitario
      - valorTotal
  - contratadoExecutante
    - documentoExecutante
    - nome
    - endereco
      - tipoLogradouro
      - logradouro
      - numero
      - complemento
      - municipio
      - uf
      - codigoIbgeMunicipio
      - cep
    - cnes
    - documentoComplementar
    - nomeComplementar
    - conselho
    - conselhoNumero
    - conselhoUF
    - cbo
    - grauParticipacao
  - atendimento
    - tipoAtendimento
    - indicacaoAcidente
    - tipoSaida
  - consultaReferencia
    - tipoDoenca
    - anosDoenca
    - mesesDoenca
    - diasDoenca
  - procedimentosRealizados
    - observacao
    - totalProcedimentos,
    - totalTaxasAlugueis,
    - totalMateriais,
    - totalMedicamentos,
    - totalDiarias,
    - totalGases,
    - totalGuia
    - procedimentos []
      - codigoTabela
      - codigo
      - nome
      - qtdSolicitadao
      - qtdAutorizada
      - data
      - horaInicial
      - horaFinal
      - qtdRealizada
      - viaAcesso
      - tecnica
      - reducaoAcrescimoPct
      - valorUnitario
      - valorTotal
  - opmSolicitados []
    - codigoTabela
    - codigo
    - descricao
    - quantidade
    - fabricante
    - codigoDeBarras
    - valorUnitario
    - valorTotal
    - valorTotalOPM
  - opmRealizados []
  - codigoTabela
    - codigo
    - descricao
    - quantidade
    - fabricante
    - codigoDeBarras
    - valorUnitario
    - valorTotal
    - valorTotalOPM

## Exemplo

O arquivo [exemplos/guia.pdf](exemplos/spsadt/guia.pdf) é um exemplo de guia uma gerada.

## Melhorias

- Usar `typescript` para garantir os tipos de todas as propriedades geradas.
- Melhorar / otimizar o objeto da guia.
- Testes unitários
- Atulizar versão do PDFKit
