const weatherForm = document.querySelector("form"),
  searchElem = document.querySelector("input"),
  messageOne = document.querySelector("#message"),
  messageTwo = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchElem.value;

  fetch("/weather?address=" + location)
  .then((response) => {
    response.json().then(data => {
      if(data.error){
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      }
      else{
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
