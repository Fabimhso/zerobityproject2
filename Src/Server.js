require("dotenv").config();
const app = require("./App/App");

var PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(
    `=====================================\n|  Server listening on port: ${PORT}   |`
  );
});
