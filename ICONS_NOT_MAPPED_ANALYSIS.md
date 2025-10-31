# Ícones do icons.js SEM Mapeamento no OldIconsMap.json

## Análise Completa - icons.js vs OldIconsMap.json

---

## ✅ ÍCONES ATIVOS (Descomentados) no icons.js

### 🚨 CRÍTICOS - Em Uso Ativo e SEM Mapeamento:

Estes ícones estão **importados e exportados** no `icons.js` e são **usados no projeto**, mas **NÃO têm mapeamento**:

1. **`indicator`** ⚠️ USADO EM:
   - AudioRecorder/AudioHandler.vue
   - ChatsDashboardTagLive.vue
   - ChartBar.vue
   - Card/StatusCard.vue
   - **SUGESTÃO DE MAPEAMENTO**: `"indicator": "fiber_manual_record"`

2. **`navigation-menu-vertical-1`** ⚠️ USADO EM:
   - CardProject.vue
   - CardImage.vue  
   - CardCompany.vue
   - Comment.stories.js
   - **SUGESTÃO DE MAPEAMENTO**: `"navigation-menu-vertical-1": "more_vert"`

3. **`single-neutral-actions-1`** ⚠️ USADO EM:
   - ChatsUserAvatar.vue
   - CardInformation.stories.js
   - CardProject.stories.js
   - **SUGESTÃO DE MAPEAMENTO**: `"single-neutral-actions-1": "person"`

4. **`pin`** ⚠️ USADO EM:
   - ChatsContact.vue
   - **SUGESTÃO DE MAPEAMENTO**: `"pin": "push_pin"`

5. **`unpin`** ⚠️ USADO EM:
   - ChatsContact.vue
   - **SUGESTÃO DE MAPEAMENTO**: `"unpin": "keep_off"`

6. **`messages`** ⚠️ USADO EM:
   - Sistema de mensagens
   - **SUGESTÃO DE MAPEAMENTO**: `"messages": "chat"`

7. **`transfer-message`** ⚠️ USADO EM:
   - Sistema de mensagens
   - **SUGESTÃO DE MAPEAMENTO**: `"transfer-message": "forward_to_inbox"`

8. **`single-neutral-2`** ⚠️
   - **SUGESTÃO DE MAPEAMENTO**: `"single-neutral-2": "person_outline"`

---

### 🔵 COMPONENTES INTERNOS - Não Precisam de Mapeamento

Estes são ícones internos de componentes (SVGs customizados):

#### Checkbox (4 ícones):
- `checkbox-default`
- `checkbox-disable`
- `checkbox-less`
- `checkbox-select`

#### Radio (3 ícones):
- `radio-default`
- `radio-disable`
- `radio-selected`

#### Switch (4 ícones):
- `switch-default`
- `switch-default-disabled`
- `switch-selected`
- `switch-selected-disabled`

#### Sort (3 ícones):
- `sort-asc`
- `sort-default`
- `sort-desc`

**Total: 14 ícones internos** - Não precisam de mapeamento pois são usados diretamente pelos componentes.

---

### 🌍 BANDEIRAS/PAÍSES - Não Precisam de Mapeamento

- `Brazil`
- `Spain`
- `USA`

**Total: 3 ícones** - SVGs customizados de bandeiras.

---

### 📱 REDES SOCIAIS - Não Mapeados

- `social-media-facebook-1`
- `social-instagram-1`

**Total: 2 ícones** - SVGs customizados de logos de redes sociais.

---

## ⚪ ÍCONES COMENTADOS no icons.js

### 🟡 Comentados MAS Já Mapeados no OldIconsMap.json:

Estes ícones estão comentados no `icons.js` mas **têm mapeamento válido**:

1. ✅ `add-1` → "add"
2. ✅ `add-circle-1` → "add_circle"
3. ✅ `alarm-bell-3` → "notifications"
4. ✅ `alarm-bell-ring` → "notifications_ative"
5. ✅ `alert-circle-1` → "error"
6. ✅ `alert-circle-1-1` → "error"
7. ✅ `app-window-edit-1` → "web_asset"
8. ✅ `arrow-button-down-1` → "expand_more"
9. ✅ `arrow-button-up-1` → "expand_less"
10. ✅ `arrow-left-1-1` → "chevron_left"
11. ✅ `arrow-redo` → "redo"
12. ✅ `arrow-right-1-1` → "chevron_right"
13. ✅ `arrow-undo` → "undo"
14. ✅ `attachment` → "attach_file"
15. ✅ `bin-1-1` → "delete"
16. ✅ `book-address-1-2` → "contacts"
17. ✅ `book-library-1` → "school"
18. ✅ `bookmark-tag-1` → "sell"
19. ✅ `button-play-1` → "play_circle"
20. ✅ `button-refresh-arrow-1` → "refresh"
21. ✅ `button-refresh-arrows-1` → "refresh"
22. ✅ `charger-1` → "cloud"
23. ✅ `chat-translate-1` → "translate"
24. ✅ `check-circle-1-1` → "check_circle"
25. ✅ `check-circle-1-1-1` → "check_circle"
26. ✅ `check-double` → "done"
27. ✅ `check-square-1` → "task_alt"
28. ✅ `close-1` → "close"
29. ✅ `cog-1` → "settings"
30. ✅ `common-file-empty-1` → "check_box_outline_blank"
31. ✅ `common-file-horizontal-image-1` → "image"
32. ✅ `controls-pause-1` → "pause"
33. ✅ `controls-play-1` → "play_arrow"
34. ✅ `copy-paste-1` → "content_copy"
35. ✅ `currency-dollar-circle-1` → "paid"
36. ✅ `delete-1` → "error"
37. ✅ `delete-1-1` → "dangerous"
38. ✅ `delete-2-1` → "dangerous"
39. ✅ `download-bottom-1` → "download"
40. ✅ `email-action-unread-1` → "mail"
41. ✅ `emoji` → "mood"
42. ✅ `expand-8-1` → "close_fullscreen"
43. ✅ `expand-full-1` → "open_in_full"
44. ✅ `export-1` → "open_in_new"
45. ✅ `filter` → "filter_alt"
46. ✅ `flash-1-3` → "bolt"
47. ✅ `floppy-disk-1` → "save"
48. ✅ `folder-1` → "folder"
49. ✅ `gauge-dashboard-2` → "speed"
50. ✅ `graph-stats-1` → "vital_signs"
51. ✅ `graph-stats-ascend-2` → "trending_up"
52. ✅ `graph-stats-descend-2` → "trending_down"
53. ✅ `headphones-customer-support-human-1-1` → "headset_mic"
54. ✅ `hierarchy-3-2` → "account_tree"
55. ✅ `house-1-1` → "some"
56. ✅ `information-circle-4` → "info"
57. ✅ `keyboard-arrow-down-1` → "south"
58. ✅ `keyboard-arrow-left-1` → "keyboard_backspace"
59. ✅ `keyboard-return-1` → "keyboard_return"
60. ✅ `layout-dashboard-1` → "dashboard"
61. ✅ `loading-circle-1` → "progress_activity"
62. ✅ `lock-2-1` → "lock"
63. ✅ `lock-2-2` → "lock"
64. ✅ `lock-unlock-1-1` → "lock_open_right"
65. ✅ `logout-1-1` → "logout"
66. ✅ `messages-bubble-1` → "chat_bubble"
67. ✅ `messaging-we-chat-3` → "forum"
68. ✅ `microphone` → "mic"
69. ✅ `move-expand-vertical-1` → "unfold_more"
70. ✅ `notes-1` → "event_note"
71. ✅ `office-file-pdf-1-1` → "picture_as_pdf"
72. ✅ `paginate-filter-text-1` → "article"
73. ✅ `pencil-write-1` → "edit_square"
74. ✅ `phone-3` → "call"
75. ✅ `phone-4` → "call"
76. ✅ `preferences` → "tune"
77. ✅ `question-circle-1` → "help"
78. ✅ `rating-star-1` → "star"
79. ✅ `rating-star-1-1` → "star"
80. ✅ `read-email-at-1` → "alternate_email"
81. ✅ `science-fiction-robot-2` → "neurology"
82. ✅ `search-1` → "search"
83. ✅ `send-email-3-1` → "send"
84. ✅ `study-light-idea-1` → "lightbulb"
85. ✅ `subtract-1` → "remove"
86. ✅ `subtract-circle-1` → "do_not_disturb_on"
87. ✅ `synchronize-arrow-clock-4` → "update"
88. ✅ `task-checklist-1` → "content_paste"
89. ✅ `task-list-clock-1` → "pending_actions"
90. ✅ `text-bold` → "format_bold"
91. ✅ `text-center` → "format_align_center"
92. ✅ `text-italic` → "format_italic"
93. ✅ `text-justified` → "format_align_justify"
94. ✅ `text-left` → "format_align_left"
95. ✅ `text-right` → "format_align_right"
96. ✅ `text-underline` → "format_underlined"
97. ✅ `time-clock-circle-1` → "schedule"
98. ✅ `translate-1` → "translate"
99. ✅ `translate-2` → "translate"
100. ✅ `typing-1` → "text_select_start"
101. ✅ `unordered-list` → "list"
102. ✅ `upload-bottom-1` → "upload"
103. ✅ `video-file-mp4-1` → "video_file"
104. ✅ `view-1-1` → "visibility"
105. ✅ `view-off-1` → "visibility_off"

**Total: 105 ícones comentados mas já mapeados**

---

### 🔴 Comentados E SEM Mapeamento:

Estes ícones estão comentados no `icons.js` e **NÃO têm mapeamento**:

1. ❌ `alarm-bell-2`
2. ❌ `american-express` (cartão de crédito)
3. ❌ `app-window-edit-2`
4. ❌ `arrow-button-right-1`
5. ❌ `book-address-2`
6. ❌ `book-library-2`
7. ❌ `building-2-1`
8. ❌ `check-2`
9. ❌ `check-square-2`
10. ❌ `cog-2`
11. ❌ `default-avatar`
12. ❌ `developer-community-github-1-1`
13. ❌ `diners-club` (cartão de crédito)
14. ❌ `discover` (cartão de crédito)
15. ❌ `download-thick-bottom-1`
16. ❌ `fitness-biceps-1`
17. ❌ `flash-1-4`
18. ❌ `folder-2`
19. ❌ `gauge-dashboard-1`
20. ❌ `generic-card` (cartão de crédito)
21. ❌ `graph-status-circle-1` (note: "graph-stats-circle-1" está mapeado)
22. ❌ `graph-status-circle-1-1`
23. ❌ `headphones-customer-support-1`
24. ❌ `headphones-customer-support-2`
25. ❌ `hierarchy-3-3`
26. ❌ `house-2-2`
27. ❌ `interaction-time`
28. ❌ `jcb` (cartão de crédito)
29. ❌ `keyboard-arrow-right-1`
30. ❌ `keyboard-return-1-1`
31. ❌ `layout-dashboard-2`
32. ❌ `mastercard` (cartão de crédito)
33. ❌ `messages-bubble-3`
34. ❌ `messages-bubble-4`
35. ❌ `messaging-we-chat-2`
36. ❌ `messaging-whatsapp-1`
37. ❌ `photography-equipment-bag-1`
38. ❌ `pie-line-graph-1`
39. ❌ `question-circle-2`
40. ❌ `response-time`
41. ❌ `science-fiction-robot-1`
42. ❌ `social-media-google-1`
43. ❌ `synchronize-arrow-clock-5`
44. ❌ `unionpay` (cartão de crédito)
45. ❌ `vip-crown-queen-2`
46. ❌ `visa` (cartão de crédito)

**Total: 46 ícones comentados sem mapeamento**

---

## 📊 RESUMO EXECUTIVO

### Totais:
- **Ícones ATIVOS sem mapeamento**: 27
  - **CRÍTICOS (em uso)**: 8
  - **Internos (não precisam)**: 14
  - **Bandeiras**: 3
  - **Redes sociais**: 2

- **Ícones COMENTADOS já mapeados**: 105
- **Ícones COMENTADOS sem mapeamento**: 46

### 🚨 AÇÃO IMEDIATA NECESSÁRIA:

Adicionar ao `OldIconsMap.json` os **8 ícones críticos**:

```json
{
  "indicator": "fiber_manual_record",
  "navigation-menu-vertical-1": "more_vert",
  "single-neutral-actions-1": "person",
  "single-neutral-2": "person_outline",
  "pin": "push_pin",
  "unpin": "keep_off",
  "messages": "chat",
  "transfer-message": "forward_to_inbox"
}
```

### 📋 Conclusão:

1. **8 ícones críticos** precisam ser mapeados imediatamente
2. **14 ícones internos** não precisam de mapeamento (SVGs customizados)
3. **5 ícones diversos** (bandeiras, redes sociais) não precisam de mapeamento
4. **105 ícones comentados** já têm mapeamento válido (podem ser descomentados se necessário)
5. **46 ícones comentados** não têm mapeamento (provavelmente obsoletos)

### 💡 Recomendações:

1. ✅ Adicionar imediatamente os 8 mapeamentos críticos
2. 🧹 Considerar remover os 46 ícones comentados sem mapeamento (provavelmente não são mais usados)
3. 📝 Documentar que ícones internos (checkbox, radio, switch, sort) não precisam de mapeamento
4. 🔄 Avaliar se os 105 ícones comentados devem ser descomentados ou se o mapeamento é suficiente





