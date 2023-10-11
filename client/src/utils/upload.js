import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "jay_fiverr");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dzxz2kumq/image/upload",
      data
    );
    return res.data.url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;