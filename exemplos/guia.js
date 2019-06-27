var fs = require('fs')
var path = require('path')
var pathDoArquivoPdf = path.join(__dirname, 'guia.pdf')

var lib = require('../lib/index')
var Gerador = lib.Gerador
var Autorizacao = lib.Autorizacao
var Beneficiario = lib.Beneficiario
var Convenio = lib.Convenio
var ContratadoSolicitante = lib.ContratadoSolicitante
var ProfissionalSolicitante = lib.ProfissionalSolicitante
var Solicitacao = lib.Solicitacao
var Procedimento = lib.Procedimento
var ContratadoExecutante = lib.ContratadoExecutante
var Endereco = lib.Endereco
var Atendimento = lib.Atendimento
var ConsultaReferencia = lib.ConsultaReferencia
var ProcedimentosRealizados = lib.ProcedimentosRealizados
var OPM = lib.OPM
var OPMSolicitados = lib.OPMSolicitados
var OPMRealizados = lib.OPMRealizados
var Guia = lib.Guia

var autorizacao = new Autorizacao(
  '123456', // registroANS
  '12345678901234567890', // numeroGuia
  '12345678901234567890', // numeroGuiaPrincipal
  '24/05/2018', // dataAutorizacao
  '12345678901234567890', // senha
  '24/05/2018', // validadeSenha
  '24/05/2018' // dataEmissao
)

// var logotipo = path.join(__dirname, './595426dc0c7ade1d3c4def0a.png')
var logotipo

var beneficiario = new Beneficiario(
  new Convenio(
    '12345678901234567890', // numeroCarteira,
    '24/05/2018', // validadeCarteira,
    'AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAA', // plano,
    logotipo, // logotipo
    'AMIL' // nome
  ), // convenio
  'AAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA', // nome,
  '12345678912345' // numeroCartaoNacionalSaude
)

var contratadoSolicitante = new ContratadoSolicitante(
  '12345678901234', // documentoSolicitante,
  'AAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA', // nome,
  '1234567', // cnes,
  new ProfissionalSolicitante(
    'AAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA', // nome,
    'AAABBBCC', // conselho,
    '123456789012345', // numeroConselho,
    'UF', // ufConselho,
    '12345' // cbo
  ) // profissionalSolicitante
)

var procedimento = new Procedimento(
  '99 - TABELA COM O NOME GRANDE', // codigoTabela,
  '1234567890', // codigo,
  'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING VOLUTPAT. 111111', // nome,
  '99', // qtdSolicitada,
  '99', // qtdAutorizada,
  '24/05/2018', // data,
  '09:39', // horaInicial,
  '10:39', // horaFinal,
  '99', // qtdRealizada,
  'U', // viaAcesso,
  'C', // tecnica,
  '999,99', // reducaoAcrescimoPct,
  '99999,99', // valorUnitario,
  '99999,99' // valorTotal
)

var solicitacao = new Solicitacao(
  '24/05/2018 09:30', // dataHora,
  'E', // carater,
  '12345', // cid10,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend nisl lectus, non malesuada tellus ultricies eget. Aliquam malesuada magna sed enim euismod, at facilisis mauris elementum. Etiam auctor felis ut mauris blandit, sed sollicitudin nulla tempus. Morbi a condimentum dui, eu consectetur arcu. Duis ullamcorper metus vel congue faucibus. Proin tempus lorem ultricies ipsum pretium tincidunt eu ut elit. In eget pretium metus, rhoncus venenatis elit. Vivamus lorem nunc, pharetra amet.', // indicacao,
  [ procedimento, procedimento ] // procedimentos
)

var contratadoExecutante = new ContratadoExecutante(
  '12345678901234', // documentoExecutante,
  'AAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA', // nome,
  new Endereco(
    'ABC', // tipoLogradouro,
    'Lorem ipsum dolor sit amet orci aliquam. ', // logradouro,
    '12345', // numero,
    'Lorem ipsum dolor sit amet.', // complemento,
    'Lorem ipsum dolor sit amet orci aliquam.', // municipio,
    'AB', // uf,
    '1234567', // codigoIbgeMunicipio,
    '12345678' // cep
  ), // endereco
  '1234567', // cnes,
  '12345678901234', // documentoComplementar,
  'AAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA AAAAAAAAAA', // nomeComplementar,
  'ABCDEFG', // conselho,
  '123456789012345', // conselhoNumero,
  'AB', // conselhoUF,
  '12345', // cbo,
  '12' // grauParticipacao
)

var atendimento = new Atendimento(
  '12', // tipoAtendimento,
  '1', // indicacaoAcidente,
  '1' // tipoSaida
)

var consultaReferencia = new ConsultaReferencia(
  'A', // tipoDoenca,
  '99', // anosDoenca,
  '99', // mesesDoenca,
  '99' // diasDoenca
)

var procedimentosRealizados = new ProcedimentosRealizados(
  [ procedimento, procedimento ], // procedimentos,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus est lectus, porttitor quis turpis nec, luctus posuere orci. Maecenas interdum orci est, at lacinia orci faucibus faucibus. Suspendisse elit tortor, finibus vel lectus metus.', // observacao,
  '9999999,99', // totalProcedimentos,
  '9999999,99', // totalTaxasAlugueis,
  '9999999,99', // totalMateriais,
  '9999999,99', // totalMedicamentos,
  '9999999,99', // totalDiarias,
  '9999999,99', // totalGases,
  '19999999,99' // totalGuia
)

var opm = new OPM(
  '99', // codigoTabela,
  '1234567890', // codigo,
  'Lorem ipsum dolor sit amet, consectetur adipiscing volutpat.', // descricao,
  '99', // quantidade,
  'Lorem ipsum dolor sit amet orci aliquam.', // fabricante
  '01234567890123456789', // codigoDeBarras,
  '999999,99', // valorUnitario,
  '999999,99', // valorTotal,
  '1999999,99' // valorTotalOPM
)

var opmSolicitados = new OPMSolicitados(
  [ opm, opm, opm, opm, opm ]
)
var opmRealizados = new OPMRealizados(
  [ opm, opm, opm, opm, opm ]
)

var guia = new Guia(
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
)

let pdf = new Gerador().gerarPdf(guia)
pdf.pipe(fs.createWriteStream(pathDoArquivoPdf))
