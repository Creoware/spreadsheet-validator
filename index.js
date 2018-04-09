var fs = require('fs')
var Validator = require('./library/validator.js')

var config = JSON.parse(fs.readFileSync('./config.json',{ encoding : 'utf8'}))

var validator = new Validator(config.masterFile)
var sourceFiles = fs.readdirSync(config.sourceFolder)

sourceFiles.forEach(function(sourceFilename){
	var sourceFilepath = config.sourceFolder + '/' + sourceFilename
	var destinationFilepath = config.destinationFolder + '/' + sourceFilename
	debugger
	validator.validateFile(sourceFilepath,destinationFilepath)
})