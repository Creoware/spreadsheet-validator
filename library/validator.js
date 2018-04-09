var fs = require('fs')
var csvjson = require('csvjson')

var Validator = function(masterFilepath){

	this.importMasterFile = function(filepath){
		this.masterData = csvjson.toObject(fs.readFileSync(filepath,{ encoding : 'utf8'}))
	}

	this.validateFile = function(inputFile,outputFile){
		var rows = csvjson.toObject(fs.readFileSync(inputFile,{ encoding : 'utf8'}))
		var newRows = this.getNewRows(rows)
		var csvString = csvjson.toCSV(newRows,{
			headers: 'relative'
		})
		fs.writeFileSync(outputFile,csvString)
	}

	this.getNewRows = function(rows){
		var output = []
		for (var i in rows){
			var row = rows[i]
			var matchingRow = findMatchingRow(output,row)
			var similarRow = this.findSimilarRow(row)
			if (similarRow && !matchingRow) output.push(row)
		}
		return output	
	}

	this.findMatch = function(key,value){
		return this.masterData.find(function(masterRow){
			var masterValue = masterRow[key]
			return masterValue == value
		})
	}

	this.findSimilarRow = function(row){
		for (var key in row){
			var value = row[key]
			var matchingRow = this.findMatch(key,value)
			if (matchingRow) return matchingRow
		}
	}

	var findMatchingRow = function(array,row){
		return array.find(function(r){
			for (var key in row){
				if (row[key] != r[key]) return false
			}
			return true
		})
	}

	this.importMasterFile(masterFilepath)


}


module.exports = Validator