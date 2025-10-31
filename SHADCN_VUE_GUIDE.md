# Guia de Integração shadcn-vue no unnnic

Este guia explica como o shadcn-vue foi integrado ao projeto unnnic e como utilizá-lo.

## 📦 O que foi instalado

### Dependências

- **Tailwind CSS v4** - Framework CSS utility-first
- **shadcn-vue** - Coleção de componentes baseados em Reka UI
- **Reka UI** - Biblioteca headless de componentes Vue (a11y + comportamento)
- **class-variance-authority** - Gerenciamento de variantes de classes
- **clsx** + **tailwind-merge** - Utilitários para combinação de classes

## 🎨 Arquitetura

```
unnnic/
├── src/
│   ├── assets/
│   │   └── scss/
│   │       ├── tailwind.scss       # Configuração Tailwind + Design tokens integrados
│   │       └── colors-hsl.scss     # Cores em HSL geradas do Style Dictionary
│   ├── components/
│   │   └── ui/                     # Componentes shadcn-vue (você tem controle total)
│   │       └── button/
│   │           ├── Button.vue      # Componente estilizado
│   │           └── index.ts        # Variantes e exports
│   └── lib/
│       └── utils.ts                # Utilitário cn() para merge de classes
└── components.json                 # Configuração shadcn-vue
```

## 🚀 Como usar componentes shadcn-vue

### 1. Adicionar novos componentes

```bash
# Adicionar componente individualmente
npx shadcn-vue@latest add button
npx shadcn-vue@latest add dialog
npx shadcn-vue@latest add card

# Adicionar múltiplos componentes
npx shadcn-vue@latest add button dialog card input
```

### 2. Usar em seus componentes

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Meu Card</CardTitle>
    </CardHeader>
    <CardContent>
      <Button>Clique aqui</Button>
    </CardContent>
  </Card>
</template>
```

### 3. Variantes de componentes

Todos os componentes shadcn-vue suportam variantes. Exemplo com Button:

```vue
<template>
  <!-- Variantes de estilo -->
  <Button variant="default">Padrão</Button>
  <Button variant="secondary">Secundário</Button>
  <Button variant="destructive">Destrutivo</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>

  <!-- Variantes de tamanho -->
  <Button size="sm">Pequeno</Button>
  <Button size="default">Padrão</Button>
  <Button size="lg">Grande</Button>
  <Button size="icon">🎯</Button>
</template>
```

## 🎨 Customização total

### Por que shadcn-vue é diferente?

**Não é uma biblioteca npm tradicional.** Os componentes são **copiados para seu projeto**, o que significa:

- ✅ **Controle total** do código fonte
- ✅ **Customização ilimitada** de estilos e comportamento
- ✅ **Sem dependências em runtime** (exceto Reka UI)
- ✅ **Você é o dono** do código

### Personalizando componentes

Os componentes estão em `src/components/ui/`. Você pode editá-los diretamente:

```vue
<!-- src/components/ui/button/Button.vue -->
<script setup lang="ts">
// Adicione props customizadas
interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  loading?: boolean  // ← Nova prop!
  class?: HTMLAttributes["class"]
}
</script>

<template>
  <Primitive :class="cn(buttonVariants({ variant, size }), props.class)">
    <span v-if="loading">⏳</span>
    <slot />
  </Primitive>
</template>
```

### Personalizando estilos com tokens do unnnic

Edite `src/assets/scss/tailwind.scss` para usar variáveis SCSS do unnnic (já integrado automaticamente via Style Dictionary):

```css
@theme {
  /* Mapear cores do unnnic para tokens do Tailwind */
  --color-primary: /* usar var(--unnnic-color-brand-primary) */;
  --color-secondary: /* usar var(--unnnic-color-brand-secondary) */;
  /* ... */
}
```

Ou crie wrappers que combinam estilos:

```vue
<script setup lang="ts">
import { Button as ShadcnButton } from '@/components/ui/button';

// Wrapper que adiciona classes unnnic
</script>

<template>
  <ShadcnButton :class="['unnnic-custom-styles', $attrs.class]">
    <slot />
  </ShadcnButton>
</template>

<style lang="scss" scoped>
.unnnic-custom-styles {
  // Aplicar variáveis SCSS do unnnic
  font-family: $unnnic-font-family;
  // ...
}
</style>
```

## 📚 Componentes disponíveis

Para ver todos os componentes disponíveis:

👉 [shadcn-vue.com/docs/components](https://www.shadcn-vue.com/docs/components)

Alguns componentes úteis:

- **Forms**: Input, Select, Checkbox, Radio, Switch, Textarea
- **Layout**: Card, Separator, Tabs, Accordion
- **Feedback**: Dialog, Alert, Toast, Progress
- **Navigation**: Dropdown, Popover, Menu, Breadcrumb
- **Data**: Table, Pagination, DataTable

## 🔧 Utilitário `cn()`

O helper `cn()` em `src/lib/utils.ts` combina classes inteligentemente:

```typescript
import { cn } from '@/lib/utils';

// Merge condicional de classes
const buttonClass = cn(
  'base-classes',
  isActive && 'active-classes',
  props.class // Classes do usuário têm prioridade
);
```

## 🎭 Reka UI (Headless)

shadcn-vue é construído sobre **Reka UI**, que fornece:

- ✅ **Acessibilidade (a11y)** completa (ARIA, keyboard navigation)
- ✅ **Comportamento robusto** (focus management, portal, etc)
- ✅ **Sem estilos** - você controla 100% do visual

Você pode usar Reka UI diretamente para componentes totalmente customizados:

```vue
<script setup lang="ts">
import { DialogRoot, DialogTrigger, DialogContent } from 'reka-ui';
</script>

<template>
  <DialogRoot>
    <DialogTrigger class="unnnic-button">
      Abrir Dialog
    </DialogTrigger>
    <DialogContent class="unnnic-dialog">
      <!-- Seu HTML + classes unnnic -->
    </DialogContent>
  </DialogRoot>
</template>

<style lang="scss" scoped>
.unnnic-dialog {
  background: $unnnic-color-background;
  border-radius: $unnnic-border-radius-md;
  // Estilos 100% customizados
}
</style>
```

## 🔄 Workflow recomendado

1. **Adicione componente via CLI**
   ```bash
   npx shadcn-vue@latest add [component]
   ```

2. **Use como está** para prototipagem rápida

3. **Customize conforme necessário**
   - Edite o componente em `src/components/ui/`
   - Ajuste variantes em `index.ts`
   - Adapte estilos para design system do unnnic

4. **Documente customizações** para manutenção futura

## 🎯 Quando usar shadcn-vue vs componentes unnnic

| Cenário | Recomendação |
|---------|--------------|
| Componente já existe no unnnic | ✅ Use componente unnnic |
| Componente novo + protótipo rápido | ✅ Use shadcn-vue |
| Componente complexo (Datepicker, Select) | ✅ Use shadcn-vue + customize |
| Precisa 100% identidade visual unnnic | ⚠️ Use Reka UI direto + SCSS |

## 🚨 Considerações importantes

### Coexistência com componentes unnnic

- **Tailwind CSS** foi adicionado ao projeto
- **Não conflita** com SCSS existente
- Componentes unnnic continuam funcionando normalmente
- Use prefixos/namespaces se necessário

### Build e bundle size

- Tailwind CSS será incluído no bundle final
- Componentes shadcn-vue são tree-shakable (só o que usar é incluído)
- Reka UI adiciona ~15-20kb ao bundle

### TypeScript

Todos os componentes shadcn-vue têm tipos completos:

```typescript
import type { ButtonVariants } from '@/components/ui/button';

const variant: ButtonVariants['variant'] = 'outline';
```

## 📖 Recursos

- [Documentação shadcn-vue](https://www.shadcn-vue.com)
- [Documentação Reka UI](https://reka-ui.com)
- [Documentação Tailwind CSS v4](https://tailwindcss.com)
- [Class Variance Authority](https://cva.style/docs)

## 🤝 Próximos passos

1. Explore componentes disponíveis: `npx shadcn-vue@latest add [component]`
2. Customize estilos para seguir design system unnnic
3. Crie componentes compostos combinando shadcn-vue + unnnic
4. Documente padrões de uso para o time

---

**Dúvidas?** Consulte a [documentação oficial do shadcn-vue](https://www.shadcn-vue.com) ou abra uma issue no repositório.

