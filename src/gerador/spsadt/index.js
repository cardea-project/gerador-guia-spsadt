import GeradorDePdf from './GeradorDePdf'

export class GeradorGuiaSPSADT {
  gerarPdf (guia, opcoes = {}) {
    return new GeradorDePdf(guia, opcoes).gerar()
  }
}
