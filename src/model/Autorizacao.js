export class Autorizacao {
  constructor (
    registroANS,
    numeroGuia,
    numeroGuiaPrincipal,
    dataAutorizacao,
    senha,
    validadeSenha,
    dataEmissao
  ) {
    this.registroANS = registroANS
    this.numeroGuia = numeroGuia
    this.numeroGuiaPrincipal = numeroGuiaPrincipal
    this.dataAutorizacao = dataAutorizacao
    this.senha = senha
    this.validadeSenha = validadeSenha
    this.dataEmissao = dataEmissao
  }
}
