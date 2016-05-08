# csv2sql

Small nodejs application that generates SQL insert-statements based on content in a csv file.  

* The header in the csv-file is used as columns in the generated sql.  
* Table name is set to the csv-file name (without the path and extension).  
* The generated output is written to a file called output.sql.  


## Install
```
npm install
```

## Usage
```
node csv2sql.js <csv-file>
```
