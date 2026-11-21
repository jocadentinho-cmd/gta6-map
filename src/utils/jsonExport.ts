import type { SugestaoLocalizacao, Localizacao } from '../types';

export function gerarJsonSugestao(sugestao: SugestaoLocalizacao): string {
  const novoId = `sugestao_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  
  const localizacao: Omit<Localizacao, 'verified'> & { verified: false } = {
    id: novoId,
    name: sugestao.name,
    category: sugestao.category,
    subtype: sugestao.subtype,
    rarity: sugestao.rarity,
    region: sugestao.region,
    x: sugestao.x,
    y: sugestao.y,
    position_precision: 'aproximada',
    description: sugestao.description,
    tip: sugestao.tip,
    confidence: 'baixa',
    verified: false,
    source_urls: sugestao.source_urls,
  };

  return JSON.stringify(localizacao, null, 2);
}

export function copiarParaClipboard(texto: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(texto);
  }
  
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      resolve();
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textarea);
    }
  });
}

export function validarSugestao(sugestao: Partial<SugestaoLocalizacao>): { valido: boolean; erros: string[] } {
  const erros: string[] = [];

  if (!sugestao.name?.trim()) erros.push('Nome é obrigatório');
  if (!sugestao.category) erros.push('Categoria é obrigatória');
  if (!sugestao.subtype) erros.push('Subtipo é obrigatório');
  if (!sugestao.region?.trim()) erros.push('Região é obrigatória');
  if (typeof sugestao.x !== 'number' || sugestao.x < 0 || sugestao.x > 1000) {
    erros.push('Coordenada X deve ser entre 0 e 1000');
  }
  if (typeof sugestao.y !== 'number' || sugestao.y < 0 || sugestao.y > 1000) {
    erros.push('Coordenada Y deve ser entre 0 e 1000');
  }
  if (!sugestao.description?.trim()) erros.push('Descrição é obrigatória');
  if (!sugestao.tip?.trim()) erros.push('Dica de como chegar é obrigatória');

  return { valido: erros.length === 0, erros };
}

export function baixarJsonComoArquivo(json: string, nomeArquivo: string = 'sugestao-localizacao.json') {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}