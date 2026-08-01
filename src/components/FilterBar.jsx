function FilterBar({ nameFilter, onNameChange, sortBy, sortDirection, onSortChange, accentColor }) {
  const inputClasses =
    'bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-sm text-stone-100 placeholder-neutral-500 focus:outline-none transition-colors';

  const buttonBaseClasses =
    'text-sm px-3 py-2 rounded-md border transition-colors flex items-center gap-1';

  const handleSortClick = (field) => {
    if (sortBy !== field) {
      onSortChange(field, 'asc');
    } else if (sortDirection === 'asc') {
      onSortChange(field, 'desc');
    } else {
      onSortChange(null, null);
    }
  };

  const arrow = (field) => {
    if (sortBy !== field) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  const activeStyle = (field) =>
    sortBy === field
      ? { borderColor: accentColor, color: accentColor }
      : { borderColor: '#404040', color: '#d4d4d4' };

  return (
    <div className="max-w-6xl mx-auto mb-6 flex flex-wrap gap-3 items-end">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-neutral-400">Nombre</label>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={nameFilter}
          onChange={(e) => onNameChange(e.target.value)}
          className={inputClasses}
          style={{ borderColor: nameFilter ? accentColor : undefined }}
        />
      </div>

      <button
        onClick={() => handleSortClick('category')}
        className={buttonBaseClasses}
        style={activeStyle('category')}
      >
        Categoría{arrow('category')}
      </button>

      <button
        onClick={() => handleSortClick('health')}
        className={buttonBaseClasses}
        style={activeStyle('health')}
      >
        Vida{arrow('health')}
      </button>
    </div>
  );
}

export default FilterBar;