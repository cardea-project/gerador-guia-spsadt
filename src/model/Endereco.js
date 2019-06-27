export class Endereco {
  constructor (
    tipoLogradouro,
    logradouro,
    numero,
    complemento,
    municipio,
    uf,
    codigoIbgeMunicipio,
    cep
  ) {
    this.tipoLogradouro = tipoLogradouro
    this.logradouro = logradouro
    this.numero = numero
    this.complemento = complemento
    this.municipio = municipio
    this.uf = uf
    this.codigoIbgeMunicipio = codigoIbgeMunicipio
    this.cep = cep
  }
}
