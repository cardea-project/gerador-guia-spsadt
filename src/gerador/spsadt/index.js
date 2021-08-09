import GeradorDePdf from './GeradorDePdf'

export class GeradorGuiaSPSADT {
  gerarPdf (guia) {
    return new GeradorDePdf(guia).gerar()
  }
}
