const inbox = [
  {
    mail: {
      author: "krishna@gmail.com",
      date: new Date(),
      subject: "Leave application",
      body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, maiores.",
      id: "inbox_1",
    },
  },
  {
    mail: {
      author: "muraree@gmail.com",
      date: new Date(),
      subject: "Job application",
      body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, maiores.",
      id: "inbox_2",
    },
  },
  {
    mail: {
      author: "krishnamuraree@gmail.com",
      date: new Date(),
      subject: "Resign application",
      body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, maiores.",
      id: "inbox_3",
    },
  },
];

const drafts = [
  {
    mail: {
      author: "krishna@gmail.com",
      date: new Date(),
      subject: "Leave application",
      body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, maiores.",
      id: "drafts_1",
    },
  },
  {
    mail: {
      author: "muraree@gmail.com",
      date: new Date(),
      subject: "Moving out",
      body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, maiores.Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptates commodi unde in facilis dignissimos aut.",
      id: "drafts_2",
    },
  },
];

const sent = [
  {
    mail: {
      author: "krishnamurae123@gmail.com",
      date: new Date(),
      subject: "Hi! Going out.",
      body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, maiores.",
      id: "sent_1",
    },
  },
  {
    mail: {
      author: "muraree@gmail.com",
      date: new Date(),
      subject: "Moving out",
      body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, maiores.Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptates commodi unde in facilis dignissimos aut.",
      id: "sent_2",
    },
  },
];

function populateMails(genre) {
  console.log(inbox);
  resetHtml();
  (genre === "inbox" ? inbox : genre === "drafts" ? drafts : sent).map(
    (item) => {
      let div = document.createElement("div");
      div.setAttribute("class", "mails");
      div.setAttribute("id", `${item.mail?.id}`);
      let h3 = document.createElement("h3");
      let text1 = document.createTextNode(`${item.mail?.subject}`);
      h3.appendChild(text1);
      let h4 = document.createElement("h4");
      let text2 = document.createTextNode(`${item.mail?.body.slice(0, 40)}`);
      h4.appendChild(text2);
      div.appendChild(h3);
      div.appendChild(h4);
      mails.appendChild(div);
    }
  );
}

let fld = "";
const handleFoldersClick = (e) => {
  let folder = e.target.id;
  console.log(folder);
  populateMails(folder);
  fld = folder;
};

const folders = document.querySelector(".container1");
folders.addEventListener("click", handleFoldersClick);

// console.log(inbox_sub, inbox_body);

function handleMailsClick(e) {
  // console.log(e.target);
  populateSingleMail(e.target.id, fld);
}

const mails = document.querySelector(".container2");
mails.addEventListener("click", handleMailsClick);

function resetHtml() {
  mails.innerHTML = "";
}

{
  /* <div class="mails">
<h3>Lorem ipsum dolor sit amet.</h3>
<h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h4>
</div> */
}

const sub = document.querySelector(".subject");
const author = document.querySelector(".author");
const date = document.querySelector(".date");
const body = document.querySelector(".body");

function populateSingleMail(id, genre) {
  console.log(id);
  (genre === "inbox" ? inbox : genre === "drafts" ? drafts : sent)
    .filter((item) => item.mail?.id === id)
    .map((item) => {
      sub.innerHTML = `${item.mail?.subject}`;
      author.innerHTML = `${item.mail?.author}`;
      date.innerHTML = `${item.mail?.date}`;
      body.innerHTML = `${item.mail?.body}`;
    });
}
