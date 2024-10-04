// Load Categories ...
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((err) => console.log(err));
};

// Load Videos ...
const loadVideos = (search = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
    .then((res) => res.json())
    .then((data) => showVideos(data.videos))
    .catch((err) => console.log(err));
};


const loadDetails = async (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.video);
}
 

function convertTime(some) {
  const a = parseInt(some / 3600);
  const b = parseInt(some % 3600);
  const c = parseInt(b / 60);
  return `${a} hour ${c} minute ago`;
}

// Remove active class Function..
const removeActiveClass = () => {
    const activeRemove = document.getElementsByClassName("category-active");
    for (const singleBtn of activeRemove) {
        singleBtn.classList.remove('active');
    }
}

const displayDetails = (info) => {
    const detailContainer = document.getElementById('detail_container');
    document.getElementById("myModal").click()
    detailContainer.innerHTML = `
    <div class="flex flex-col  justify-center gap-3">
    <img class="rounded-lg" src=${info.thumbnail}/>
    <div class="flex items-center justify-between">
    <h2 class="font-bold"><span class="text-lg font-semibold">Title:</span> ${info.title}</h2>
    <h4 class="text-lg text-stone-800 font-bold">Views: <span class="text-stone-500 font-semibold text-md">${info.others.views}</span></h4>
    </div>
    <h3 class="text-lg font-semibold text-stone-500"><span class="font-bold text-stone-800 text-xl">Description:</span> ${info.description}</h3>
    </div>
    `;

}

// Using Id to click videos show & active btn..
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        const activeBtn = document.getElementById(`btn-${id}`);
        // remove active
        removeActiveClass();
        activeBtn.classList.add("active");
        showVideos(data.category);
        
    })
    .catch((err) => console.log(err));
};

// Show Categories on display
const showCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categories.forEach((item) => {
    // Create category button
    // const button = document.createElement('button');
    // button.classList = "py-3 px-4 rounded-lg bg-gray-300 hover:bg-gray-400";
    // button.textContent = item.category;
    const btn = document.createElement("div");
    btn.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos('${item.category_id}')" 
        class="py-3 px-4 rounded-lg btn text-md font-semibold category-active">
        ${item.category}
        </button>
        `;
    categoryContainer.append(btn);
    });
};

// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }

// Show Videos on display
const showVideos = (videosData) => {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = "";

  if (videosData.length == 0) {
    videoContainer.classList.remove("grid");

    videoContainer.innerHTML = `
        <div class="flex flex-col gap-5 items-center justify-center py-16">
        <img src="../Icon.png" alt="No-content"/>
        <h2 class="text-black text-4xl font-bold text-center">Opps!! Sorry, There is no <br/> content here</h2>
        </div>
        `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videosData.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact shadow-lg";
    card.innerHTML = `
            <figure class="h-52 relative">
            <img class="w-full h-full object-cover rounded-xl"
            src=${video.thumbnail}
            alt="Shoes" />
            ${
              video.others.posted_date?.length === 0
                ? ""
                : `<span class="absolute right-2 bottom-2 py-1 px-2 rounded-lg bg-black 
                text-white">${convertTime(video.others.posted_date)}</span>`
            }
        </figure>
        <div class="flex gap-3 px-1 py-5">
            <div class="w-10 h-10 rounded-full overflow-hidden">
            <img class="w-full h-full object-cover" src=${
                video.authors[0].profile_picture
            }/>
            </div>
            <div class="w-full">
            <h3 class="font-bold text-lg">${video.title}</h3>
            <div class="">
            <div class="flex items-center gap-3 my-2">
            <p class="font-semibold">${video.authors[0].profile_name}</p>
            ${
                video.authors[0].verified === true
                ? '<img class="w-6" src="https://cdn-icons-png.flaticon.com/128/9195/9195920.png"/>'
                : ""
            }
            </div>
            <div class="flex items-center justify-between">
            <span>${video.others.views}</span>
            <button onclick="loadDetails('${video.video_id}')" class="py-2 px-4 text-white mr-4 
            hover:bg-red-600 rounded-lg bg-red-500 cursor-pointer">Details</button>
            </div>
            </div>
            </div>
        </div>
            `;
    videoContainer.append(card);
  });
};


document.getElementById("search-input").addEventListener("keyup", (e) => loadVideos(e.target.value));

loadCategories();
loadVideos();
