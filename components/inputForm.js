import { useState } from "react";

export default function InputForm({ onUpdateUserList }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function submitForm(e) {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    }).then(() => onUpdateUserList());

    setName("");
    setEmail("");
  }

  return (
    <div>
      <form onSubmit={(e) => submitForm(e)}>
        <fieldset>
          <legend>вводные</legend>
          <div className="container">
            <label>
              Имя
              <input
                type="text"
                autoFocus
                placeholder="vasiya pupkin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              электронная почта
              <input
                type="email"
                placeholder="vasya@pupkin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button type="submit"> добавить </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
