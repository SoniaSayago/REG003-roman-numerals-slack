const express = require('express');

const router = express.Router();
const { parse, stringify } = require('roman-numerals-sonibri');


router.get("/", (req, resp) => {
  return resp.status(200).json(
    { "name": "roman-numerals", "version":"1.0.0"});
});

router.post('/', (req, resp) => {
  const { text } = req.body;
  const [option, value] = text.split(' ');

  const resultArabigo = (x) => {
    try {
      return parse(x);
    } catch (error) {
      return error.message;
    }
  };

  const resultRoman = (x) => {
    if (Number.isNaN(x)) return 'Not a number';
    try {
      return stringify(+x);
    } catch (error) {
      return error.message;
    }
  };

  if (option === 'parse') {
    const getResult = resultArabigo(value);
    const response = {
    "response_type": "in_channel",
    "text": getResult
    }; 
    return resp.status(200).json(response);
  }

  if (option === 'stringify') {
    const getResult = resultRoman(value);
    const response = {
      response_type: "in_channel",
      text: getResult,
    };
    return resp.status(200).json(response);
  }

  return resp.status(400).json({
    response_type: 'ephemeral',
    text: "That didn't work, enter a correct option. Please try again.",
  });
});

module.exports = router;
