const stars = document.querySelector("fieldset");
let ratings;
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="content-body"]').value;
  const city_location = document.querySelector(
    'input[name="post-city-location"]'
  ).value;
  const trip_budget = document.querySelector('input[name="trip_budget"]').value;
  const photos = document.querySelector(".userimage")?.files;

  console.log('photos', photos);
  const response = await fetch(`/api/blogs`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      city_location,
      trip_budget,
      ratings,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();
  const post_id = res.id;
  console.log("JS post_id", post_id);

  if (!photos.length) {
    document.location.reload();
  } else if (response.ok && photos.length) {
    console.log("response ok and photos present");
    for (let i = 0; i < photos.length; i++) {
      let formData = new FormData();
      formData.append("photo", photos[i]);
      formData.append("id", post_id);
      fetch("/api/pic", {
        method: "POST",
        body: formData,
      }).then(() => {
        console.log("photo uploaded");
        document.location.reload();
      });
    }
  } else {
    alert("somthing went wrong");
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
stars.addEventListener('click', (event) => {
  if (!event.target.matches('input[name="ratings"]')) { return }
  let selected = document.querySelector('input[name="ratings"]:checked')
  ratings = selected.value;
})

