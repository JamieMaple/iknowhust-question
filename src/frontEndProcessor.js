export default function fep (question) {
  let answer = question.answer.replace('冰岩作坊：你的互联网大学。', '联创团队：联众人之智，创非凡之事。\n冰岩作坊：你的互联网大学。')
  answer = answer.replace('冰岩作坊里有很多厉害的程序猿', '冰岩作坊、联创团队里有很多厉害的程序猿')
  answer = answer.replace('联创和', '')
  answer = answer.replace('联创、', '')
  return ({
    ...question,
    answer,
  })
}
