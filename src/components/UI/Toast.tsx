import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { IconCheck, IconAlerta, IconInfo, IconX } from '../../utils/icons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Toast.module.css';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export function ToastContainer() {
  const { toasts, removerToast } = useAppStore();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      <div className={styles.container} role="region" aria-live="polite" aria-label="Notificações">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removerToast(toast.id)}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}

function ToastItem({ toast, onClose, reducedMotion }: { toast: Toast; onClose: () => void; reducedMotion: boolean }) {
  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(onClose, toast.duration ?? 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <IconCheck size={20} aria-hidden={true} />;
      case 'error': return <IconAlerta size={20} aria-hidden={true} />;
      case 'warning': return <IconAlerta size={20} aria-hidden={true} />;
      default: return <IconInfo size={20} aria-hidden={true} />;
    }
  };

  const getTitle = () => {
    switch (toast.type) {
      case 'success': return 'Sucesso';
      case 'error': return 'Erro';
      case 'warning': return 'Atenção';
      default: return 'Informação';
    }
  };

  return (
    <motion.div
      className={`${styles.toast} ${styles[toast.type]}`}
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 25 }}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.iconWrapper}>
        {getIcon()}
      </div>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <strong className={styles.title}>{getTitle()}</strong>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar notificação"
          >
            <IconX size={16} aria-hidden={true} />
          </button>
        </div>
        <p className={styles.message}>{toast.title}</p>
        {toast.message && <p className={styles.detail}>{toast.message}</p>}
      </div>
      <div className={styles.progressBar} />
    </motion.div>
  );
}

export function useToast() {
  const { adicionarToast } = useAppStore();

  return {
    success: (title: string, message?: string, duration?: number) =>
      adicionarToast({ type: 'success', title, message, duration }),
    error: (title: string, message?: string, duration?: number) =>
      adicionarToast({ type: 'error', title, message, duration }),
    warning: (title: string, message?: string, duration?: number) =>
      adicionarToast({ type: 'warning', title, message, duration }),
    info: (title: string, message?: string, duration?: number) =>
      adicionarToast({ type: 'info', title, message, duration }),
  };
}