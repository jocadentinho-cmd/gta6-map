import { getConfidenceColor, getConfidenceLabel } from '../../utils/icons';
import styles from './ConfidenceBadge.module.css';

interface ConfidenceBadgeProps {
  confidence: 'alta' | 'media' | 'baixa';
  size?: 'sm' | 'md' | 'lg';
}

export function ConfidenceBadge({ confidence, size = 'md' }: ConfidenceBadgeProps) {
  const color = getConfidenceColor(confidence);
  const label = getConfidenceLabel(confidence);

  return (
    <span
      className={`${styles.badge} ${styles[size]}`}
      style={{
        color,
        borderColor: color,
        background: `rgba(${hexToRgb(color)}, 0.15)`,
      }}
      title={`Confiança: ${label}`}
    >
      {label}
    </span>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 10)}, ${parseInt(result[2], 10)}, ${parseInt(result[3], 10)}`
    : '0, 0, 0';
}