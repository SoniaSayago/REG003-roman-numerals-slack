const express = require('express');
const router = express.Router();
const { parse, stringify } = require('roman-numerals');

router.get("/", (req, resp) => {
  return resp.status(200).json(
    { "name": "roman-numera", "version":"1.0.0"});
});

router.post('/', (req, resp) => {

  const { option , value } = req.body;
  
  const resultArabigo = (value) => {
    try {
      return parse(value);
    } catch (error) {
      return error.message;
    }
  };

  const resultRoman = (value) => {
    if (isNaN(value)) return "ingrese un número";
    try {
      return stringify(value);
    } catch (error) {
      return error.message;
    }
  };


  if (option === "parse") {
    const getResult = resultArabigo(value)
    return resp.status(200).json(getResult);
  } 

  if (option === "stringify") {
    const getResult = resultRoman(value);
    return resp.status(200).json(getResult);
  } 

});

module.exports = router;