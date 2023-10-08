const RESOURCE = "api/definitions/";
const URL = `https://isa-server-lab4-f3b53ce2616e.herokuapp.com/${RESOURCE}`;

const _errHandler = (response) => {
  const displayResponse = document.getElementsByTagName("main")[0];
  displayResponse.innerHTML = `<h1> ${response.error} </h1>`;
};

const _postReq = (params, errHandler, successHandler) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", URL + params, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 201) {
      const response = JSON.parse(xhr.responseText);
      successHandler(response);
    }
    if (xhr.readyState === 4 && xhr.status !== 201) {
      const response = JSON.parse(xhr.responseText);
      errHandler(response);
    }
  };
  xhr.send();
};

const _defineWordSuccessHandler = (response) => {
  console.log(response);
  const displayResponse = document.getElementsByTagName("main")[0];
  displayResponse.innerHTML = `
    <h1> Word: ${response.word} </h1> | 
    <h1> Definition: ${response.definition} </h1> | 
    <h1> Total Entries: ${response.totalEntries} </h1>`;
};

const defineWord = () => {
  const word = document.getElementById("addWord").value;
  const description = document.getElementById("addDefinition").value;
  const params = `?word=${word}&definition=${description}`;
  _postReq(params, _errHandler, _defineWordSuccessHandler);
};
