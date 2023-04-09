const BACKEND_PORT = "5000";
const BACKEND_BASE_URL = `http://52.90.237.228:${BACKEND_PORT}`;

async function buildResponseWithStatus(rawResponse) {
  let responseDataWithStatus = {};
  if (rawResponse.ok) {
    try {
      responseDataWithStatus = await rawResponse.json();
    } catch (error) {
      responseDataWithStatus.ok = false;
    }
    responseDataWithStatus.ok = true;
  } else {
    responseDataWithStatus.ok = false;
  }
  responseDataWithStatus.status = rawResponse.status;
  return responseDataWithStatus;
}

export async function createOne(data) {
  try {
    let url = `${BACKEND_BASE_URL}/${"calculations"}`;
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return buildResponseWithStatus(rawResponse);
  } catch (error) {
    console.error(error);
    return buildResponseWithStatus({ ok: false, status: 500 });
  }
}

export async function createImage(data, size, storageUsed) {
  try {
    const username = localStorage.getItem("username");
    let url = `${BACKEND_BASE_URL}/${username}/${"image-upload"}`;
    const formData = new FormData();
    formData.append("img", data);
    formData.append("size", size);
    formData.append("storageUsed", storageUsed + parseFloat(size));
    const rawResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return buildResponseWithStatus(rawResponse);
  } catch (error) {
    console.error(error);
    return buildResponseWithStatus({ ok: false, status: 500 });
  }
}

export async function getLogsData() {
  try {
    const username = localStorage.getItem("username");
    let url = `${BACKEND_BASE_URL}/${username}/logs}`;
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return buildResponseWithStatus(rawResponse);
  } catch (error) {
    console.error(error);
    return buildResponseWithStatus({ ok: false, status: 500 });
  }
}

export async function deleteImage(id) {
  try {
    const username = localStorage.getItem("username");
    let url = `${BACKEND_BASE_URL}/${username}/${"images"}/${id}`;
    const rawResponse = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return buildResponseWithStatus(rawResponse);
  } catch (error) {
    console.error(error);
    return buildResponseWithStatus({ ok: false, status: 500 });
  }
}

export async function Signup(data) {
  try {
    let url = `${BACKEND_BASE_URL}/${"register"}`;
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return buildResponseWithStatus(rawResponse);
  } catch (error) {
    console.error(error);
    return buildResponseWithStatus({ ok: false, status: 500 });
  }
}

export async function SignIn(data) {
  try {
    let url = `${BACKEND_BASE_URL}/${"login"}`;
    console.log("url:", url);
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return buildResponseWithStatus(rawResponse);
  } catch (error) {
    console.log("error: ", error);
    return buildResponseWithStatus({ ok: false, status: 500 });
  }
}

export async function getAllImages() {
  try {
    const username = localStorage.getItem("username");
    let url = `${BACKEND_BASE_URL}/${username}/user-info`;
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return buildResponseWithStatus(rawResponse);
  } catch (error) {
    console.error(error);
    return buildResponseWithStatus({ ok: false, status: 500 });
  }
}
