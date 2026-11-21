import { motion } from 'framer-motion';
import { IconLinkExterno, IconYoutube, IconTwitter, IconWiki } from '../../utils/icons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './SourceLinks.module.css';

interface SourceLinksProps {
  sources: Array<{
    type: 'wiki' | 'video' | 'social' | 'artigo' | 'outro';
    url: string;
    title: string;
    timestamp?: string;
  }>;
}

export function SourceLinks({ sources }: SourceLinksProps) {
  const reducedMotion = useReducedMotion();

  if (!sources || sources.length === 0) return null;

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'wiki': return <IconWiki size={16} aria-hidden={true} />;
      case 'video': return <IconYoutube size={16} aria-hidden={true} />;
      case 'social': return <IconTwitter size={16} aria-hidden={true} />;
      case 'artigo': return <IconLinkExterno size={16} aria-hidden={true} />;
      default: return <IconLinkExterno size={16} aria-hidden={true} />;
    }
  };

  const getSourceLabel = (type: string) => {
    const labels: Record<string, string> = {
      wiki: 'GTA Wiki',
      video: 'Vídeo',
      social: 'Redes Sociais',
      artigo: 'Artigo',
      outro: 'Fonte',
    };
    return labels[type] || 'Fonte';
  };

  return (
    <div className={styles.sources}>
      <h3 className={styles.sourcesTitle}>Fontes</h3>
      <ul className={styles.sourcesList} role="list">
        {sources.map((source, index) => (
          <motion.li
            key={source.url}
            className={styles.sourceItem}
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={reducedMotion ? { duration: 0 } : { delay: index * 0.05, duration: 0.3 }}
          >
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceLink}
              aria-label={`${getSourceLabel(source.type)}: ${source.title}${source.timestamp ? `, ${source.timestamp}` : ''}`}
            >
              <span className={styles.sourceIcon} aria-hidden="true">
                {getSourceIcon(source.type)}
              </span>
              <div className={styles.sourceInfo}>
                <span className={styles.sourceType}>{getSourceLabel(source.type)}</span>
                <span className={styles.sourceTitle}>{source.title}</span>
              </div>
              {source.timestamp && (
                <time className={styles.sourceTime} dateTime={source.timestamp}>
                  {source.timestamp}
                </time>
              )}
              <IconLinkExterno size={14} className={styles.externalIcon} aria-hidden={true} />
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}