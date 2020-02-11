const feedbackTemplate = (
  termCode,
  lessonContent,
  lessonID,
  gliNews,
  name,
  grade,
  teacher
) => {
  return (template = `
  <section id="Introduction" class="main-section">
  <header><p>こんにちは。</p>
  <p>${lessonID} 年授業記録になります。</p>
  Lesson ID: <b>${lessonID}</b><br/>
  Term Code: <b>${termCode}</b><br/>
  Student: <b>${name}</b><br/>
  Grade: <b>${grade.name}</b><br/>
  Teacher: <b>${teacher.name}</b>
  </header>
  
    <p style="font-size: 14px; white-space: pre-line">${lessonContent}</p>
    <p style="font-size: 14px; white-space: pre-line"><b>GLI News:</b> ${gliNews}</p>
    <p>ご確認の程宜しくお願い致します。</p>
    <p><i>➤ Please Login Here: http://localhost:3000/user/dashboard </i></p>
  </section>
  <footer>GLI晴海校。</footer>
`);
};

module.exports = feedbackTemplate;
