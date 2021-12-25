export default function User({ user, onDelete, onEdit }) {
  return (
    <div className="listItem">
      <div className="leftSection">
        {user.name}
        <br />
        {user.email}
      </div>
      <div className="rightSection">
        <button onClick={() => onDelete(user.id)}>delete</button>
        <br />
        <button onClick={() => onEdit(user.id)}>edit</button>
      </div>
    </div>
  );
}
