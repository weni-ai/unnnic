# Análise de Uso de Ícones - Projeto Unnnic

## Resumo Executivo

Esta análise compara os ícones disponíveis em `src/utils/icons.js` com o mapeamento em `src/components/Icon/OldIconsMap.json` e identifica quais estão sendo usados no projeto.

---

## 1. Ícones Mapeados no OldIconsMap.json (Total: 64)

Estes ícones antigos têm mapeamento para Material Symbols:

### ✅ Mapeados E Em Uso no Projeto:

1. **add-1** → `add` - USADO em:
   - TabsExpanded.vue
   - ModalNext.stories.js
   - Card.stories.js
   - ChatsNavbar.stories.js

2. **add-circle-1** → `add_circle` - USADO em:
   - Accordion.vue

3. **alarm-bell-3** → `notifications` - MAPEADO (não encontrado em uso direto)

4. **alarm-bell-ring** → `notifications_ative` - DISPONÍVEL no icons.js

5. **alert-circle-1** → `error` - MAPEADO (variante alert-circle-1-1 é usada)

6. **app-window-edit-1** → `web_asset` - DISPONÍVEL no icons.js

7. **arrow-button-down-1** → `expand_more` - USADO em:
   - MultiSelect.vue
   - Collapse.vue

8. **arrow-button-up-1** → `expand_less` - USADO em:
   - MultiSelect.vue
   - Collapse.vue

9. **arrow-left-1-1** → `chevron_left` - USADO em:
   - Carousel/TagCarousel.vue

10. **arrow-redo** → `redo` - DISPONÍVEL no icons.js

11. **arrow-right-1-1** → `chevron_right` - USADO em:
    - Carousel/TagCarousel.vue
    - Breadcrumb.vue
    - Tag/IndicatorTag.vue

12. **arrow-undo** → `undo` - DISPONÍVEL no icons.js

13. **attachment** → `attach_file` - DISPONÍVEL no icons.js

14. **bin-1-1** → `delete` - DISPONÍVEL no icons.js

15. **book-address-1-2** → `contacts` - DISPONÍVEL no icons.js

16. **book-library-1** → `school` - DISPONÍVEL no icons.js

17. **bookmark-tag-1** → `sell` - DISPONÍVEL no icons.js

18. **button-play-1** → `play_circle` - DISPONÍVEL no icons.js

19. **button-refresh-arrow-1** → `refresh` - USADO em:
    - ChartBar.vue

20. **button-refresh-arrows-1** → `refresh` - DISPONÍVEL no icons.js

21. **charger-1** → `cloud` - DISPONÍVEL no icons.js

22. **chat-translate-1** → `translate` - DISPONÍVEL no icons.js

23. **check-circle-1-1** → `check_circle` - USADO em:
    - AudioRecorder/AudioHandler.vue
    - Card/CardData.vue (variante check-circle-1-1-1)

24. **check-double** → `done` - DISPONÍVEL no icons.js

25. **check-square-1** → `task_alt` - DISPONÍVEL no icons.js

26. **close-1** → `close` - USADO extensivamente em:
    - Alert.vue
    - AlertBanner.vue (usa 'close' direto)
    - ModalNext.vue
    - ModalUpload.vue
    - Modal.vue
    - ProgressBar.vue
    - TabsExpanded.vue
    - Tag/BrandTag.vue

27. **cog-1** → `settings` - USADO em:
    - CardProject.stories.js

28. **common-file-empty-1** → `check_box_outline_blank` - DISPONÍVEL no icons.js

29. **common-file-horizontal-image-1** → `image` - DISPONÍVEL no icons.js

30. **controls-pause-1** → `pause` - DISPONÍVEL no icons.js

31. **controls-play-1** → `play_arrow` - DISPONÍVEL no icons.js

32. **copy-paste-1** → `content_copy` - DISPONÍVEL no icons.js

33. **currency-dollar-circle-1** → `paid` - DISPONÍVEL no icons.js

34. **delete-1** → `error` - DISPONÍVEL no icons.js

35. **delete-1-1** → `dangerous` - USADO em:
    - AudioRecorder.vue
    - CardCompany.stories.js

36. **download-bottom-1** → `download` - DISPONÍVEL no icons.js

37. **email-action-unread-1** → `mail` - DISPONÍVEL no icons.js

38. **emoji** → `mood` - DISPONÍVEL no icons.js

39. **expand-8-1** → `close_fullscreen` - DISPONÍVEL no icons.js

40. **expand-full-1** → `open_in_full` - DISPONÍVEL no icons.js

41. **export-1** → `open_in_new` - DISPONÍVEL no icons.js

42. **flash-1-3** → `bolt` - DISPONÍVEL no icons.js

43. **floppy-disk-1** → `save` - DISPONÍVEL no icons.js

44. **folder-1** → `folder` - DISPONÍVEL no icons.js

45. **gauge-dashboard-2** → `speed` - DISPONÍVEL no icons.js

46. **graph-stats-1** → `vital_signs` - USADO em:
    - AvatarIcon.stories.js
    - CardImage.stories.js

47. **graph-stats-ascend-2** → `trending_up` - USADO em:
    - Card/DashCard.vue

48. **graph-stats-descend-2** → `trending_down` - USADO em:
    - Card/DashCard.vue

49. **headphones-customer-support-human-1-1** → `headset_mic` - DISPONÍVEL no icons.js

50. **hierarchy-3-2** → `account_tree` - USADO em:
    - CardInformation.stories.js

51. **house-1-1** → `some` - DISPONÍVEL no icons.js

52. **information-circle-4** → `info` - USADO em:
    - Card/TitleCard.vue
    - Card/CardStatusesContainer.vue

53. **keyboard-arrow-down-1** → `south` - DISPONÍVEL no icons.js

54. **keyboard-arrow-left-1** → `keyboard_backspace` - USADO em:
    - TabsExpanded.vue

55. **keyboard-return-1** → `keyboard_return` - DISPONÍVEL no icons.js

56. **layout-dashboard-1** → `dashboard` - DISPONÍVEL no icons.js

57. **loading-circle-1** → `progress_activity` - USADO em:
    - Button.vue (estado loading)

58. **lock-2-1** → `lock` - DISPONÍVEL no icons.js

59. **lock-unlock-1-1** → `lock_open_right` - DISPONÍVEL no icons.js

60. **logout-1-1** → `logout` - DISPONÍVEL no icons.js

61. **messages-bubble-1** → `chat_bubble` - DISPONÍVEL no icons.js

62. **messaging-we-chat-3** → `forum` - USADO em:
    - ChatsContact.vue
    - Sidebar.stories.js

63. **microphone** → `mic` - DISPONÍVEL no icons.js

64. **move-expand-vertical-1** → `unfold_more` - DISPONÍVEL no icons.js

65. **notes-1** → `event_note` - DISPONÍVEL no icons.js

66. **office-file-pdf-1-1** → `picture_as_pdf` - DISPONÍVEL no icons.js

67. **paginate-filter-text-1** → `article` - DISPONÍVEL no icons.js

68. **pencil-write-1** → `edit_square` - USADO em:
    - ChatText.stories.js

69. **phone-3** → `call` - DISPONÍVEL no icons.js

70. **preferences** → `tune` - DISPONÍVEL no icons.js

71. **question-circle-1** → `help` - DISPONÍVEL no icons.js

72. **rating-star-1** → `star` - USADO em:
    - StarRating.vue
    - Banner/InfoBanner.vue
    - Card/MarketplaceCard.vue
    - Card/CardData.vue

73. **read-email-at-1** → `alternate_email` - DISPONÍVEL no icons.js

74. **science-fiction-robot-2** → `neurology` - USADO em:
    - ChatsUserAvatar.vue
    - CardInformation.stories.js

75. **search-1** → `search` - DISPONÍVEL no icons.js

76. **send-email-3-1** → `send` - DISPONÍVEL no icons.js

77. **study-light-idea-1** → `lightbulb` - DISPONÍVEL no icons.js

78. **subtract-circle-1** → `do_not_disturb_on` - USADO em:
    - Accordion.vue

79. **synchronize-arrow-clock-4** → `update` - DISPONÍVEL no icons.js

80. **task-checklist-1** → `content_paste` - DISPONÍVEL no icons.js

81. **task-list-clock-1** → `pending_actions` - DISPONÍVEL no icons.js

82. **text-bold** → `format_bold` - DISPONÍVEL no icons.js

83. **text-center** → `format_align_center` - DISPONÍVEL no icons.js

84. **text-italic** → `format_italic` - DISPONÍVEL no icons.js

85. **text-justified** → `format_align_justify` - DISPONÍVEL no icons.js

86. **text-left** → `format_align_left` - DISPONÍVEL no icons.js

87. **text-right** → `format_align_right` - DISPONÍVEL no icons.js

88. **text-underline** → `format_underlined` - DISPONÍVEL no icons.js

89. **time-clock-circle-1** → `schedule` - DISPONÍVEL no icons.js

90. **unordered-list** → `list` - DISPONÍVEL no icons.js

91. **upload-bottom-1** → `upload` - DISPONÍVEL no icons.js

92. **video-file-mp4-1** → `video_file` - DISPONÍVEL no icons.js

93. **view-1-1** → `visibility` - USADO em:
    - InputNext.vue
    - Card.stories.js
    - CardCompany.stories.js

94. **view-off-1** → `visibility_off` - USADO em:
    - InputNext.vue

---

## 2. Ícones NO icons.js MAS NÃO no OldIconsMap.json

Estes ícones estão disponíveis em `icons.js` mas não têm mapeamento:

### 🔶 Ícones de Switch (internos):
- switch-default
- switch-default-disabled
- switch-selected
- switch-selected-disabled

### 🔶 Ícones de Checkbox (internos):
- checkbox-default
- checkbox-disable
- checkbox-less
- checkbox-select

### 🔶 Ícones de Radio (internos):
- radio-default
- radio-disable
- radio-selected

### 🔶 Ícones de Sort (internos):
- sort-asc
- sort-default
- sort-desc

### 🔶 Bandeiras/Países:
- Brazil
- Spain
- USA

### 🔶 Cartões de Crédito:
- american-express
- diners-club
- discover
- generic-card
- jcb
- mastercard
- unionpay
- visa

### 🔶 Ícones Diversos Sem Mapeamento:
- alarm-bell-2
- alert-circle-1-1 (tem variante alert-circle-1)
- app-window-edit-2
- arrow-button-right-1
- book-address-2
- book-library-2
- building-2-1
- check-2
- check-circle-1-1-1
- check-square-2
- cog-2
- default-avatar
- delete-2-1
- developer-community-github-1-1
- download-thick-bottom-1
- filter
- fitness-biceps-1
- flash-1-4
- folder-2
- gauge-dashboard-1
- graph-status-circle-1
- graph-status-circle-1-1
- headphones-customer-support-1
- headphones-customer-support-2
- hierarchy-3-3
- house-2-2
- **indicator** - USADO em:
  - AudioRecorder/AudioHandler.vue
  - ChatsDashboardTagLive.vue
  - ChartBar.vue
  - Card/StatusCard.vue
- interaction-time
- keyboard-arrow-right-1
- keyboard-return-1-1
- layout-dashboard-2
- lock-2-2
- messages-bubble-3
- messages-bubble-4
- messaging-we-chat-2
- messaging-whatsapp-1
- **messages** - USADO no projeto
- **navigation-menu-vertical-1** - USADO em:
  - CardProject.vue
  - CardImage.vue
  - CardCompany.vue
  - Comment.stories.js
- phone-4
- phone-charger-1
- photography-equipment-bag-1
- pie-line-graph-1
- **pin** - USADO em:
  - ChatsContact.vue
- **unpin** - USADO em:
  - ChatsContact.vue
- question-circle-2
- rating-star-1-1
- response-time
- science-fiction-robot-1
- **single-neutral-actions-1** - USADO em:
  - ChatsUserAvatar.vue
  - CardInformation.stories.js
  - CardProject.stories.js
- **single-neutral-2** - Disponível
- social-instagram-1
- social-media-facebook-1
- social-media-google-1
- subtract-1
- synchronize-arrow-clock-5
- **transfer-message** - USADO no projeto
- translate-1
- translate-2
- typing-1
- vip-crown-queen-2

---

## 3. Material Symbols Sendo Usados Diretamente (Novos Ícones)

Estes ícones não estão em `icons.js` mas são usados diretamente como Material Symbols:

- **close** - usado em vários componentes
- **info** - usado em Tab, Slider, SimpleCard, ChatText
- **article** - usado em ChatsMessage/ReplyMessage
- **image** - usado em ChatsMessage/ReplyMessage
- **videocam** - usado em ChatsMessage/ReplyMessage
- **mic** - usado em ChatsMessage/ReplyMessage
- **upload** - usado em DropArea, ChatsMessage
- **reply** - usado em ChatsMessage
- **delete** - usado em ImportCard
- **warning** - usado em FormElement
- **switch_left** - usado em DataTable e TableNext
- **keyboard_arrow_up** / **keyboard_arrow_down** - usado em Sidebar
- **home** - usado em ChatsNavbar.stories
- **bolt** - usado em Drawer.stories
- **abc** - usado em Sidebar.stories
- **tune** - usado em Sidebar.stories

---

## 4. Ícones Críticos que PRECISAM de Mapeamento

### 🚨 Alta Prioridade (Em Uso Ativo):

1. **indicator** - Usado em 4+ componentes
2. **navigation-menu-vertical-1** - Usado em 3+ componentes
3. **single-neutral-actions-1** - Usado em 3+ componentes
4. **pin** / **unpin** - Funcionalidade de fixar mensagens
5. **messages** - Sistema de mensagens
6. **transfer-message** - Sistema de mensagens

### 🟡 Média Prioridade (Disponíveis mas sem uso claro):

Todos os ícones de formatação de texto, países, cartões de crédito e estados de componentes (checkbox, radio, switch) estão disponíveis mas são usados internamente pelos componentes.

---

## 5. Recomendações

### ✅ Ações Imediatas:

1. **Adicionar ao OldIconsMap.json**:
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

2. **Verificar imports faltantes**: O arquivo `icons.js` está incompleto (linhas 1-5 mostram imports de Switch, mas faltam imports para todos os outros ícones)

3. **Documentar**: Criar documentação sobre quando usar ícones old vs Material Symbols

### 📋 Ações Futuras:

1. Migrar gradualmente componentes que usam ícones antigos para Material Symbols
2. Deprecar ícones não utilizados do `icons.js`
3. Consolidar uso de ícones diretos do Material Symbols
4. Remover dependências desnecessárias dos SVG icons antigos

---

## 6. Estatísticas

- **Total de ícones em icons.js**: ~186
- **Total de ícones mapeados no OldIconsMap**: 64
- **Ícones mapeados em uso ativo**: ~35
- **Ícones sem mapeamento mas em uso**: 6 críticos
- **Taxa de utilização dos mapeados**: ~55%
- **Ícones Material Symbols diretos**: ~15+

---

## Conclusão

O projeto está em transição entre ícones SVG antigos e Material Symbols. Aproximadamente 55% dos ícones mapeados estão sendo usados ativamente. Existem 6 ícones críticos que precisam de mapeamento imediato: `indicator`, `navigation-menu-vertical-1`, `single-neutral-actions-1`, `pin`, `unpin`, `messages`, e `transfer-message`.

A maioria dos componentes já está usando o sistema de mapeamento corretamente através do `Icon.vue`, que faz o fallback automático do OldIconsMap para Material Symbols.





