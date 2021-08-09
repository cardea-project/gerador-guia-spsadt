import GeradorDePdf from './GeradorDePdf'

export class GeradorGuiaConsulta {
  gerarPdf (guia) {
    return new GeradorDePdf(guia).gerar()
  }
}
