# 🚀 Guia de Migração: Alert → Toast

## 📦 Importação

**ANTES:**

```javascript
import Unnnic from '@weni/unnnic-system';

Unnnic.unnnicCallAlert(...);
```

**DEPOIS:**

```javascript
import { toast } from "@weni/unnnic-system";
```

---

## 📋 Mapeamento de Propriedades

| Alert               | Toast               | Alteração                       |
| ------------------- | ------------------- | ------------------------------- |
| `text`              | `title`             | Propriedade renomeada           |
| `seconds`           | `timeout`           | Agora em **milissegundos (ms)** |
| `type: 'success'`   | `toast.success()`   | Substituído por método direto   |
| `type: 'error'`     | `toast.error()`     | Substituído por método direto   |
| `type: 'attention'` | `toast.attention()` | Substituído por método direto   |
| `type: 'default'`   | `toast.info()`      | Substituído por método direto   |

---

## 🔄 Exemplos de Uso

### Exemplo 1 – Uso com Função

**ANTES:**

```javascript
// callAlert
alert.callAlert({
  props: {
    text: "Dados salvos com sucesso!",
    type: "success",
  },
  seconds: 3,
});
```

**DEPOIS:**

```javascript
// toast
toast.success("Dados salvos com sucesso!");
```

---

### Exemplo 2 – Uso com Componente

**ANTES:**

```vue
<!-- UnnnicAlert -->
<UnnnicAlert
  text="Dados salvos com sucesso!"
  type="success"
  @close="handleClose"
/>
```

**DEPOIS:**

```vue
<!-- UnnnicToast -->
<UnnnicToast
  title="Dados salvos com sucesso!"
  type="success"
  @close="handleClose"
/>
```

---

## 📚 Casos Comuns

### ✅ Sucesso

**ANTES:**

```javascript
alert.callAlert({
  props: {
    text: "Dados salvos com sucesso!",
    type: "success",
  },
  seconds: 5,
});
```

**DEPOIS:**

```javascript
toast.success("Dados salvos com sucesso!");
```

---

### ❌ Erro

**ANTES:**

```javascript
alert.callAlert({
  props: {
    text: "Erro ao salvar dados",
    type: "error",
  },
  seconds: 5,
});
```

**DEPOIS:**

```javascript
toast.error("Erro ao salvar dados");
```

---

### ⏱ Timeout Personalizado

**ANTES:**

```javascript
alert.callAlert({
  props: {
    text: "Mensagem importante",
    type: "success",
  },
  seconds: 10, // 10 segundos
});
```

**DEPOIS:**

```javascript
toast.success("Mensagem importante", "", {
  timeout: 10000, // 10 segundos em ms
});
```
