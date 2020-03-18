const juniorEikenExamTemplate = (
  vocabulary,
  conversation,
  sentence,
  alphabet,
  gmail,
  level,
  examDate,
  name
) => {
  return (template = `
        <section id="Introduction" class="main-section">
        <header><p>こんにちは。</p>
        <p>これは${examDate}の${level}級試験のスコアです。</p>
        Email: <b>${gmail}</b><br/>
        Student: <b>${name}</b><br/>
        Vocabulary: <b>${vocabulary}</b> points<br/>
        Conversation: <b>${conversation}</b> points<br/>
        Sentence: <b>${sentence}</b> points <br/>
        Alphabet: <b>${alphabet}</b> points <br/>
        <p>ご確認の程宜しくお願い致します。</p>
        </header>  
        <p><i>➤ Please Login Here: http://localhost:3000/user/dashboard </i></p>
      </section>
      <footer>GLI晴海校。</footer>
      `);
};

module.exports = juniorEikenExamTemplate;
