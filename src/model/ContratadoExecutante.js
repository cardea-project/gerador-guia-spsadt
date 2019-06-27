export class ContratadoExecutante {
  constructor (
    documentoExecutante,
    nome,
    endereco,
    cnes,
    documentoComplementar,
    nomeComplementar,
    conselho,
    conselhoNumero,
    conselhoUF,
    cbo,
    grauParticipacao
  ) {
    this.documentoExecutante = documentoExecutante
    this.nome = nome
    this.endereco = endereco
    this.cnes = cnes
    this.documentoComplementar = documentoComplementar
    this.nomeComplementar = nomeComplementar
    this.conselho = conselho
    this.conselhoNumero = conselhoNumero
    this.conselhoUF = conselhoUF
    this.cbo = cbo
    this.grauParticipacao = grauParticipacao
  }
}
