# 🎨 Guia de Tokens Integrados - Style Dictionary + Tailwind CSS

## 📋 Visão Geral

Este projeto utiliza uma integração automática entre **Style Dictionary** e **Tailwind CSS**, eliminando a necessidade de conversões manuais de cores e garantindo consistência em todo o design system.

## 🔄 Fluxo de Trabalho

```
Tokens JSON (HEX)  →  Style Dictionary  →  SCSS Variables (HSL)  →  Tailwind CSS
src/assets/tokens/       conversão automática      colors-hsl.scss      variáveis CSS
colors.json              hexToHSL()                radii.scss           --primary, --radius
```

## 📁 Estrutura de Arquivos

```
unnnic/
├── src/
│   ├── assets/
│   │   ├── tokens/                    # 📝 Fonte de verdade (editar aqui)
│   │   │   ├── colors.json            # Cores em HEX
│   │   │   ├── radii.json             # Border radius
│   │   │   ├── fonts.json             # Tipografia
│   │   │   └── ...
│   │   │
│   │   └── scss/                      # 🤖 Gerados automaticamente
│   │       ├── colors-hsl.scss        # Cores convertidas para HSL
│   │       ├── radii.scss             # Border radius
│   │       ├── fonts.scss             # Tipografia
│   │       └── tailwind.scss          # 🎨 Integração com Tailwind
│   │
│   └── main.ts                        # Importa tailwind.scss
│
├── styleDictionary.config.js         # ⚙️ Configuração + conversão HEX→HSL
└── tailwind.config.js                # 🎨 Configuração do Tailwind

```

## 🚀 Como Funciona

### 1. **Definir Tokens** (Fonte de Verdade)

Edite `src/assets/tokens/colors.json`:

```json
{
  "color": {
    "teal": {
      "600": {
        "value": "#00A49F"
      }
    },
    "gray": {
      "900": {
        "value": "#353945"
      }
    }
  }
}
```

### 2. **Conversão Automática** (HEX → HSL)

O Style Dictionary converte automaticamente usando a função `hexToHSL()`:

```javascript
// styleDictionary.config.js
function hexToHSL(hex) {
  // Converte #00A49F → "178 100% 32%"
  // Formato compatível com Tailwind CSS
}
```

### 3. **Gerar Variáveis SCSS**

Execute o comando:

```bash
npm run style-dictionary:generate
```

Isso gera `src/assets/scss/colors-hsl.scss`:

```scss
// Do not edit directly, this file was auto-generated.

$unnnic-color-teal-600-hsl: 178 100% 32%; /* #00A49F */
$unnnic-color-gray-900-hsl: 225 13% 24%; /* #353945 */
// ... todas as cores em HSL
```

E também `src/assets/scss/radii.scss`:

```scss
$unnnic-radius-0: 0;
$unnnic-radius-1: 0.25 * 16px; /* 4px */
$unnnic-radius-2: 0.5 * 16px; /* 8px */
$unnnic-radius-3: 0.75 * 16px; /* 12px */
// ...
```

### 4. **Integração com Tailwind**

`src/assets/scss/tailwind.scss` usa essas variáveis:

```scss
@import './colors-hsl.scss';
@import './radii.scss';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Shadcn-ui variables usando tokens do unnnic */
    --primary: #{$unnnic-color-teal-600-hsl};
    --foreground: #{$unnnic-color-gray-900-hsl};
    --radius: #{$unnnic-radius-2};
  }
}
```

### 5. **Uso nos Componentes**

Os componentes shadcn-ui/Tailwind usam automaticamente:

```vue
<template>
  <!-- Usa --primary que é $unnnic-color-teal-600-hsl -->
  <Button variant="default">Clique aqui</Button>
  
  <!-- Classes Tailwind também funcionam -->
  <div class="bg-primary text-foreground rounded-lg">
    Conteúdo
  </div>
</template>
```

## ✨ Vantagens

### ✅ Consistência Total

- **Uma única fonte de verdade**: `src/assets/tokens/*.json`
- Mudanças propagam automaticamente para SCSS e Tailwind
- Impossível ter cores dessincronizadas

### ✅ Sem Conversão Manual

**Antes:**
```scss
// ❌ Conversão manual, propensa a erros
--primary: 178 100% 32%; /* unnnic-color-teal-600: #00A49F */
```

**Depois:**
```scss
// ✅ Gerado automaticamente do token
--primary: #{$unnnic-color-teal-600-hsl}; // Sempre correto
```

### ✅ Tipagem e Documentação

- Comentários automáticos com valor HEX original
- Nomes semânticos e organizados
- Fácil rastreabilidade

### ✅ Integração com Todas as Ferramentas

- ✅ Style Dictionary (SCSS/JS/CSS)
- ✅ Tailwind CSS (variáveis CSS)
- ✅ Shadcn-ui (design tokens)
- ✅ Componentes Vue (classes Tailwind ou variáveis CSS)

## 🔧 Comandos Úteis

### Gerar/Atualizar Tokens

```bash
npm run style-dictionary:generate
```

Quando executar:
- Após modificar arquivos em `src/assets/tokens/`
- Ao adicionar novas cores, tamanhos, etc.
- Automático no build de produção

### Adicionar Novo Token

1. **Edite o JSON:**
   ```json
   // src/assets/tokens/colors.json
   {
     "color": {
       "brand": {
         "primary": {
           "value": "#FF5733"
         }
       }
     }
   }
   ```

2. **Gere os tokens:**
   ```bash
   npm run style-dictionary:generate
   ```

3. **Use no Tailwind:**
   ```scss
   // src/assets/scss/tailwind.scss
   :root {
     --brand-primary: #{$unnnic-color-brand-primary-hsl};
   }
   ```

4. **Use nos componentes:**
   ```vue
   <div class="text-[hsl(var(--brand-primary))]">
     Texto na cor primária
   </div>
   ```

## 📊 Tokens Disponíveis

### Cores HSL (`colors-hsl.scss`)

Todas as cores do unnnic em formato HSL:

```scss
// Grayscale
$unnnic-color-gray-50-hsl → $unnnic-color-gray-950-hsl

// Brand colors
$unnnic-color-teal-50-hsl → $unnnic-color-teal-950-hsl

// Semantic colors
$unnnic-color-red-*, $unnnic-color-green-*, $unnnic-color-blue-*
$unnnic-color-orange-*, $unnnic-color-yellow-*, $unnnic-color-purple-*

// Functional colors
$unnnic-color-bg-base-hsl, $unnnic-color-bg-soft-hsl, ...
$unnnic-color-fg-base-hsl, $unnnic-color-fg-emphasized-hsl, ...
$unnnic-color-border-base-hsl, ...
```

### Border Radius (`radii.scss`)

```scss
$unnnic-radius-0: 0
$unnnic-radius-1: 4px
$unnnic-radius-2: 8px
$unnnic-radius-3: 12px
$unnnic-radius-4: 16px
$unnnic-radius-full: 100%
```

### Outros Tokens

- **Fontes**: `fonts.scss`
- **Espaçamentos**: `spaces.scss`
- **Sombras**: `shadows.scss`
- **Ícones**: `icon-sizes.scss`

## 🎯 Mapeamento Shadcn-ui ↔ Unnnic

| Shadcn-ui Variable    | Unnnic Token                          | Uso                          |
|-----------------------|---------------------------------------|------------------------------|
| `--primary`           | `$unnnic-color-teal-600-hsl`         | Cor principal (botões, etc)  |
| `--foreground`        | `$unnnic-color-fg-emphasized-hsl`    | Texto principal              |
| `--muted-foreground`  | `$unnnic-color-fg-base-hsl`          | Texto secundário             |
| `--border`            | `$unnnic-color-border-base-hsl`      | Bordas                       |
| `--destructive`       | `$unnnic-color-red-500-hsl`          | Ações destrutivas            |
| `--radius`            | `$unnnic-radius-2`                   | Border radius padrão         |

## 🛠️ Configuração Técnica

### Style Dictionary Config

```javascript
// styleDictionary.config.js
module.exports = {
  source: ['./src/assets/tokens/**/*.json'],
  hooks: {
    formats: {
      'scss/hsl-variables': (dictionary) => {
        // Formato customizado que converte HEX → HSL
        return dictionary.allTokens.map(token => {
          const hslValue = hexToHSL(token.value);
          return `$${token.name}-hsl: ${hslValue};`;
        });
      }
    }
  },
  platforms: {
    scss: {
      files: [
        {
          destination: 'colors-hsl.scss',
          format: 'scss/hsl-variables',
          filter: 'colors'
        }
      ]
    }
  }
};
```

### Tailwind Config

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        foreground: 'hsl(var(--foreground))',
        // ...
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      }
    }
  }
};
```

## 🐛 Troubleshooting

### Problema: Cores não aparecem

**Solução:**
```bash
# Regenerar tokens
npm run style-dictionary:generate

# Verificar se o arquivo foi gerado
ls src/assets/scss/colors-hsl.scss

# Reiniciar dev server
npm run dev
```

### Problema: Variável SCSS não encontrada

**Causa:** Esqueceu de importar o arquivo no SCSS

**Solução:**
```scss
// src/assets/scss/tailwind.scss
@import './colors-hsl.scss'; // ← Adicionar isso
```

### Problema: Valor HSL incorreto

**Solução:** Os valores HSL são gerados automaticamente. Se estiver errado:
1. Verifique o valor HEX original em `src/assets/tokens/colors.json`
2. Corrija o valor HEX
3. Regenere: `npm run style-dictionary:generate`

## 📚 Referências

- [Style Dictionary Docs](https://amzn.github.io/style-dictionary/)
- [Tailwind CSS Variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [Shadcn-ui Theming](https://ui.shadcn.com/docs/theming)
- [HSL Color Format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl)

---

**Status**: ✅ Sistema de tokens totalmente integrado e automático  
**Última atualização**: Outubro 2024  
**Manutenção**: Apenas edite os JSONs em `src/assets/tokens/`

