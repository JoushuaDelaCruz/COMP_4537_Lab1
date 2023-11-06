const SERVER = "https://isa-server-lab4-f3b53ce2616e.herokuapp.com";
const DEFINITION_PATH = "/api/v1/definition";

const searchWord = () => {
  const word = document.getElementById("word").value;
  const main = document.getElementsByTagName("main")[0];
  fetch(`${SERVER}${DEFINITION_PATH}/${word}`).then((response) => {
    console.log(response);
    response.json().then((data) => {
      main.innerHTML = data.definition + "\n";
      delete data.definition;
      main.innerHTML = main.innerHTML + JSON.stringify(data);
    });
  });
};
