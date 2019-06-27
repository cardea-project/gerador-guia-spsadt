import GeradorDePdf from './GeradorDePdf'

export class Gerador {
  gerarPdf (guia) {
    return new GeradorDePdf(guia).gerar()
  }
}
