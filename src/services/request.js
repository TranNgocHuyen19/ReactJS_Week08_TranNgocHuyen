const API_DOMAIN = "http://localhost:3000/";

export const get = async (path) => {
  try {
    const response = await fetch(API_DOMAIN + path);
    if (!response.ok) throw new Error("Lỗi khi fetch dữ liệu");
    return await response.json();
  } catch (error) {
    console.error("GET error:", error);
    return null;
  }
};

export const put = async (path, options) => {
  try {
    console.log("PUT request to:", API_DOMAIN + path, "with data:", options);
    const response = await fetch(API_DOMAIN + path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    console.log("PUT response:", response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi PUT dữ liệu");
    }
    return await response.json();
  } catch (error) {
    console.error("PUT error details:", error);
    throw error;
  }
};
export const post = async (path, options) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    if (!response.ok) throw new Error("Lỗi khi POST dữ liệu");
    return await response.json();
  } catch (error) {
    console.error("POST error:", error);
    return null;
  }
};
