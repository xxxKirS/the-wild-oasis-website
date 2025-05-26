import React from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

export const metadata: Metadata = {
  title: 'Cabins',
};

export default async function Page() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users: User[] = await res.json();

  console.log(users);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
