import path from 'path'
import Pdf from 'pdfkit'

const FONTES_DIR = path.join(__dirname, '../fontes')
const TIMES_NEW_ROMAN = path.join(FONTES_DIR, 'Times New Roman.ttf')
const TIMES_NEW_ROMAN_NEGRITO = path.join(FONTES_DIR, 'Times New Roman Bold.ttf')
const TIMES_NEW_ROMAN_ITALICO = path.join(FONTES_DIR, 'Times New Roman Italic.ttf')
const TIMES_NEW_ROMAN_NEGRITO_ITALICO = path.join(FONTES_DIR, 'Times New Roman Bold Italic.ttf')

let opcoes = {
  ajusteY: 0,
  ajusteX: 0,
  autor: '',
  titulo: 'GUIA DE CONSULTA',
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

let grossuraDaLinha = 0.6
let margemTopo = 36
let margemEsquerda = 36
let margemDireita = 36
let distanciaEntreCamposZerada = 0
let distanciaEntreCampos = 4
let alturaCampo = 24
let alturaSecao = 10
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
    this.normal(pdf, '2 - Nº Guia no Prestador', x, y, larguraCampo, 'left', opcoes.tamanhoDaFonteDoTitulo)
    y += 2 * distanciaEntreCampos
    this.negrito(pdf, this.guia.autorizacao.numeroGuia, x, y, larguraCampoMuitoGrande, 'left', opcoes.tamanhoFonteNumeroGuia)

    x = 0
    y = 40

    this.campo(pdf, '1 - Registro ANS', this.guia.autorizacao.registroANS, x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '3 - Número da Guia Atribuído pela Operadora', this.guia.autorizacao.numeroGuia, x, y, larguraCampoMuitoGrande)
    y += alturaCampo + distanciaEntreCampos
    this.secao(pdf, y, 'Dados do Beneficiário')
    y += alturaSecao + distanciaEntreCampos
    x = 0
    this.campo(pdf, '4 - Número da Carteira', this.guia.beneficiario.convenio.numeroCarteira, x, y, larguraCampoNome)
    x += larguraCampoNome + distanciaEntreCampos
    this.campo(pdf, '5 - Validade da Carteira', this.guia.beneficiario.convenio.validadeCarteira, x, y, larguraCampoGrande)
    x += larguraCampoGrande + distanciaEntreCampos
    this.campo(pdf, '6 - Atendimento a RN (Sim ou Não)', '', x, y, larguraCampoGrande)
    y += alturaCampo + distanciaEntreCampos
    x = 0
    this.campo(pdf, '7 - Nome', this.guia.beneficiario.nome, x, y, larguraCampoNome + 60)
    x += larguraCampoNome + 60 + distanciaEntreCampos
    this.campo(pdf, '8 - Cartão Nacional de Saúde', this.guia.beneficiario.numeroCartaoNacionalSaude, x, y, larguraCampoMuitoGrande)

    y += alturaCampo + distanciaEntreCampos
    this.secao(pdf, y, 'Dados do Contratado')
    y += alturaSecao + distanciaEntreCampos
    x = 0
    this.campo(pdf, '9 - Código na Operadora', this.guia.contratadoSolicitante.documentoSolicitante, x, y, larguraCampoMuitoGrande)
    x += larguraCampoMuitoGrande + distanciaEntreCampos
    this.campo(pdf, '10 - Nome do Contratado', this.guia.contratadoSolicitante.nome, x, y, larguraCampoNome + 90)
    x += larguraCampoNome + 90 + distanciaEntreCampos
    this.campo(pdf, '11 - Código CNES', this.guia.contratadoSolicitante.cnes, x, y, larguraCampo)
    y += alturaCampo + distanciaEntreCampos
    x = 0
    this.campo(pdf, '12 - Nome do Profissional Executante', this.guia.contratadoSolicitante.profissionalSolicitante.nome, x, y, larguraCampoNome + 100)
    x += larguraCampoNome + 100 + distanciaEntreCampos
    this.campo(pdf, '13 - Conselho Profissional', this.guia.contratadoSolicitante.profissionalSolicitante.conselho, x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '14 - Número do Conselho', this.guia.contratadoSolicitante.profissionalSolicitante.numeroConselho, x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '15 - UF', this.guia.contratadoSolicitante.profissionalSolicitante.ufConselho, x, y, larguraCampoPequeno)
    x += larguraCampoPequeno + distanciaEntreCampos
    this.campo(pdf, '16 - Código CBO', this.guia.contratadoSolicitante.profissionalSolicitante.cbo, x, y, larguraCampo)

    y += alturaCampo + distanciaEntreCampos
    this.secao(pdf, y, 'Dados do Atendimento / Procedimento Realizado')
    y += alturaSecao + distanciaEntreCampos
    x = 0
    this.campo(pdf, '17 - Indicação de Acidente (acidente ou doença relacionada)', '', x, y, larguraCampoNome)
    y += alturaCampo + distanciaEntreCampos
    x = 0
    this.campo(pdf, '18 - Data do Atendimento', '', x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '19 - Tipo de Consulta', '', x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '20 - Tabela', '', x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '21 - Código do Procedimento', '', x, y, larguraCampo)
    x += larguraCampo + distanciaEntreCampos
    this.campo(pdf, '22 - Valor do Procedimento', '', x, y, larguraCampo)

    y += alturaCampo + distanciaEntreCampos
    x = 0

    this.retangulo(
      pdf,
      x,
      y,
      opcoes.larguraDaPagina - (margemEsquerda + margemDireita),
      160,
      cinza
    )

    y += distanciaEntreCampos
    x += distanciaEntreCampos
    this.titulo(pdf, '23 - Observação / Justificativa', x, y, larguraCampoGrande, 'left')

    y += 160
    x = 0
    this.campo(pdf, '24 - Assinatura do Profissional Executante', '', x, y, larguraCampoMuitoGrande)
    x += larguraCampoMuitoGrande + distanciaEntreCampos
    this.campo(pdf, '25 - Asinatura do Beneficiário ou Responsável', '', x, y, larguraCampoMuitoGrande)

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
    this.retangulo(pdf, 0, y, opcoes.larguraDaPagina - 72, alturaSecao, cinza)
    this.titulo(pdf, titulo, 2, y + 1, opcoes.larguraDaPagina - 72, 'left', opcoes.tamanhoDaFonteDoTitulo)
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
    x += 10 + opcoes.ajusteX
    y += 10 + opcoes.ajusteY + opcoes.ajusteYDoLogotipo

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
