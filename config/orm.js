const connection = require("../config/connection.js");


function printQuestionMarks(num){
	const arr = [];

	for (let i = 0; i < num; i++){
		arr.push("?");
	}
	return arr.toString();

}

function objToSql(ob){
	let arr = [];

	for(let key in ob){
		let value = ob[key];
		if(Object.hasOwnProperty.call(ob, key)){
			if(typeof value === "string" && value.indexOf("") >= 0){
				value = " ' " + value + " ' ";
			}
			arr.push(key + "=" + value);
		}
	}
	return arr.toString();
}

//selectAll()
//insertOne()
//updateOne()


const orm = {
    selectAll: function (tableInput, cb) {
      const queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function (err, result) {
          if (err) {n
              throw err;
          }
          cb(result);
      });
  },
  // vals is an array of values that we want to save to cols
  // cols are the columns we want to insert the values into
  insert: function (table, cols, vals, cb) {
      let queryString = "INSERT INTO " + table;

      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";

      console.log(queryString);

      connection.query(queryString, vals, function (err, result) {
          if (err) {
              throw err;
          }
          cb(result);
      });
  },


  update: function (table, objColVals, condition, cb) {
      let queryString = `UPDATE ${table} SET devoured=${objColVals.devoured} WHERE (id=${condition});`
      console.log(queryString)
      connection.query(queryString, function (err, result) {
          if (err) {
              throw err;
          }
          cb(result);
      });
  }
};

module.exports = orm;





