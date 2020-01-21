const feeTemplate = (month, amount, additional) => {
  return (template = `
  <section id="Introduction" class="main-section">
  <header>Month: <b>${month}</b><br/>
  Amount: <b>${amount}</b><br/>
  Additional Fee: <b>${additional}</b>
  </header>
    <p>From GLI Harumi, Have a nice day...</p>
  </section>
  <footer><i>➤ Check Here For More: http://localhost:3000/user/dashboard </i></footer>
  `);
};

module.exports = feeTemplate;
