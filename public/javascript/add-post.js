async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value;
    const photo = document.getElementById("user_image").files[0];
    const city_location = document.querySelector('input[name="post-city-location"]').value;
    let formData = new FormData();
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        post_content,
        city_location
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json().then( data => data);
    const post_id = res.id
    console.log("JS post_id", post_id)

    if (response.ok) {
      // document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
    console.log(photo)
    formData.append("photo", photo);
    formData.append("id", post_id)
    console.log("form data", formData.get("photo"))
    const response2 = await fetch(`/api/pic`, {
      method: 'POST',
      body: formData,
    });
    if (response2.ok) {
      // document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }

  document
    .querySelector(".new-post-form")
    .addEventListener("submit", newFormHandler);




    // const ratingStars = [...document.getElementsByClassName("rating")];

    // function executeRating(stars) {
    //   const starClassActive = "rating";
    //   const starClassInactive = "rating";
    //   const starsLength = stars.length;
    //   let i;
    //   stars.map((star) => {
    //     star.onclick = () => {
    //       i = stars.indexOf(star);
    
    //       if (star.className===starClassInactive) {
    //         for (i; i >= 0; --i) stars[i].className = starClassActive;
    //       } else {
    //         for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
    //       }
    //     };
    //   });
    // }
    // executeRating(ratingStars);    
