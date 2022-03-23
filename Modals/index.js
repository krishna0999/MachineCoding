const openModal = (e) => {
  console.log(e);
  const modal = document.getElementById("modal");
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
  console.log(modal);
};

const modal1 = document.querySelector("#modal-1");
modal1.addEventListener("click", openModal);

function foo() {
  function bar() {
    return 3;
  }

  return bar();

  function bar() {
    return 8;
  }
}

console.log(foo());
