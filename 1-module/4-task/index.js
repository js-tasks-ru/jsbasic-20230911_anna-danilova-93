const spam_1 = '1xBet'.toLowerCase();
const spam_2 = 'XXX'.toLowerCase();
const checkSpam = (str) => {
  const strLowerCase = str.toLowerCase();
  return strLowerCase.includes(spam_1) || strLowerCase.includes(spam_2)
}

