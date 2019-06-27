export class Procedimento {
  constructor (
    codigoTabela,
    codigo,
    nome,
    qtdSolicitada,
    qtdAutorizada,
    data,
    horaInicial,
    horaFinal,
    qtdRealizada,
    viaAcesso,
    tecnica,
    reducaoAcrescimoPct,
    valorUnitario,
    valorTotal
  ) {
    this.codigoTabela = codigoTabela
    this.codigo = codigo
    this.nome = nome
    this.qtdSolicitada = qtdSolicitada
    this.qtdAutorizada = qtdAutorizada
    this.data = data
    this.horaInicial = horaInicial
    this.horaFinal = horaFinal
    this.qtdRealizada = qtdRealizada
    this.viaAcesso = viaAcesso
    this.tecnica = tecnica
    this.reducaoAcrescimoPct = reducaoAcrescimoPct
    this.valorUnitario = valorUnitario
    this.valorTotal = valorTotal
  }
}
