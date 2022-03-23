const FOOD_DATA = [
  {
    id: 1,
    name: "Shahi Darbaar",
    tags: ["indian", "non-veg"],
    eta: 30,
    ratings: 4.1,
    imageUrl:
      "https://img.restaurantguru.com/rd44-design-Shahi-Darbar-2021-09-3.jpg",
  },
  {
    id: 2,
    name: "Sher-ae-punjab",
    tags: ["non-veg", "punjabi", "north-indian"],
    eta: 28,
    ratings: 4.3,
    imageUrl:
      "https://content3.jdmagicbox.com/comp/dhanbad/h5/9999px326.x326.120523110437.q1h5/catalogue/shan-e-punjab-restaurant-topchanchi-dhanbad-punjabi-restaurants-4n7wv.jpg",
  },
  {
    id: 3,
    name: "Aranyas",
    tags: ["non-veg", "north-indian", "chinese"],
    eta: 40,
    ratings: 3.6,
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/11/47/18/9d/getlstd-property-photo.jpg",
  },
  {
    id: 4,
    name: "Waikiki",
    tags: ["pure-veg", "chinese", "south-indian"],
    eta: 40,
    ratings: 3.8,
    imageUrl: "https://10619-2.s.cdn12.com/rests/original/105_506955524.jpg",
  },
  {
    id: 5,
    name: "Vivana",
    tags: ["non-veg", "chinese", "south-indian", "mexican", "thai"],
    eta: 20,
    ratings: 3.9,
    imageUrl: "https://i.ytimg.com/vi/N_ZEePZY6gs/maxresdefault.jpg",
  },
  {
    id: 6,
    name: "Wedlock Greens",
    tags: ["non-veg", "north-indian", "chinese", "american", "thai"],
    eta: 34,
    ratings: 4.9,
    imageUrl:
      "https://res.cloudinary.com/simplotel/image/upload/w_5000,h_3333/x_0,y_260,w_5000,h_2813,r_0,c_crop,q_80,fl_progressive/w_400,f_auto,c_fit/wedlock-greens-resort-dhanbad-(a-part-of-megacorp-property-developers-private-limited)/LRM_EXPORT_20200113_134833_zojf0g",
  },
  {
    id: 7,
    name: "17 Degrees Restaurant",
    tags: ["non-veg", "north-indian", "chinese", "italian"],
    eta: 39,
    ratings: 4.5,
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/21/56/af/75/updated-lobby-images.jpg",
  },
  {
    id: 8,
    name: "Lemon Chilli",
    tags: ["non-veg", "north-indian", "chinese", "italian", "bar", "african"],
    eta: 41,
    ratings: 4.5,
    imageUrl:
      "https://lh3.googleusercontent.com/Tma8FSSSAlPUlb4dC-60Pem8alD3YX2AbdGFTz8AKKBQ_hwC07ZOqYUObfNgvWBeh5IHGkUQ5h38_dsgDOZ4nOlh7CeR=w512",
  },
  {
    id: 9,
    name: "Kaveri Restaurant",
    tags: ["veg", "north-indian", "chinese", "south-indian"],
    eta: 21,
    ratings: 4.5,
    imageUrl:
      "https://lh3.googleusercontent.com/oDLl0Q6oB1N0xFVuOgIH7YQmCXGc61w3wRELqaq-XQyxBwu7lIPe6tJaBMaPWbRWpPZecwiABfxFS9VoQMl4WxCrtQ=w746-h498-l95-e31",
  },
  {
    id: 10,
    name: "The baithak",
    tags: ["veg", "north-indian", "chinese", "south-indian"],
    eta: 31,
    ratings: 4.5,
    imageUrl:
      "https://www.crazymasalafood.com/wp-content/images/the-baithak-dhanbad-u6tvq6pqx3.jpg",
  },
];

const getCard = (item) => {
  const cardHtml = `<div class="card">
  <div class="bookmark" id=${item.id} onclick="addToFavorite(this.id)">
    <img src=${
      item.bookmarked ? "images/bookmarked.png" : "images/bookmark.png"
    } 
    alt="" />
  </div>
    <img
      src=${item.imageUrl}
      alt=""
    />
    <div class="name">
      <h2>${item.name}</h2>
    </div>
    <div class="tags">
      ${item.tags?.map((item) => `<span>${item}</span>`)}
    </div>
    <div class="ratings">
      <h5>${item.ratings}</h5>
      <h5>${item.eta} min</h5>
    </div>
  </div>`;

  return cardHtml;
};

const getView = (list) => {
  const view = document.querySelector(".restaurants");
  let html = "";
  list?.map((item) => {
    html += getCard(item);
  });
  view.innerHTML = html;
};

getView(FOOD_DATA);

// function sortBy() {
//   const select = document.getElementById("tags").value;
//   console.log(select);
//   const newData = FOOD_DATA.filter((item) =>
//     item.tags.map((item) => console.log(item === select))
//   );
//   console.log(newData);
// }

function sortByRatings() {
  const ratings = document.getElementById("ratings").value;
  const newData = FOOD_DATA.filter((item) =>
    ratings == "" ? item : Math.floor(item.ratings) == ratings
  );

  if (newData.length > 0) {
    getView(newData);
  } else {
    const view = document.querySelector(".restaurants");
    let h1 = document.createElement("h1");
    h1.innerHTML = "Sorry there are no results!";
    view.innerHTML = "";
    view.appendChild(h1);
    console.log("Sorry no results!");
  }
  console.log(newData);
}

function search(e) {
  const newData = FOOD_DATA.filter((item) =>
    item.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  console.log(newData);
  getView(newData);
}

// Checking whether the localstorage has something in it or is it empty
let localStorageFoods = localStorage.getItem("food");
if (localStorageFoods === null) {
  newFood = [];
} else {
  newFood = JSON.parse(localStorageFoods);
}

// Adding restaurants to favorite
const addToFavorite = (e) => {
  console.log(e);
  FOOD_DATA[e - 1].bookmarked = true;
  newFood.push(FOOD_DATA[e - 1]);
  localStorage.setItem("food", JSON.stringify(newFood));
  getView(FOOD_DATA);
};

const favoritesPage = () => {
  console.log(localStorageFoods);
  getView(newFood);
};

console.log(FOOD_DATA);

const searchbar = document.getElementById("search");
searchbar.addEventListener("input", search);

const favorites = document.getElementById("favorites");
favorites.addEventListener("click", favoritesPage);
