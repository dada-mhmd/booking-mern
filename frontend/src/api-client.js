// register a user
export const register = async (formData) => {
  const response = await fetch(`/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// login user
export const login = async (formData) => {
  const response = await fetch(`/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const addHotel = async (hotelFormData) => {
  try {
    const res = await fetch('/api/my-hotels', {
      method: 'POST',
      credentials: 'include',
      body: hotelFormData,
    });
    if (!res.ok) {
      throw new Error(res.message || 'Failed to add hotel');
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
