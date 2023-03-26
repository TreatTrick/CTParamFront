import axios from 'axios';

export interface User{
  id: string,
  name: string,
  account: string,
  telephone: string | undefined,
};

export interface userParam{
    param: string,
};

const server = 'localhost:5000'

export const fetchUserList = async (userParam: userParam): Promise<User[]> => {
  try {
    const response = await axios.get(server + '/api/users', {params: userParam});
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(server + '/api/users');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const fetchUser = async (id: string): Promise<User> => {
  try {
    const response = await axios.get(server + '/api/users/' + id);
    return response.data;
  } catch (error) {
    console.error(error);
    return { id: '', name: '', account: '', telephone: '' };
  }
}

