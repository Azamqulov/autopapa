import axios from "axios";

const api = axios.create({
  baseURL: window.config?.API_BASE_URL || "https://autobatya.ru/api2",
  headers: {
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTIzIiwiZXhwIjoxNzQzMzk0OTMwfQ.JKNZeuSlkHoZ4v_Ctt4xf6nzW4ZJK2C9ZW5Fw64fODo",
    "Content-Type": "application/json"
  }
});

const fetchData = async () => {
  try {
    const res = await api.post("/marka");
    console.log("✅ Muvaffaqiyatli javob:", res.data);
  } catch (error) {
    console.log("❌ Xatolik:", error);

    try {
      const { data } = await axios.post("https://autobatya.ru/api2/token", {
        username: "ali@example.com",
        password: "12345",
      });

      api.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;

      const retryRes = await api.post("/marka");
      console.log("🔄 Qayta yuborilgandan keyin javob:", retryRes.data);
    } catch (tokenError) {
      console.error("❌ Token olishda xatolik:", tokenError);
    }
  }
};

fetchData();

export default api;
