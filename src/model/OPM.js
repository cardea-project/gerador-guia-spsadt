export class OPM {
  constructor (
    codigoTabela,
    codigo,
    descricao,
    quantidade,
    fabricante,
    codigoDeBarras,
    valorUnitario,
    valorTotal,
    valorTotalOPM
  ) {
    this.codigoTabela = codigoTabela
    this.codigo = codigo
    this.descricao = descricao
    this.quantidade = quantidade
    this.fabricante = fabricante
    this.codigoDeBarras = codigoDeBarras
    this.valorUnitario = valorUnitario
    this.valorTotal = valorTotal
    this.valorTotalOPM = valorTotalOPM
  }
}
