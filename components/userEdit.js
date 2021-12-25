import { useState } from "react";

export default function UserEdit({ user, onSaveEdit, onCancel }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);


  return (
    <div className="listItem">
      <div className="leftSection">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="rightSection">
        <button onClick={() => onCancel(user.id)}>cancel</button>
        <br />
        <button onClick={() => onSaveEdit(user.id, name, email)}>save</button>
      </div>
    </div>
  );
}
