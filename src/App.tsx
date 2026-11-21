import { useEffect, useRef } from 'react';
import { MapWrapper } from './components/Map/MapView';
import { Sidebar, SidebarToggle } from './components/Sidebar/Sidebar';
import { LocationCard } from './components/LocationCard/LocationCard';
import { IntroSequence } from './components/Intro/IntroSequence';
import { SuggestForm } from './components/Suggest/SuggestForm';
import { ToastContainer } from './components/UI/Toast';
import { Marquee } from './components/UI/Marquee';
import { CustomCursor } from './components/UI/Cursor';
import { useAppStore } from './store/useAppStore';
import { useLenis } from './hooks/useLenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import { IconMenu, IconAdicionar, IconCarimbo } from './utils/icons';
import './styles/global.css';
import './styles/variables.css';
import styles from './App.module.css';

function App() {
  const {
    localizacaoSelecionada,
    setLocalizacaoSelecionada,
    sugestaoAberta,
    setSugestaoAberta,
    reduzirMovimento,
    setReduzirMovimento,
  } = useAppStore();
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (sugestaoAberta) {
          setSugestaoAberta(false);
        } else if (localizacaoSelecionada) {
          setLocalizacaoSelecionada(null);
        } else {
          useAppStore.getState().setSidebarAberta(false);
        }
      }
      if (e.key === 'm' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setReduzirMovimento(!reduzirMovimento);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [localizacaoSelecionada, sugestaoAberta, reduzirMovimento, setSugestaoAberta, setLocalizacaoSelecionada, setReduzirMovimento]);

  useEffect(() => {
    if (lenis && mapRef.current) {
      lenis.resize();
    }
  }, [lenis, localizacaoSelecionada]);

  const handleLocationClick = (id: string) => {
    setLocalizacaoSelecionada(id);
    useAppStore.getState().setSidebarAberta(true);
  };

  const handleLocationHover = (_id: string | null) => {
  };

  const handleSuggestClick = () => {
    setSugestaoAberta(true);
  };

  const handleReduceMotionToggle = () => {
    setReduzirMovimento(!reduzirMovimento);
  };

  return (
    <div className={styles.app} style={{ '--reduce-motion': reducedMotion || reduzirMovimento ? '1' : '0' } as React.CSSProperties}>
      <IntroSequence />

      <header className={styles.header} role="banner">
        <div className={styles.headerLeft}>
          <h1 className={styles.logo}>Leonida</h1>
          <span className={styles.tagline}>Guia de Campo</span>
        </div>
        <div className={styles.headerCenter}>
          <Marquee />
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.iconButton}
            onClick={handleReduceMotionToggle}
            aria-pressed={reduzirMovimento}
            aria-label={reduzirMovimento ? 'Ativar animações' : 'Reduzir movimento'}
            title={reduzirMovimento ? 'Ativar animações (⌘+M)' : 'Reduzir movimento (⌘+M)'}
          >
            <IconMenu size={20} aria-hidden={true} style={{ transform: reduzirMovimento ? 'rotate(90deg)' : 'none' }} />
          </button>
          <button
            className={`${styles.iconButton} ${styles.suggestButton}`}
            onClick={handleSuggestClick}
            aria-label="Sugerir nova localização"
          >
            <IconAdicionar size={20} aria-hidden={true} />
          </button>
          <SidebarToggle />
        </div>
      </header>

      <main className={styles.main} role="main">
        <div className={styles.mapWrapper} ref={mapRef}>
          <MapWrapper
            onLocationClick={handleLocationClick}
            onLocationHover={handleLocationHover}
            selectedId={localizacaoSelecionada}
          />
        </div>
      </main>

      <Sidebar />

      <LocationCard />

      <SuggestForm />

      <ToastContainer />

      <CustomCursor />

      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerContent}>
          <p className={styles.disclaimer}>
            <IconCarimbo size={14} aria-hidden={true} />
            Mapa não oficial de fã • Dados baseados em trailers e screenshots • Verifique no jogo
          </p>
          <p className={styles.credits}>
            Fontes: <a href="https://gta.fandom.com" target="_blank" rel="noopener noreferrer">GTA Wiki</a> •
            Ícones: Custom SVG •
            Mapa: Estilizado por fãs
          </p>
          <p className={styles.legal}>
            Grand Theft Auto VI é propriedade da Rockstar Games. Este é um projeto de fã sem fins lucrativos.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;