# gerador-guia-sp-sadt

Biblioteca para gerar guias SP/SADT no formato PDF para impressão.

## Sobre a guia SP/SADT

A guia SP/SADT é um documento utilizado pelos planos de saúde brasileiros para autorizar procedimentos dos paciente, esse documento possui um formato estabelecido pela Agência Nacional de Saúde (ANS), caso exista interesse o _layout_ estabelecido pela ANS pode ser visto [neste documento](http://www.ans.gov.br/images/stories/Plano_de_saude_e_Operadoras/tiss/Padrao_tiss/manual_de_conteudo_e_estrutura_v2110.pdf) (página 15).

## Dependências

O gerador utiliza o [`pdfkit`](http://pdfkit.org/) para gerar os arquivos PDF e essa é a ûnica depêndencia que ele possui.

## Como usar

Veja o código de exemplo: [guia.js](exemplos/guia.js).

Basicamente, deve ser criado um objeto e depois chamar o gerador para ter o PDF. Como uma guia tem muitas informações o objeto possui muitas propriedades.

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

O arquivo [exemplos/guia.pdf](exemplos/guia.pdf) é um exemplo de guia uma gerada.

## Melhorias

- Usar `typescript` para garantir os tipos de todas as propriedades geradas.
- Melhorar / otimizar o objeto da guia.
