// external dependencies
import { Rating } from "@mui/material";

// wordpress dependencies
import { createRoot, useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

function RecipeRating(props) {
  // define states for average rating and permission
  const [avgRating, setAvgRating] = useState(props.avgRating);
  const [permission, setPermission] = useState(props.loggedIn);

  // prevent rating more than once
  useEffect(() => {
    if (props.ratingCount) {
      setPermission(false);
    }
  }, []);

  // output rating component
  return (
    <Rating
      value={avgRating}
      precision={0.5}
      onChange={async (event, rating) => {
        if (!permission) {
          return alert(
            "You have already rated this recipe or you may need to log in."
          );
        }
        setPermission(false);

        console.log(rating);

        const response = await apiFetch({
          path: "fblgstp/v1/rate",
          method: "POST",
          data: {
            postID: props.postID,
            rating,
          },
        });

        if (response.status == 2) {
          setAvgRating(response.rating);
        }
      }}
    />
  );
}

document.addEventListener("DOMContentLoaded", () => {
  // get data for rating component
  const block = document.querySelector("#recipe-rating");
  const postID = parseInt(block.dataset.postId);
  const avgRating = parseFloat(block.dataset.avgRating);
  const loggedIn = !!block.dataset.loggedIn;
  const ratingCount = !!parseInt(block.dataset.ratingCount);

  // render rating component
  const root = createRoot(block);
  root.render(
    <RecipeRating
      postID={postID}
      avgRating={avgRating}
      loggedIn={loggedIn}
      ratingCount={ratingCount}
    />
  );
});
