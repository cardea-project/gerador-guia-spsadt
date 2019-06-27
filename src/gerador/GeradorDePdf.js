import path from 'path'
import Pdf from 'pdfkit'

const FONTES_DIR = path.join(__dirname, './fontes')
const TIMES_NEW_ROMAN = path.join(FONTES_DIR, 'Times New Roman.ttf')
const TIMES_NEW_ROMAN_NEGRITO = path.join(FONTES_DIR, 'Times New Roman Bold.ttf')
const TIMES_NEW_ROMAN_ITALICO = path.join(FONTES_DIR, 'Times New Roman Italic.ttf')
const TIMES_NEW_ROMAN_NEGRITO_ITALICO = path.join(FONTES_DIR, 'Times New Roman Bold Italic.ttf')

let opcoes = {
  ajusteY: 0,
  ajusteX: 0,
  autor: '',
  titulo: 'GUIA DE SERVIÇO PROFISSIONAL / SERVIÇO AUXILIAR DE DIAGNÓSTICO E TERAPIA - SP /SADT',
  criador: '',
  tamanhoDaFonteDoTitulo: 6,
  tamanhoDaFonteDoCampo: 8,
  tamanhoDaFonteDoCampoMenor: 6,
  tamanhoDaFonteDaSecao: 5.5,
  tamanhoDaFonteTituloPrincipal: 10,
  tamanhoFonteNumeroGuia: 14,
  layout: 'landscape',
  corDoTitulo: 'black',
  alinhamentoDoTitulo: 'center',
  alinhamentoDoTituloDaTabela: 'center',
  corDaSecao: 'black',
  alinhamentoDoCampo: 'center',
  corDoCampo: 'black',
  tamanhoDaFonteDosItens: 7,
  separadorDeItens: true,
  ajusteYDoLogotipo: 0,
  ajusteYDaIdentificacaoDoEmitente: 0,
  corDoLayout: 'black',
  larguraDaPagina: 841.68,
  alturaDaPagina: 595.44,
  creditos: ''
}

let grossuraDaLinha = 0.5
let margemTopo = 10
let margemEsquerda = 10
let margemDireita = 10
let distanciaEntreCamposZerada = 0
let distanciaEntreCampos = 2
let alturaCampo = 22
let alturaSecao = 8
let larguraTitulo = 540
let larguraCampo = 80
let larguraCampoMuitoPequeno = 25
let larguraCampoPequeno = 40
let larguraCampoMedio = 90
let larguraCampoMedioMaior = 110
let larguraCampoGrande = 120
let larguraCampoGrandeMedio = 150
let larguraCampoMuitoGrande = 220
let larguraCampoNome = 370
let larguraCampoIndicacao = 535
let cinza = '#dedede'

class GeradorDePdf {
  constructor (guia) {
    this.guia = guia
  }

  gerar () {
    let pdf = new Pdf({
      bufferPages: true,
      margin: 0,
      layout: opcoes.layout,
      size: [
        opcoes.alturaDaPagina,
        opcoes.larguraDaPagina
      ],
      info: {
        Author: opcoes.autor,
        Title: opcoes.titulo,
        Creator: opcoes.criador,
        Producer: opcoes.produzidoPor
      }
    })

    pdf.lineWidth(grossuraDaLinha)

    if (opcoes.stream) {
      pdf.pipe(opcoes.stream)
    }

    this.cadastrarFontes(pdf)

    let x = 0
    let y = 0

    this.logotipo(pdf, x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.titulo(pdf, opcoes.titulo, x, y, larguraTitulo, opcoes.alinhamentoDoTitulo, opcoes.tamanhoDaFonteTituloPrincipal)
    x += larguraTitulo + distanciaEntreCampos
    this.normal(pdf, '2 - Nº', x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += larguraCampoMuitoPequeno + distanciaEntreCampos
    this.negrito(pdf, this.guia.autorizacao.numeroGuia, x, y, larguraCampoMuitoGrande, 'left', opcoes.tamanhoFonteNumeroGuia)

    x = 0
    y = 40

    this.campo(pdf, '1 - Registro ANS', this.guia.autorizacao.registroANS, x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '3 - Nº Guia Principal', this.guia.autorizacao.numeroGuiaPrincipal, x, y, larguraCampoMuitoGrande, cinza)
    x += larguraCampoMuitoGrande + distanciaEntreCampos
    this.campo(pdf, '4 - Data da Autorização', this.guia.autorizacao.dataAutorizacao, x, y, larguraCampo, cinza)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '5 - Senha', this.guia.autorizacao.senha, x, y, larguraCampoGrande, cinza)
    x += larguraCampoGrande + distanciaEntreCampos
    this.campo(pdf, '6 - Data Validade da Senha', this.guia.autorizacao.validadeSenha, x, y, larguraCampo, cinza)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '7 - Data de Emissão da Guia', '' /* this.guia.autorizacao.dataEmissao */, x, y, larguraCampo)

    y += alturaCampo + distanciaEntreCampos
    this.secao(pdf, y, 'Dados do Beneficiário')
    y += alturaSecao + distanciaEntreCampos
    x = 0
    this.campo(pdf, '8 - Número da Carteira', this.guia.beneficiario.convenio.numeroCarteira, x, y, larguraCampoGrande)
    x += larguraCampoGrande + distanciaEntreCampos
    this.campo(pdf, '9 - Plano', this.guia.beneficiario.convenio.nomeDoPlano, x, y, larguraCampoGrande)
    x += larguraCampoGrande + distanciaEntreCampos
    this.campo(pdf, '10 - Valida da Carteira', this.guia.beneficiario.convenio.validadeCarteira, x, y, larguraCampo, cinza)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '11 - Nome', this.guia.beneficiario.nome, x, y, larguraCampoNome)
    x += larguraCampoNome + distanciaEntreCampos
    this.campo(pdf, '12 - Número do Cartão Nacional de Saúde', this.guia.beneficiario.numeroCartaoNacionalSaude, x, y, larguraCampoGrande + 3, cinza)

    y += alturaCampo + distanciaEntreCampos
    this.secao(pdf, y, 'Dados do Contratado Solicitante')
    y += alturaSecao + distanciaEntreCampos
    x = 0
    this.campo(pdf, '13 - Código na Operadora / CPF / CNPJ', this.guia.contratadoSolicitante.documentoSolicitante, x, y, larguraCampoGrande)
    x += larguraCampoGrande + distanciaEntreCampos
    this.campo(pdf, '14 - Nome do Contratado', this.guia.contratadoSolicitante.nome, x, y, larguraCampoNome)
    x += larguraCampoNome + distanciaEntreCampos
    this.campo(pdf, '15 - Código CNES', this.guia.contratadoSolicitante.cnes, x, y, larguraCampo, cinza)
    y += alturaCampo + distanciaEntreCampos
    x = 0
    this.campo(pdf, '16 - Nome do Profissional Solicitante', this.guia.contratadoSolicitante.profissionalSolicitante.nome, x, y, larguraCampoNome, cinza)
    x += larguraCampoNome + distanciaEntreCampos
    this.campo(pdf, '17 - Conselho Profissional', this.guia.contratadoSolicitante.profissionalSolicitante.conselho, x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '18 - Número do Conselho', this.guia.contratadoSolicitante.profissionalSolicitante.numeroConselho, x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '19 - UF', this.guia.contratadoSolicitante.profissionalSolicitante.ufConselho, x, y, larguraCampoPequeno)
    x += larguraCampoPequeno + distanciaEntreCampos
    this.campo(pdf, '20 - Código CBO S', this.guia.contratadoSolicitante.profissionalSolicitante.cbo, x, y, larguraCampo)

    y += alturaCampo + distanciaEntreCampos
    this.secao(pdf, y, 'Dados da Solicitaçãp / Procedimentos e Exames Solicitados')
    y += alturaSecao + distanciaEntreCampos
    x = 0
    this.campo(pdf, '21 - Data / Hora da Solicitação', this.guia.solicitacao.dataHora, x, y, larguraCampoGrande, cinza)
    x += larguraCampoGrande + distanciaEntreCampos
    this.campo(pdf, '22 - Caráter de Solicitação', this.guia.solicitacao.carater, x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '23 - CID 10', this.guia.solicitacao.cid10, x, y, larguraCampo, cinza)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '24 - Indicação clínica', this.guia.solicitacao.indicacao, x, y, larguraCampoIndicacao, cinza)

    y += alturaCampo + distanciaEntreCampos
    x = 0

    this.retangulo(
      pdf,
      x,
      y,
      3 * (larguraCampo + distanciaEntreCampos),
      5 * (alturaSecao + 2 * distanciaEntreCampos),
      cinza
    )

    this.retangulo(
      pdf,
      3 * (larguraCampo + distanciaEntreCampos),
      y,
      opcoes.larguraDaPagina - margemEsquerda - margemDireita - 3 * (larguraCampo + distanciaEntreCampos),
      5 * (alturaSecao + 2 * distanciaEntreCampos)
    )

    x += distanciaEntreCampos
    y += distanciaEntreCampos

    this.titulo(pdf, '25 - Tabela', x, y, larguraCampo, 'left')
    x += larguraCampoGrandeMedio + distanciaEntreCampos
    this.titulo(pdf, '26 - Código do Procedimento', x, y, larguraCampo, 'left')
    x += larguraCampo + 10 * distanciaEntreCampos
    this.titulo(pdf, '27 - Descrição', x, y, larguraCampoMuitoGrande, 'left')
    x += larguraCampoMuitoGrande + distanciaEntreCampos
    this.titulo(pdf, '28 - Quatidade Solicitada', x, y, larguraCampo, 'left')
    x += larguraCampo + distanciaEntreCampos
    this.titulo(pdf, '29 - Quatidade Autorizada', x, y, larguraCampo, 'left')

    this.guia.solicitacao.procedimentos.forEach(p => {
      y += alturaSecao + distanciaEntreCampos
      x = distanciaEntreCampos
      this.valor(pdf, p.codigoTabela, x, y, larguraCampoGrandeMedio, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampoGrandeMedio + distanciaEntreCampos
      this.valor(pdf, p.codigo, x, y, larguraCampo, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampo + 10 * distanciaEntreCampos
      this.valor(pdf, p.nome.substring(0, 40), x, y, larguraCampoMuitoGrande, 'left', opcoes.larguraCampoGrande)
      x += larguraCampoMuitoGrande + distanciaEntreCampos
      this.valor(pdf, p.qtdSolicitada, x, y, larguraCampo, 'left', opcoes.larguraCampoPequeno)
      x += larguraCampo + distanciaEntreCampos
      this.valor(pdf, p.qtdAutorizada, x, y, larguraCampo, 'left', opcoes.larguraCampoPequeno)
    })

    y += (5 - this.guia.solicitacao.procedimentos.length) * (alturaSecao + distanciaEntreCampos)
    y += alturaSecao + distanciaEntreCampos
    x = 0

    this.secao(pdf, y, 'Dados do Contratado Executante')
    y += alturaSecao + distanciaEntreCampos
    this.campo(pdf, '30 - Código na Operadora / CPF / CNPJ', this.guia.contratadoExecutante.documentoExecutante, x, y, larguraCampoMedio)
    x += larguraCampoMedio + distanciaEntreCampos
    this.campo(pdf, '31 - Nome do Contratado', this.guia.contratadoExecutante.nome, x, y, larguraCampoMuitoGrande, undefined, opcoes.tamanhoDaFonteDoCampoMenor)
    x += larguraCampoMuitoGrande + distanciaEntreCampos
    this.campo(pdf, '32-T.L.', this.guia.contratadoExecutante.endereco.tipoLogradouro, x, y, larguraCampoMuitoPequeno, cinza)
    x += larguraCampoMuitoPequeno + distanciaEntreCampos
    this.campo(pdf, '33-34-35-Logradouro - Número - Complemento', `${this.guia.contratadoExecutante.endereco.logradouro}, ${this.guia.contratadoExecutante.endereco.numero}. ${this.guia.contratadoExecutante.endereco.complemento}.`, x, y, 200, cinza, opcoes.tamanhoDaFonteDoCampoMenor)
    x += 200 + distanciaEntreCampos
    this.campo(pdf, '36 - Município', this.guia.contratadoExecutante.endereco.municipio, x, y, 110, cinza, opcoes.tamanhoDaFonteDoCampoMenor)
    x += 110 + distanciaEntreCampos
    this.campo(pdf, '37 - UF', this.guia.contratadoExecutante.endereco.uf, x, y, larguraCampoMuitoPequeno, cinza)
    x += larguraCampoMuitoPequeno + distanciaEntreCampos
    this.campo(pdf, '38 - Cód.IBGE', this.guia.contratadoExecutante.endereco.codigoIbgeMunicipio, x, y, larguraCampoPequeno, cinza)
    x += larguraCampoPequeno + distanciaEntreCampos
    this.campo(pdf, '39 - CEP', this.guia.contratadoExecutante.endereco.cep, x, y, larguraCampoPequeno, cinza)
    x += larguraCampoPequeno + distanciaEntreCampos
    this.campo(pdf, '40 - Código CNES', this.guia.contratadoExecutante.cnes, x, y, 55, cinza)

    y += alturaCampo + distanciaEntreCampos
    x = 0

    this.campo(pdf, '40a - Código na Operadora / CPF do exec. complementar', this.guia.contratadoExecutante.documentoComplementar, x, y, 160, cinza)
    x += 160 + distanciaEntreCampos
    this.campo(pdf, '41 - Nome do Profissional Executante Complementar', this.guia.contratadoExecutante.nomeComplementar, x, y, 300, cinza, opcoes.tamanhoDaFonteDoCampoMenor)
    x += 300 + distanciaEntreCampos
    this.campo(pdf, '42 - Conselho Profissional', this.guia.contratadoExecutante.conselho, x, y, larguraCampo, cinza)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '43 - Número no Conselho', this.guia.contratadoExecutante.conselhoNumero, x, y, larguraCampo, cinza)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '44 - UF', this.guia.contratadoExecutante.conselhoUF, x, y, larguraCampoMuitoPequeno, cinza)
    x += larguraCampoMuitoPequeno + distanciaEntreCampos
    this.campo(pdf, '45 - Código CBO S', this.guia.contratadoExecutante.cbo, x, y, larguraCampo, cinza)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '45a - Grau de Participação', this.guia.contratadoExecutante.grauParticipacao, x, y, larguraCampo + 4, cinza)

    y += alturaCampo + distanciaEntreCampos
    x = 0
    this.secao(pdf, y, 'Dados do Atendimento')
    y += alturaSecao + distanciaEntreCampos
    this.campo(pdf, '46 - Tipo Atendimento', this.guia.atendimento.tipoAtendimento, x, y, 350, cinza, opcoes.tamanhoDaFonteDoCampo, 65, '01 - Remoção  02 - Pequena Cirurgia  03 - Terapias  04 - Consulta  05 - Exame  06 - Atendimento Domiciliar  07 - SADT Internado  08 - Quimioterapia  09 - Radioterapia  10 - TRS - Terapia Renal Substitutiva')
    x += 350 + distanciaEntreCampos
    this.campo(pdf, '47 - Indicação de Paciente', this.guia.atendimento.indicacaoAcidente, x, y, 245, cinza, opcoes.tamanhoDaFonteDoCampo, 80, '0 - Acidente ou doença relacionado ao trabalho  1 - Trânsito  2 - Outros')
    x += 245 + distanciaEntreCampos
    this.campo(pdf, '48 - Tipo de Saîda', this.guia.atendimento.tipoSaida, x, y, 222, cinza, opcoes.tamanhoDaFonteDoCampo, 80, '1 - Retorno  2 - Retorno SADT  3 - Referência  4 - Internação  5 - Alta  6 - Óbito')

    y += alturaCampo + distanciaEntreCampos
    x = 0
    this.secao(pdf, y, 'Consulta Referência')
    y += alturaSecao + distanciaEntreCampos
    this.campo(pdf, '49 - Tipo de Doença', this.guia.consultaReferencia.tipoDoenca, x, y, 140, cinza, opcoes.tamanhoDaFonteDoCampo, 65, 'A - Aguda  C - Crônica')
    x += 140 + distanciaEntreCampos
    let anos = this.guia.consultaReferencia.anosDoenca || ''
    let meses = this.guia.consultaReferencia.mesesDoenca || ''
    let dias = this.guia.consultaReferencia.diasDoenca || ''
    this.campo(pdf, '50 - Tempo de Doença', `${anos} ${meses} ${dias}`, x, y, 160, cinza, opcoes.tamanhoDaFonteDoCampo, 65, 'A - Anos  M - Meses  D - Dias')

    y += alturaCampo + distanciaEntreCampos
    this.secao(pdf, y, 'Procedimentoes e Exames Realizados')
    y += alturaSecao + distanciaEntreCampos
    x = 0

    this.retangulo(
      pdf,
      x,
      y,
      larguraCampo + distanciaEntreCampos,
      5 * (alturaSecao + 2 * distanciaEntreCampos)
    )

    this.retangulo(
      pdf,
      x + larguraCampo + distanciaEntreCampos,
      y,
      2 * (larguraCampoMuitoPequeno + distanciaEntreCampos),
      5 * (alturaSecao + 2 * distanciaEntreCampos),
      cinza
    )

    this.retangulo(
      pdf,
      x + 2 * larguraCampoMuitoPequeno + larguraCampo + 3 * distanciaEntreCampos,
      y,
      4 * distanciaEntreCampos + larguraCampoGrandeMedio + larguraCampo + larguraCampoMuitoGrande + larguraCampoMuitoPequeno,
      5 * (alturaSecao + 2 * distanciaEntreCampos)
    )

    this.retangulo(
      pdf,
      x + 7 * distanciaEntreCampos + 2 * larguraCampo + 3 * larguraCampoMuitoPequeno + larguraCampoGrandeMedio + larguraCampoMuitoGrande,
      y,
      5 * distanciaEntreCampos + 2 * larguraCampoMuitoPequeno + 50 + 2 * larguraCampoPequeno + 10,
      5 * (alturaSecao + 2 * distanciaEntreCampos),
      cinza
    )

    x = distanciaEntreCampos
    y += distanciaEntreCampos

    this.titulo(pdf, '51-Data', x, y, larguraCampo, 'left')
    x += larguraCampo + distanciaEntreCampos
    this.titulo(pdf, '52-H.Ini.', x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += larguraCampoMuitoPequeno + distanciaEntreCampos
    this.titulo(pdf, '53-H.Fim', x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += larguraCampoMuitoPequeno + distanciaEntreCampos
    this.titulo(pdf, '54-Tabela', x, y, larguraCampoGrandeMedio, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += larguraCampoGrandeMedio + distanciaEntreCampos
    this.titulo(pdf, '55-Código Procedimento', x, y, larguraCampo, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += larguraCampo + distanciaEntreCampos
    this.titulo(pdf, '56-Descrição', x, y, larguraCampoMuitoGrande, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += larguraCampoMuitoGrande + distanciaEntreCampos
    this.titulo(pdf, '57-Qtde.', x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += larguraCampoMuitoPequeno + distanciaEntreCampos
    this.titulo(pdf, '58-Via', x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += larguraCampoMuitoPequeno + distanciaEntreCampos
    this.titulo(pdf, '58-Tec.', x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += larguraCampoMuitoPequeno + distanciaEntreCampos
    this.titulo(pdf, '60% Red./Acresc.', x, y, 50, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += 50 + distanciaEntreCampos
    this.titulo(pdf, '61-V.Unit R$', x, y, larguraCampoPequeno, 'left', opcoes.tamanhoDaFonteDoTitulo)
    x += larguraCampoPequeno + distanciaEntreCampos
    this.titulo(pdf, '62-V.Total R$', x + 2, y, larguraCampoPequeno, 'left', opcoes.tamanhoDaFonteDoTitulo)

    this.guia.procedimentosRealizados.procedimentos.forEach(p => {
      y += alturaSecao + distanciaEntreCampos
      x = distanciaEntreCampos
      this.valor(pdf, '', x, y - 2, larguraCampo, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampo + distanciaEntreCampos
      this.valor(pdf, p.horaInicial, x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampoMuitoPequeno + distanciaEntreCampos
      this.valor(pdf, p.horaFinal, x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampoMuitoPequeno + distanciaEntreCampos
      this.valor(pdf, p.codigoTabela, x, y, larguraCampoGrandeMedio, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampoGrandeMedio + distanciaEntreCampos
      this.valor(pdf, p.codigo, x, y, larguraCampo, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampo + distanciaEntreCampos
      this.valor(pdf, p.nome.substring(0, 40), x, y, larguraCampoMuitoGrande, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampoMuitoGrande + distanciaEntreCampos
      this.valor(pdf, p.qtdRealizada, x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampoMuitoPequeno + distanciaEntreCampos
      this.valor(pdf, p.viaAcesso, x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampoMuitoPequeno + distanciaEntreCampos
      this.valor(pdf, p.tecnica, x, y, larguraCampoMuitoPequeno, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampoMuitoPequeno + distanciaEntreCampos
      this.valor(pdf, p.reducaoAcrescimoPct, x, y, 50, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += 50 + distanciaEntreCampos
      this.valor(pdf, '' /*p.valorUnitario*/, x, y, larguraCampoPequeno, 'left', opcoes.tamanhoDaFonteDoCampo)
      x += larguraCampoPequeno + distanciaEntreCampos
      this.valor(pdf, '' /*p.valorTotal*/, x, y, larguraCampoPequeno, 'left', opcoes.tamanhoDaFonteDoCampo)
    })

    y += (5 - this.guia.procedimentosRealizados.procedimentos.length) * (alturaSecao + distanciaEntreCampos)
    y += alturaSecao + distanciaEntreCampos
    x = 0

    let largura = 158
    let altura = 10

    this.retangulo(
      pdf,
      x,
      y,
      5 * (largura + 3 * distanciaEntreCampos),
      2 * (altura + 3 * distanciaEntreCampos),
      cinza
    )

    x += distanciaEntreCampos
    this.titulo(pdf, '63 - Data e Assinatura de Procedimentos em Série', x, y, largura, 'left')

    y += altura
    this.titulo(pdf, '1 -   |____|____|____|   ________________________________', x, y, largura, 'left')
    x += largura + distanciaEntreCampos
    this.titulo(pdf, '3 -   |____|____|____|   ________________________________ ', x, y, largura, 'left')
    x += largura + distanciaEntreCampos
    this.titulo(pdf, '5 -   |____|____|____|   ________________________________ ', x, y, largura, 'left')
    x += largura + distanciaEntreCampos
    this.titulo(pdf, '7 -   |____|____|____|   ________________________________ ', x, y, largura, 'left')
    x += largura + distanciaEntreCampos
    this.titulo(pdf, '9 -   |____|____|____|   ________________________________ ', x, y, largura, 'left')

    y += altura + distanciaEntreCampos
    x = distanciaEntreCampos
    this.titulo(pdf, '2 -   |____|____|____|   ________________________________ ', x, y, largura, 'left')
    x += largura + distanciaEntreCampos
    this.titulo(pdf, '4 -   |____|____|____|   ________________________________ ', x, y, largura, 'left')
    x += largura + distanciaEntreCampos
    this.titulo(pdf, '6 -   |____|____|____|   ________________________________ ', x, y, largura, 'left')
    x += largura + distanciaEntreCampos
    this.titulo(pdf, '8 -   |____|____|____|   ________________________________ ', x, y, largura, 'left')
    x += largura + distanciaEntreCampos
    this.titulo(pdf, '10 -  |____|____|____|   ________________________________ ', x, y, largura, 'left')

    y += altura + distanciaEntreCampos
    x = 0

    this.retangulo(
      pdf,
      x,
      y,
      5 * (largura + 3 * distanciaEntreCampos),
      2 * (altura + 3 * distanciaEntreCampos),
      cinza
    )

    x += distanciaEntreCampos
    this.titulo(pdf, '64 - Ovservação', x, y, largura, 'left')
    y += altura
    this.valor(pdf, this.guia.procedimentosRealizados.observacao, x, y, 5 * (largura + 3 * distanciaEntreCampos), 'left')

    largura = (opcoes.larguraDaPagina - margemEsquerda - margemDireita - (7 * distanciaEntreCampos)) / 7

    x = 0
    y += alturaCampo + distanciaEntreCampos
    this.campo(pdf, '65 - Total Procedimentos R$', this.guia.procedimentosRealizados.totalProcedimentos, x, y, largura, cinza)
    x += largura + distanciaEntreCampos
    this.campo(pdf, '66 - Total Taxas e Aluguéis R$', this.guia.procedimentosRealizados.totalTaxasAlugueis, x, y, largura, cinza)
    x += largura + distanciaEntreCampos
    this.campo(pdf, '67 - Total Materiais R$', this.guia.procedimentosRealizados.totalMateriais, x, y, largura, cinza)
    x += largura + distanciaEntreCampos
    this.campo(pdf, '68 - Total Medicamentos R$', this.guia.procedimentosRealizados.totalMedicamentos, x, y, largura, cinza)
    x += largura + distanciaEntreCampos
    this.campo(pdf, '69 - Total Diárias R$', this.guia.procedimentosRealizados.totalDiarias, x, y, largura, cinza)
    x += largura + distanciaEntreCampos
    this.campo(pdf, '70 - Total Gases Medicinais R$', this.guia.procedimentosRealizados.totalGases, x, y, largura, cinza)
    x += largura + distanciaEntreCampos
    this.campo(pdf, '71 - Total Geral da Guia R$', this.guia.procedimentosRealizados.totalGuia, x, y, largura, cinza)
    x += largura + distanciaEntreCampos

    largura = (opcoes.larguraDaPagina - margemEsquerda - margemDireita - (4 * distanciaEntreCampos)) / 4
    y += alturaCampo + distanciaEntreCampos
    x = 0
    this.campo(pdf, '86 - Data e Assinatura do Solicitante', '|____| / |____| / |____|  _______________________________', x, y, largura, cinza)
    x += largura + distanciaEntreCampos
    this.campo(pdf, '87 - Data e Assinatura do Responsável pela Autorização', '|____| / |____| / |____|  _______________________________', x, y, largura, cinza)
    x += largura + distanciaEntreCampos
    this.campo(pdf, '88 - Data e Assinatura do Beneficiario ou Responsável', '|____| / |____| / |____|  _____________________________', x, y, largura, cinza)
    x += largura + distanciaEntreCampos
    this.campo(pdf, '86 - Data e Assinatura do Prestador Executante', '|____| / |____| / |____|  _____________________________', x, y, largura, cinza)
    x += largura + distanciaEntreCampos

    let paginas = pdf.bufferedPageRange()

    for (let i = paginas.start; i < paginas.start + paginas.count; i++) {
      pdf.switchToPage(i)
    }

    pdf.flushPages()
    pdf.end()
    return pdf
  }

  cadastrarFontes (pdf) {
    pdf.registerFont('normal', TIMES_NEW_ROMAN)
    pdf.registerFont('negrito', TIMES_NEW_ROMAN_NEGRITO)
    pdf.registerFont('italico', TIMES_NEW_ROMAN_ITALICO)
    pdf.registerFont('negrito-italico', TIMES_NEW_ROMAN_NEGRITO_ITALICO)
  }

  secao (pdf, y, titulo) {
    this.retangulo(pdf, 0, y, opcoes.larguraDaPagina - 20, alturaSecao, cinza)
    this.titulo(pdf, titulo, 2, y + 1, opcoes.larguraDaPagina - 20, 'left', opcoes.tamanhoDaFonteDoTitulo)
  }

  retangulo (pdf, x, y, largura, altura, cor) {
    cor = cor || '#fff'
    pdf
      .rect(
        margemEsquerda + opcoes.ajusteX + x,
        margemTopo + opcoes.ajusteY + y,
        largura,
        altura
      )
      .fillAndStroke(cor, '#030303')
  }

  campo (pdf, titulo, valor, x, y, largura, cor, tamanhoTexto, larguraValor, legenda) {
    this.retangulo(pdf, x, y, largura, alturaCampo, cor)
    this.titulo(pdf, titulo, x + distanciaEntreCampos, y + distanciaEntreCampos, largura, 'left', opcoes.tamanhoDaFonteDoTitulo)
    this.valor(pdf, valor, x, y + 12, largura - distanciaEntreCampos, 'right', tamanhoTexto)

    if (legenda && larguraValor) {
      this.valor(pdf, legenda, x + larguraValor, y + distanciaEntreCampos, largura - distanciaEntreCampos - larguraValor, 'left', opcoes.tamanhoDaFonteDoCampoMenor)
    }
  }

  titulo (pdf, string, x, y, largura, alinhamento, tamanho) {
    string = string || ''
    x = margemEsquerda + opcoes.ajusteX + x
    y = margemTopo + opcoes.ajusteY + y

    pdf
      .font('negrito')
      .fillColor(opcoes.corDoTitulo)
      .fontSize(tamanho || opcoes.tamanhoDaFonteDoTitulo)
      .text(string, x, y, {
        width: largura,
        align: alinhamento || opcoes.alinhamentoDoTitulo
      })
  }

  logotipo (pdf, x, y, largura) {
    let logotipo = this.guia.beneficiario.convenio.logotipo
    x += margemEsquerda + opcoes.ajusteX
    y += margemTopo + opcoes.ajusteY + opcoes.ajusteYDoLogotipo

    if (logotipo) {
      pdf.image(logotipo, x, y, { fit: [largura, largura] })
    } else {
      this.negrito(pdf, this.guia.beneficiario.convenio.nome, x, y, largura, 'center', opcoes.tamanhoDaFonteDoCampo)
    }
  }

  normal (pdf, string, x, y, largura, alinhamento, tamanho) {
    string = string || ''

    pdf
      .font('normal')
      .fillColor(opcoes.corDoTitulo)
      .fontSize(tamanho || 8)
      .text(string,
        margemEsquerda + opcoes.ajusteX + x,
        margemTopo + opcoes.ajusteY + y, {
          width: largura,
          align: alinhamento || 'center',
          lineGap: -1.5
        }
      )
  }

  italico (pdf, string, x, y, largura, alinhamento, tamanho) {
    string = string || ''

    pdf
      .font('italico')
      .fillColor(opcoes.corDoTitulo)
      .fontSize(tamanho || 6)
      .text(string,
        margemEsquerda + opcoes.ajusteX + x,
        margemTopo + opcoes.ajusteY + y, {
          width: largura,
          align: alinhamento || 'center',
          lineGap: -1.5
        }
      )
  }

  negrito (pdf, string, x, y, largura, alinhamento, tamanho) {
    string = string || ''

    pdf
      .font('negrito')
      .fillColor(opcoes.corDoTitulo)
      .fontSize(tamanho || 6)
      .text(string,
        margemEsquerda + opcoes.ajusteX + x,
        margemTopo + opcoes.ajusteY + y, {
          width: largura,
          align: alinhamento || 'center',
          lineGap: -1.5
        }
      )
  }

  valor (pdf, string, x, y, largura, alinhamento, tamanho) {
    string = string || ''

    pdf
      .font('normal')
      .fillColor(opcoes.corDoCampo)
      .fontSize(tamanho || opcoes.tamanhoDaFonteDoCampo)
      .text(string,
        margemEsquerda + opcoes.ajusteX + x,
        margemTopo + opcoes.ajusteY + y,
        {
          width: largura,
          align: alinhamento || opcoes.alinhamentoDoCampo
        }
      )
  }
}

export default GeradorDePdf
