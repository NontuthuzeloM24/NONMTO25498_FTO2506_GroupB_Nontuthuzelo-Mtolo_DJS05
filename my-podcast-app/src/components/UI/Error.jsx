export default function Error({ message }) {
  return (
    <div className="error">
      <p className="error__message">{message || "An error occurred."}</p>
    </div>
  );
}
