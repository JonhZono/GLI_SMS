const feeTemplate = (month, amount, additional) => {
  return (template = `
  <section id="Introduction" class="main-section">
  <header>Lesson Fee, Greeting From GLI Harumi<br/>
<br/>

  平素よりお世話になっております。<br/>
  〇月分の授業料をお知らせいたします。※〇＝${month}<br/>
  ご確認の程宜しくお願い致します。<br/>
  Additional Fee: <b>${additional}</b><br/>
  Here is total amount fee <b>${amount}</b> <br/>
<br/>
  GLI晴海校 <br/>
  </header>
  </section>
  `);
};

module.exports = feeTemplate;
