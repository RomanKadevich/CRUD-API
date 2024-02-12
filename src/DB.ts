export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export let users: User[] = [
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    username: 'example_user',
    age: 25,
    hobbies: ['reading', 'painting', 'hiking'],
  },
];
