const postTemplate = (title, descriptions, image, status) => {
  return (template = `
    <section id="Introduction" class="main-section">
    <header><h2>${title}</h2><br/>
    Event Status: <b>${status}</b><br/>
    </header>
    <img src='${image}' alt='GLI Harumi' />
      <p style="font-size: 15px">${descriptions}</p>
    </section>
    <footer><i>➤ Check here for more detail: http://localhost:3000/user/dashboard </i></footer>
  `);
};

module.exports = postTemplate;
