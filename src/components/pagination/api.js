function getUsers(page) {
  return fetch(`https://randomuser.me/api/?page=${page}&results=12&seed=abc`)
    .then((res) => res.json())
    .then((data) => data.results);
}

const api = {
  getUsers,
};

export default api;
