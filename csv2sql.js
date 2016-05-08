var fs = require('fs'),
    csv = require('fast-csv'),
    path = require('path');

console.log('## Usage: node csv2sql.js <csv-file>');
var arguments = process.argv;

if (arguments.length == 3) {
    var csvFile = arguments[2];
    var firstLine = true;

    var content = '';
    csv.fromPath(csvFile, {headers: true}).on('data', function(data) {
        var columns = Object.getOwnPropertyNames(data);
        if (firstLine) {
            content += insertStatement(columns);
            firstLine = false;
        }

        content += valuesStatement(columns, data);
    }).on("end", function() {
        content = content.replace(/\),\n$/, ');');
        fs.writeFileSync('output.sql', content);
        console.log('## SQL generated successfully, file output.sql created');
    });
}

function insertStatement(columns) {
    var statement = 'INSERT INTO ' + path.basename(csvFile, '.csv') + '(';
    columns.forEach(function(column) {
        statement += column + ', ';
    });
    return statement.replace(/, $/, ') VALUES\n');
}

function valuesStatement(columns, data) {
    var statement = '(';
    columns.forEach(function(column) {
        var value = data[column];
        if (value.length === 0 || isNaN(value)) {
            value = "'" + value + "'";
        }

        statement += value + ', ';
    });
    return statement.replace(/, $/, '),\n');
}
