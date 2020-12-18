
<template>
  <div :class="{ 'unnic-card': true, 'unnic-card--small': type === 'title' }">
    <component
      class="unnic-card-content"
      :is="currentComponent"
      :v-bind="$attrs"
      :title="title"
      :info="info"
      :icon="currentTypeIcon"
      :value="value"
      :percent="percent"
      :status="status"
      :description="description"
      :enabled="enabled"
    />
  </div>
</template>

<script>
import UICon from "../Icon.vue";
import DashCard from "./DashCard.vue";
import TitleCard from "./TitleCard.vue";
import StatusCard from "./StatusCard.vue";
import AccountCard from "./AccountCard.vue";

export default {
  name: "unnic-card",
  components: { UICon },
  props: {
    type: {
      type: String,
      default: "title",
      validator(value) {
        return (
          ["title", "status", "dash", "account-option"].indexOf(value) !== -1
        );
      },
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    info: {
      type: String,
      default: null,
    },
    value: {
      type: Number,
      default: null,
    },
    percent: {
      type: Number,
      default: 0,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    currentTypeIcon() {
      if (this.type === "title") return "graph-stats-1";
      if (this.type === "dash") return "messages-bubble-1";
      if (this.type === "status") return "science-fiction-robot-2";
      if (this.type === "account") return "single-neutral-2";
      return "view-1-1";
    },
    currentComponent() {
      if (this.type === "title") return TitleCard;
      if (this.type === "dash") return DashCard;
      if (this.type === "status") return StatusCard;
      if (this.type === "account") return AccountCard;
      return "view-1-1";
    },
  },
};
</script>
