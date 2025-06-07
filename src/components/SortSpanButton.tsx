export function SortSpanButton({
  label,
  shortName,
  onClick,
  onKeyDown,
  checked,
}) {
  return (
    <span
      role="radio"
      aria-label={label}
      tabIndex={0}
      className={`sort__pill ${checked ? "active" : ""}`}
      aria-checked={checked}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {shortName}
    </span>
  );
}
