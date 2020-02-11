const welcomeTemplate = (name, email, password) => {
  return (template = `
    <h2>WELCOME 😃! Your new account for GLI School Management System.</h2>
    <p style="font-size: 14px">Username: ${name}</p>
    <p style="font-size: 14px">Email: ${email}</p>
    <p style="font-size: 14px">Password: ${password}</p>
    <p style="font-size: 14px"><i>➤ Please Login Here: http://localhost:3000/user/dashboard </i></p>
  <footer style="font-size: 14px">GLI晴海校。</footer>
    `);
};

module.exports = welcomeTemplate;
