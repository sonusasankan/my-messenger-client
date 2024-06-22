
export const userLogin = async (token) => {
    const response = await fetch('http://localhost:5000/api/auth/me', {
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
  const response = await fetch(`http://localhost:5000/api/friends/${userID}`);
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
    const response = await fetch(`http://localhost:5000/api/users/allUsers`, {
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