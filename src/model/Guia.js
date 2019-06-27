export class Guia {
  constructor (
    autorizacao,
    beneficiario,
    contratadoSolicitante,
    solicitacao,
    contratadoExecutante,
    atendimento,
    consultaReferencia,
    procedimentosRealizados,
    opmSolicitados,
    opmRealizados
  ) {
    this.autorizacao = autorizacao
    this.beneficiario = beneficiario
    this.contratadoSolicitante = contratadoSolicitante
    this.solicitacao = solicitacao
    this.contratadoExecutante = contratadoExecutante
    this.atendimento = atendimento
    this.consultaReferencia = consultaReferencia
    this.procedimentosRealizados = procedimentosRealizados
    this.opmSolicitados = opmSolicitados
    this.opmRealizados = opmRealizados
  }
}
