const postTemplate = (title, descriptions, status, event, type) => {
  return (template = `
    <section id="Introduction" class="main-section">
    <header><h2>${title}</h2>
    Post Type: <b>${type}</b><br/>
    Event Status: <b>${status}</b><br/>
    Send From: <b>GLI Harumi</b><br/>
    </header>  
      <p style="font-size: 15px; white-space: pre-line">${descriptions}</p>
      <p style="font-size: 15px; white-space: pre-line">${event}</p>
    </section>
    <p><i>➤ Please Login Here: http://localhost:3000/user/dashboard </i></p>
    </section>
    <footer>GLI晴海校。</footer>
  `);
};

module.exports = postTemplate;
