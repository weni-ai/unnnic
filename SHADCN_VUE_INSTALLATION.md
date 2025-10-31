# ✅ Instalação do shadcn-vue - Concluída

## 📦 O que foi instalado

### Dependências instaladas (package.json)

```json
{
  "devDependencies": {
    "tailwindcss": "^4.1.16",
    "autoprefixer": "^10.x.x",
    "tailwindcss-animate": "^1.x.x",
    "class-variance-authority": "^0.x.x",
    "clsx": "^2.x.x",
    "tailwind-merge": "^2.x.x"
  },
  "dependencies": {
    "reka-ui": "^0.x.x" // Adicionado automaticamente pelo shadcn-vue
  }
}
```

## 📁 Arquivos criados/modificados

### Novos arquivos:

1. **src/assets/scss/tailwind.scss**
   - Configuração do Tailwind CSS
   - Design tokens (cores, radius, etc.) baseados em Style Dictionary
   - Suporte a dark mode
   - Integrado com tokens SCSS do unnnic

2. **src/lib/utils.ts**
   - Função `cn()` para merge de classes CSS

3. **src/components/ui/button/**
   - `Button.vue` - Componente Button do shadcn-vue
   - `index.ts` - Variantes e tipos

4. **components.json**
   - Configuração do CLI do shadcn-vue
   - Aliases de paths
   - Configurações de estilo

### Arquivos modificados:

1. **src/main.ts**
   - Adicionado import do CSS do Tailwind

2. **src/App.vue**
   - Exemplo de uso dos componentes shadcn-vue

## 🚀 Como usar

### 1. Adicionar novos componentes

```bash
# Ver componentes disponíveis
npx shadcn-vue@latest

# Adicionar um componente
npx shadcn-vue@latest add [component-name]

# Exemplos:
npx shadcn-vue@latest add dialog
npx shadcn-vue@latest add card
npx shadcn-vue@latest add input
npx shadcn-vue@latest add form
npx shadcn-vue@latest add select
npx shadcn-vue@latest add dropdown-menu
```

### 2. Importar e usar em componentes

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button';
</script>

<template>
  <Button variant="default" size="lg">
    Meu botão
  </Button>
</template>
```

### 3. Customizar componentes

Os componentes estão em `src/components/ui/`. Você pode editá-los diretamente:

```typescript
// src/components/ui/button/index.ts
export const buttonVariants = cva(
  "base-classes...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        // Adicione suas variantes customizadas aqui!
        unnnic: "bg-unnnic-brand text-white hover:bg-unnnic-brand-dark",
      }
    }
  }
)
```

## 🎨 Integração com tokens do unnnic

### ✨ Integração automática com Style Dictionary

O arquivo `src/assets/scss/tailwind.scss` já está integrado com os tokens do unnnic:

```scss
@import './colors-hsl.scss';  // Cores em HSL geradas automaticamente
@import './radii.scss';       // Border radius do unnnic

@layer base {
  :root {
    --primary: #{$unnnic-color-teal-600-hsl};
    --radius: #{$unnnic-radius-2};
    // ... outros tokens
  }
}
```

**Vantagens:**
- ✅ Valores HSL gerados automaticamente do Style Dictionary
- ✅ Mudanças nos tokens são refletidas automaticamente
- ✅ Não precisa converter manualmente HEX → HSL

### Opção 2: Wrapper components

Crie wrappers que aplicam estilos unnnic:

```vue
<!-- src/components/unnnic-ui/UnnnicButton.vue -->
<script setup lang="ts">
import { Button } from '@/components/ui/button';
</script>

<template>
  <Button :class="['unnnic-button-override', $attrs.class]">
    <slot />
  </Button>
</template>

<style lang="scss" scoped>
.unnnic-button-override {
  font-family: $unnnic-font-family;
  border-radius: $unnnic-border-radius-md;
  // ... outros estilos unnnic
}
</style>
```

## 📚 Componentes disponíveis

Acesse: https://www.shadcn-vue.com/docs/components

### Formulários
- ✅ Button (instalado)
- Input
- Select
- Checkbox
- Radio
- Switch
- Textarea
- Form (validação com Vee-Validate/Zod)

### Layout
- Card
- Tabs
- Accordion
- Separator
- Sheet
- Dialog/Modal

### Feedback
- Alert
- Toast
- Progress
- Skeleton

### Navegação
- Dropdown Menu
- Popover
- Navigation Menu
- Breadcrumb
- Command (search/command palette)

### Data Display
- Table
- Avatar
- Badge
- Calendar
- Date Picker

E muitos mais...

## 🧪 Testar a instalação

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Abrir http://localhost:5173
# Você verá a página de exemplo com botões shadcn-vue
```

## 🔍 Estrutura do código

### Reka UI (Headless)

Os componentes shadcn-vue usam Reka UI internamente:

```vue
<script setup lang="ts">
import { Primitive } from 'reka-ui' // Componente headless

// shadcn-vue adiciona estilos ao Primitive
</script>
```

**Você também pode usar Reka UI diretamente** para componentes 100% customizados:

```vue
<script setup lang="ts">
import { DialogRoot, DialogTrigger, DialogContent } from 'reka-ui';
</script>

<template>
  <DialogRoot>
    <DialogTrigger class="unnnic-button">Abrir</DialogTrigger>
    <DialogContent class="unnnic-dialog">
      <!-- Estilos 100% seus -->
    </DialogContent>
  </DialogRoot>
</template>
```

## ⚙️ Configuração (components.json)

```json
{
  "style": "new-york",           // Estilo visual (new-york/default)
  "typescript": true,            // Suporte TypeScript
  "tailwind": {
    "css": "src/assets/scss/tailwind.scss",
    "baseColor": "neutral",      // Cor base do tema
    "cssVariables": true         // Usar CSS variables
  },
  "iconLibrary": "lucide",       // Biblioteca de ícones
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

## 🤝 Coexistência com componentes unnnic

shadcn-vue foi instalado **de forma não-invasiva**:

- ✅ Componentes unnnic continuam funcionando normalmente
- ✅ SCSS do unnnic não é afetado
- ✅ Tailwind CSS e SCSS coexistem sem conflitos
- ✅ Você escolhe quando usar shadcn-vue vs componentes unnnic

## 📖 Próximos passos

1. **Explorar componentes**
   ```bash
   npx shadcn-vue@latest add [component]
   ```

2. **Customizar cores** em `src/assets/scss/tailwind.scss` (ou nos tokens do Style Dictionary)

3. **Criar wrappers** que combinam shadcn-vue + estilos unnnic

4. **Documentar padrões** de uso para o time

## 🆘 Suporte

- [Documentação oficial shadcn-vue](https://www.shadcn-vue.com)
- [Documentação Reka UI](https://reka-ui.com)
- [Documentação Tailwind CSS v4](https://tailwindcss.com)
- [Guia completo](./SHADCN_VUE_GUIDE.md)

---

**Status**: ✅ Instalação concluída com sucesso!
**Data**: Outubro 2024
**Versões**: Tailwind v4.1.16, shadcn-vue latest, Vue 3.4.8

