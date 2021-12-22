import axios from 'axios';

const token: string | undefined = process.env.TOKEN;

const headers = {
  Authorization: `bearer ${token}`,
};

export const fetchGraphql = (data: any) =>
  axios({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    headers,
    data,
  });
