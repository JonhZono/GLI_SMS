const eikenExamTemplate = (
  reading,
  listening,
  writing,
  attitude,
  qna,
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
      Reading: <b>${reading}</b> points<br/>
      Listening: <b>${listening}</b> points<br/>
      Writing: <b>${writing}</b> points <br/>
      Attitude: <b>${attitude}</b> points<br/>
      Question & Answers: <b>${qna}</b> points <br/>
      <p>ご確認の程宜しくお願い致します。</p>
      </header>  
      <p><i>➤ Please Login Here: http://localhost:3000/user/dashboard </i></p>
    </section>
    <footer>GLI晴海校。</footer>
    `);
};

module.exports = eikenExamTemplate;
