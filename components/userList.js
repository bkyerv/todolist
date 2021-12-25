import { useState, useEffect } from "react";

import User from "./user";
import UserEdit from "./userEdit";
import InputForm from "./inputForm";

export default function UserList() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    users.map((user) => (user["isEditing"] = false));
    setUsers(users);
  }

  function handleDelete(id) {
    fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" }).then(() =>
      getUsers()
    );
  }

  function handleEdit(id) {
    const updatedUsers = users.map((user) => {
      return user.id === id
        ? { ...user, isEditing: !user.isEditing }
        : { ...user, isEditing: false };
    });
    setUsers(updatedUsers);
  }

  function handleSaveEdit(id, name, email) {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then(({ id, name, email }) => {
        const updatedUserList = users.map((user) =>
          user.id === id
            ? { ...user, name, email, isEditing: !user.isEditing }
            : user
        );
        setUsers(updatedUserList)
      });
  }

  useEffect(async () => await getUsers(), []);

  return (
    <div>
      <InputForm onUpdateUserList={getUsers} />

      <div className="userList">
        {users.map((user) => {
          return user.isEditing ? (
            <UserEdit
              key={user.id}
              user={user}
              onCancel={handleEdit}
              onSaveEdit={handleSaveEdit}
            />
          ) : (
            <User
              key={user.id}
              user={user}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          );
        })}
      </div>
    </div>
  );
}
