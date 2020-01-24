const feedbackTemplate = (
  termCode,
  lessonContent,
  lessonID,
  gliNews,
  email,
  ownerId,
  grade,
  teacher
) => {
  return (template = `
  <section id="Introduction" class="main-section">
  <header>Lesson ID: <b>${lessonID}</b><br/>
  Term Code: <b>${termCode}</b><br/>
  Grade: <b>${grade.name}</b><br/>
  Teacher: <b>${teacher.name}</b><br/>
  Email: <b>${email}</b>
  </header>
  
    <p style="font-size: 16px">${lessonContent}</p>
    <p><b>GLI News:</b> ${gliNews}</p>
  </section>
  <footer><i>➤ View ${ownerId.name} Daily Analysis Here: http://localhost:3000/user/dashboard </i></footer>
`);
};

module.exports = feedbackTemplate;
