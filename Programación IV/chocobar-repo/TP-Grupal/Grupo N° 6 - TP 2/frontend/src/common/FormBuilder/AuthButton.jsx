export default function AuthButton({
  text,
  onClick,
  type = "button",
  loading = false,
  variant = "primary",
  disabled = false,
}) {
  if (variant === "link") {
    return (
      <button
        type={type}
        className="auth-link-btn"
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }

  return (
    <button
      type={type}
      className="auth-main-btn"
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? "Cargando..." : text}
    </button>
  );
}
