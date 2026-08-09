export const AUTH_CHANGED_EVENT = "auth-changed";

const AUTH_STORAGE_KEYS = [
  "accessToken",
  "isLogin",
  "userId",
  "email",
  "nickname",
  "profileImage",
];

function removeLoginStorage() {
  AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

function createLoggedOutState() {
  return {
    accessToken: "",
    isLogin: false,
    userId: null,
    email: "",
    nickname: "",
    profileImage: "",
  };
}

function isAccessTokenExpired(accessToken) {
  if (!accessToken || accessToken === "null" || accessToken === "undefined") {
    return true;
  }

  try {
    const tokenParts = accessToken.split(".");

    if (tokenParts.length !== 3) {
      return true;
    }

    const base64Payload = tokenParts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(tokenParts[1].length / 4) * 4, "=");
    const payload = JSON.parse(atob(base64Payload));

    return typeof payload.exp !== "number" || payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

function notifyAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function readLoginStorage() {
  const accessToken = localStorage.getItem("accessToken") || "";
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (!isLogin || isAccessTokenExpired(accessToken)) {
    removeLoginStorage();
    return createLoggedOutState();
  }

  const storedUserId = localStorage.getItem("userId");

  return {
    accessToken,
    isLogin,
    userId: storedUserId ? Number(storedUserId) : null,
    email: localStorage.getItem("email") || "",
    nickname: localStorage.getItem("nickname") || "",
    profileImage: localStorage.getItem("profileImage") || "",
  };
}

export function getValidAccessToken() {
  const accessToken = localStorage.getItem("accessToken") || "";
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (!isLogin && !accessToken) {
    return "";
  }

  if (!isLogin || isAccessTokenExpired(accessToken)) {
    clearLoginStorage();
    return "";
  }

  return accessToken;
}

export function saveLoginStorage(loginData) {
  localStorage.setItem("accessToken", loginData.accessToken || "");
  localStorage.setItem("isLogin", "true");
  localStorage.setItem("userId", String(loginData.userId ?? ""));
  localStorage.setItem("email", loginData.email ?? "");
  localStorage.setItem("nickname", loginData.nickname ?? "");
  localStorage.setItem("profileImage", loginData.profileImage ?? "");
  notifyAuthChanged();
}

export function updateLoginStorage(userData) {
  if (userData.email !== undefined) {
    localStorage.setItem("email", userData.email ?? "");
  }
  if (userData.nickname !== undefined) {
    localStorage.setItem("nickname", userData.nickname ?? "");
  }
  if (userData.profileImage !== undefined) {
    localStorage.setItem("profileImage", userData.profileImage ?? "");
  }
  notifyAuthChanged();
}

export function clearLoginStorage() {
  removeLoginStorage();
  notifyAuthChanged();
}
