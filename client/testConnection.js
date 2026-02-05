import axios from "axios";
axios
  .get("http://localhost:5000/api/test")
  .then((res) => {
    console.log(res.data.message);
  })
  .catch((err) => {
    console.error(err);
  });
