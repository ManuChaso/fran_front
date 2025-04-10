import './Select.css'

const Select = ({
  options,
  value,
  onChange,
  label = '',
  name = '',
  id = '',
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`select-container ${className}`}>
      {label && <label htmlFor={id || name}>{label}</label>}
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className='select-input'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
