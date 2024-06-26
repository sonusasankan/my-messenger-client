import { baseURL } from "../env";

export const userRegister = async (username, email, password, profilePicture) => {
  const response = await fetch(`${baseURL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      profilePicture,
      hasFriends: false,
      hasMessages: false
    }),
  })
  if (!response.ok) {
  throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}

export const userLogin = async (token) => {
    const response = await fetch(`${baseURL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}

export const fetchFriendlist = async (userID) => {
  const response = await fetch(`${baseURL}/api/friends/${userID}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Friend list not found');
    } else {
      throw new Error('An error occurred while fetching friends');
    }
  }

  const data = await response.json();
  return data;
}

//get all users to populate on network page
export const fetchAllUsers = async (token) => {
  try {
    const response = await fetch(`${baseURL}/api/users/allUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('An error occurred while fetching users');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};