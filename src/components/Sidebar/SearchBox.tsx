import { useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconLupa, IconX } from '../../utils/icons';
import styles from './SearchBox.module.css';

export function SearchBox() {
  const { busca, setBusca } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
  };

  const handleClear = () => {
    setBusca('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
      inputRef.current?.blur();
    }
  };

  return (
    <div className={styles.searchContainer} role="search" aria-label="Buscar localizações">
      <label htmlFor="search-input" className={styles.visuallyHidden}>
        Buscar por nome, região ou descrição
      </label>
      <div className={styles.inputWrapper}>
        <IconLupa size={20} className={styles.icon} aria-hidden={true} />
        <input
          ref={inputRef}
          id="search-input"
          type="search"
          className={styles.input}
          value={busca}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Buscar localização..."
          aria-describedby="search-hint"
          autoComplete="off"
          spellCheck={false}
        />
        {busca && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Limpar busca"
          >
            <IconX size={16} aria-hidden={true} />
          </button>
        )}
      </div>
      <span id="search-hint" className={styles.hint}>
        Digite para filtrar por nome, região ou descrição
      </span>
    </div>
  );
}