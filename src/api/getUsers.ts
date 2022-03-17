import axios from './index';

export interface User {
  name: string,
  id: number,
}

export default function getUsers(name_like: string = ''):Promise<User[]> {
  return axios.get(
    '/users',
    {
      params: { name_like },
    },
  );
}
