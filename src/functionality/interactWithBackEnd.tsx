import axios from 'axios';

export interface User{
  id: string,
  name: string,
  account: string,
  telephone: string | undefined,
};

export interface userParam{
    name: string,
    account: string,
    telephone: string | undefined,
};

const server = 'localhost:5000'

export const fetchUserList = async (userparam: userParam): Promise<User[]> => {
  try {
    const response = await axios.get(server + '/api/users', {params: userparam});
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
