const examTemplate = (
  reading,
  speaking,
  listening,
  writing,
  gmail,
  ownerId,
  examName
) => {
  return (template = `
    <section id="Introduction" class="main-section">
    <header>Student: <b>${ownerId.name}</b><br/>
    Email: <b>${gmail}</b><br/>
    Reading: <b>${reading}</b> points<br/>
    Listening: <b>${listening}</b> points<br/>
    Speaking: <b>${speaking}</b> point <br/>
    Writing: <b>${writing}</b> points <br/>
    Exam Type: <b>${examName}</b>
    </header>  
    <p></p>
    </section>
    <footer><i>➤ View ${ownerId.name} Daily Analysis Here: http://localhost:3000/user/dashboard </i></footer>
  `);
};

module.exports = examTemplate;
