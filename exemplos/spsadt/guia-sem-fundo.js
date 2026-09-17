var fs = require('fs')
var path = require('path')
var pathDoArquivoPdf = path.join(__dirname, 'guia-sem-fundo.pdf')

var lib = require('../../lib')
var guia = require('./dados')

var GeradorGuiaSPSADT = lib.GeradorGuiaSPSADT

let pdf = new GeradorGuiaSPSADT().gerarPdf(guia, { semFundo: true })
pdf.pipe(fs.createWriteStream(pathDoArquivoPdf))
