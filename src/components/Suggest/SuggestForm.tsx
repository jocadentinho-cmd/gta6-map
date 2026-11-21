import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { gerarJsonSugestao, copiarParaClipboard } from '../../utils/jsonExport';
import { IconLinkExterno, IconCopiar, IconCheck, IconX, IconAlerta } from '../../utils/icons';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './SuggestForm.module.css';
import type { Categoria, Subtipo, Raridade } from '../../types';

const SUBTIPOS_POR_CATEGORIA = {
  dinheiro: ['cofre', 'caixa_forte', 'entrega', 'assalto', 'investimento', 'outro'],
  carro: ['muscle', 'esportivo', 'super', 'classico', 'offroad', 'moto', 'utilitario', 'outro'],
  arma: ['corpo_a_corpo', 'pistola', 'smg', 'rifle', 'sniper', 'pesada', 'projetil', 'especial', 'outro'],
} as const;

const REGIOES = [
  'Vice City',
  'Keys',
  'Everglades',
  'Leonida Beach',
  'Downtown',
  'Porto',
  'Industrial',
  'Subúrbios',
  'Outro',
];

export function SuggestForm() {
  const { setSugestaoAberta } = useAppStore();
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '' as Categoria,
    subtype: '' as Subtipo,
    name: '',
    region: '',
    x: '',
    y: '',
    description: '',
    tip: '',
    confidence: 'media' as 'alta' | 'media' | 'baixa',
    sources: '',
    rarity: null as Raridade,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [jsonOutput, setJsonOutput] = useState('');

  const subtiposDisponiveis = formData.category
    ? SUBTIPOS_POR_CATEGORIA[formData.category as keyof typeof SUBTIPOS_POR_CATEGORIA] || []
    : [];

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep >= 1) {
      if (!formData.category) newErrors.category = 'Selecione uma categoria';
      if (!formData.subtype) newErrors.subtype = 'Selecione um subtipo';
      if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    }

    if (currentStep >= 2) {
      if (!formData.region) newErrors.region = 'Selecione uma região';
      if (!formData.x || !formData.y) {
        newErrors.coords = 'Coordenadas X e Y são obrigatórias (0-1000)';
      } else {
        const x = parseInt(formData.x, 10);
        const y = parseInt(formData.y, 10);
        if (isNaN(x) || x < 0 || x > 1000) newErrors.x = 'X deve ser entre 0 e 1000';
        if (isNaN(y) || y < 0 || y > 1000) newErrors.y = 'Y deve ser entre 0 e 1000';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      const sourceUrls = formData.sources
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);
      const sugestaoData = {
        ...formData,
        x: parseInt(formData.x, 10),
        y: parseInt(formData.y, 10),
        source_urls: sourceUrls,
      };
      const json = gerarJsonSugestao(sugestaoData);
      setJsonOutput(json);
      setStep(4);
    }
  };

  const handleCopy = async () => {
    try {
      await copiarParaClipboard(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Erro ao copiar. Tente selecionar e copiar manualmente.');
    }
  };

  const handleClose = () => {
    setSugestaoAberta(false);
    setStep(1);
    setFormData({
      category: '' as Categoria,
      subtype: '' as Subtipo,
      name: '',
      region: '',
      x: '',
      y: '',
      description: '',
      tip: '',
      confidence: 'media' as 'alta' | 'media' | 'baixa',
      sources: '',
      rarity: null as Raridade,
    });
    setErrors({});
    setJsonOutput('');
  };

  useEffect(() => {
    const element = formRef.current?.querySelector('input, select') as HTMLElement | null;
    element?.focus();
  }, [step]);

  if (!useAppStore.getState().sugestaoAberta) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="suggest-title"
      >
        <motion.form
          ref={formRef}
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 25 }}
          onSubmit={handleSubmit}
        >
          <div className={styles.header}>
            <h2 id="suggest-title" className={styles.title}>Sugerir Localização</h2>
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Fechar formulário"
            >
              <IconX size={22} aria-hidden={true} />
            </button>
          </div>

          <div className={styles.steps}>
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`${styles.step} ${s === step ? styles.active : ''} ${s < step ? styles.completed : ''}`}
              >
                <span className={styles.stepNumber}>{s}</span>
                <span className={styles.stepLabel}>
                  {['Categoria', 'Localização', 'Detalhes', 'Confirmar'][s - 1]}
                </span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className={styles.stepContent}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>O que você encontrou?</legend>
                <div className={styles.radioGroup} role="radiogroup" aria-label="Categoria">
                  {(['dinheiro', 'carro', 'arma'] as const).map((cat) => (
                    <label
                      key={cat}
                      className={`${styles.radioLabel} ${formData.category === cat ? styles.selected : ''}`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={formData.category === cat}
                        onChange={() => {
                          handleChange('category', cat);
                          handleChange('subtype', '');
                        }}
                        className={styles.radio}
                        aria-label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                      />
                      <span className={styles.radioCustom} aria-hidden={true} />
                      <span className={styles.radioText}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                    </label>
                  ))}
                </div>
                {errors.category && (
                  <p className={styles.error} role="alert">{errors.category}</p>
                )}
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Subtipo</legend>
                <div className={styles.selectWrapper}>
                  <select
                    value={formData.subtype}
                    onChange={(e) => handleChange('subtype', e.target.value)}
                    className={styles.select}
                    disabled={!formData.category}
                    aria-invalid={!!errors.subtype}
                    aria-describedby={errors.subtype ? 'subtype-error' : undefined}
                  >
                    <option value="">Selecione o subtipo</option>
                    {subtiposDisponiveis.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.subtype && (
                  <p id="subtype-error" className={styles.error} role="alert">{errors.subtype}</p>
                )}
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Nome da Localização</legend>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={styles.input}
                  placeholder="Ex: Cofre do Banco Central"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  maxLength={100}
                />
                {errors.name && (
                  <p id="name-error" className={styles.error} role="alert">{errors.name}</p>
                )}
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepContent}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Região</legend>
                <div className={styles.selectWrapper}>
                  <select
                    value={formData.region}
                    onChange={(e) => handleChange('region', e.target.value)}
                    className={styles.select}
                    aria-invalid={!!errors.region}
                    aria-describedby={errors.region ? 'region-error' : undefined}
                  >
                    <option value="">Selecione a região</option>
                    {REGIOES.map((reg) => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>
                {errors.region && (
                  <p id="region-error" className={styles.error} role="alert">{errors.region}</p>
                )}
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Coordenadas no Mapa (0-1000)</legend>
                <div className={styles.coordsGrid}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="coord-x" className={styles.label}>X (Leste/Oeste)</label>
                    <input
                      id="coord-x"
                      type="number"
                      value={formData.x}
                      onChange={(e) => handleChange('x', e.target.value)}
                      className={styles.input}
                      placeholder="0-1000"
                      min="0"
                      max="1000"
                      aria-invalid={!!errors.x || !!errors.coords}
                      aria-describedby={errors.x ? 'x-error' : errors.coords ? 'coords-error' : undefined}
                    />
                    {errors.x && <p id="x-error" className={styles.error} role="alert">{errors.x}</p>}
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="coord-y" className={styles.label}>Y (Norte/Sul)</label>
                    <input
                      id="coord-y"
                      type="number"
                      value={formData.y}
                      onChange={(e) => handleChange('y', e.target.value)}
                      className={styles.input}
                      placeholder="0-1000"
                      min="0"
                      max="1000"
                      aria-invalid={!!errors.y || !!errors.coords}
                      aria-describedby={errors.y ? 'y-error' : errors.coords ? 'coords-error' : undefined}
                    />
                    {errors.y && <p id="y-error" className={styles.error} role="alert">{errors.y}</p>}
                  </div>
                </div>
                {errors.coords && (
                  <p id="coords-error" className={styles.error} role="alert">{errors.coords}</p>
                )}
                <p className={styles.hint}>Dica: Abra o mapa no jogo, anote as coordenadas aproximadas.</p>
              </fieldset>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepContent}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Descrição (opcional)</legend>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className={styles.textarea}
                  placeholder="Detalhes sobre como encontrar, dicas, etc."
                  rows={4}
                  maxLength={500}
                />
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Nível de Confiança</legend>
                <div className={styles.radioGroup} role="radiogroup" aria-label="Confiança">
                  {(['alta', 'media', 'baixa'] as const).map((conf) => (
                    <label
                      key={conf}
                      className={`${styles.radioLabel} ${formData.confidence === conf ? styles.selected : ''}`}
                    >
                      <input
                        type="radio"
                        name="confidence"
                        value={conf}
                        checked={formData.confidence === conf}
                        onChange={() => handleChange('confidence', conf)}
                        className={styles.radio}
                      />
                      <span className={styles.radioCustom} aria-hidden={true} />
                      <span className={styles.radioText}>{conf.charAt(0).toUpperCase() + conf.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Raridade (opcional)</legend>
                <div className={styles.selectWrapper}>
                  <select
                    value={formData.rarity || ''}
                    onChange={(e) => handleChange('rarity', e.target.value || null)}
                    className={styles.select}
                  >
                    <option value="">Selecione a raridade</option>
                    <option value="comum">Comum</option>
                    <option value="raro">Raro</option>
                    <option value="mitico">Mítico</option>
                  </select>
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Dica de Como Chegar (opcional)</legend>
                <textarea
                  value={formData.tip}
                  onChange={(e) => handleChange('tip', e.target.value)}
                  className={styles.textarea}
                  placeholder="Ex: Entre pela porta dos fundos, suba as escadas..."
                  rows={3}
                  maxLength={300}
                />
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Fontes (opcional)</legend>
                <textarea
                  value={formData.sources}
                  onChange={(e) => handleChange('sources', e.target.value)}
                  className={styles.textarea}
                  placeholder="Links para wiki, vídeos, tweets, etc. (um por linha)"
                  rows={3}
                  maxLength={500}
                />
                <p className={styles.hint}>Cole URLs de fontes que confirmem esta localização.</p>
              </fieldset>
            </div>
          )}

          {step === 4 && (
            <div className={styles.stepContent} style={{ textAlign: 'center' }}>
              <div className={styles.success}>
                <IconCheck size={64} className={styles.successIcon} aria-hidden={true} />
                <h3 className={styles.successTitle}>Pronto!</h3>
                <p className={styles.successText}>
                  Copie o JSON abaixo e envie para os mantenedores do projeto.
                </p>
              </div>

              <div className={styles.jsonOutput}>
                <div className={styles.jsonHeader}>
                  <span className={styles.jsonLabel}>JSON para envio</span>
                  <button
                    type="button"
                    className={styles.copyButton}
                    onClick={handleCopy}
                    aria-label={copied ? 'Copiado!' : 'Copiar JSON'}
                  >
                    {copied ? (
                      <>
                        <IconCheck size={18} aria-hidden={true} />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <IconCopiar size={18} aria-hidden={true} />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className={styles.jsonPre}><code>{jsonOutput}</code></pre>
              </div>

              <p className={styles.note}>
                <IconAlerta size={16} aria-hidden={true} />
                Esta é uma sugestão de fã. Os dados serão verificados antes de entrar no mapa oficial.
              </p>
            </div>
          )}

          <div className={styles.actions}>
            {step > 1 && (
              <button
                type="button"
                className={styles.backButton}
                onClick={handleBack}
              >
                <IconX size={18} aria-hidden={true} style={{ transform: 'rotate(180deg)' }} />
                Voltar
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={handleNext}
              >
                Próximo
                <IconLinkExterno size={18} aria-hidden={true} style={{ transform: 'rotate(-90deg)' }} />
              </button>
            ) : (
              <button
                type="button"
                className={styles.nextButton}
                onClick={handleClose}
              >
                Fechar
              </button>
            )}
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}