import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/login';

const login = async (credentials) => {
	const response = await axios.post(baseUrl, credentials);
	return response.data;
};

const logout = () => {
	window.localStorage.clear();
	window.location.href = '/';
};

export default { login, logout };
