const examTemplate = (
  reading,
  speaking,
  listening,
  writing,
  gmail,
  examName,
  examDate,
  name
) => {
  return (template = `
    <section id="Introduction" class="main-section">
    <header><p>こんにちは。</p>
    <p>これは${examDate}の${examName}級試験のスコアです。</p>
    Email: <b>${gmail}</b><br/>
    Student: <b>${name}</b><br/>
    Reading: <b>${reading}</b> points<br/>
    Listening: <b>${listening}</b> points<br/>
    Speaking: <b>${speaking}</b> point <br/>
    Writing: <b>${writing}</b> points <br/>
    <p>ご確認の程宜しくお願い致します。</p>
    </header>  
    <p><i>➤ Please Login Here: http://localhost:3000/user/dashboard </i></p>
  </section>
  <footer>GLI晴海校。</footer>
  `);
};

module.exports = examTemplate;
