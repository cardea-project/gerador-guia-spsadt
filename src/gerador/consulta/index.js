import GeradorDePdf from './GeradorDePdf'

export class GeradorGuiaConsulta {
  gerarPdf (guia, opcoes = {}) {
    return new GeradorDePdf(guia, opcoes).gerar()
  }
}
