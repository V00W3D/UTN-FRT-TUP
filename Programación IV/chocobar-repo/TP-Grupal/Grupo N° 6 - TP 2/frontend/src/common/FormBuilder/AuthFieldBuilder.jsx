// src/common/FormBuilder/AuthFieldBuilder.jsx

const AuthFieldBuilder = ({
  id,
  type = "text",
  value,
  label,
  onChange,
  options = [], // si tiene opciones => se renderiza un <select>
  disabled = false,
  required = true,
  placeholder = " ",
}) => {
  return (
    <div className="input-container">
      {options.length > 0 ? (
        // 🧩 Select (combo box)
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        >
          <option value="">Seleccionar {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        // ✏️ Input común
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default AuthFieldBuilder;
