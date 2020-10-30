<template>
  <div class="input-group" :class="[error ? 'error' : '']">
    <div class="flex">
      <HelpIcon :help="help" v-if="label && help"></HelpIcon>
      <label v-text="label"></label>
    </div>
    <slot></slot>
    <span v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import HelpIcon from "@/components/forms/HelpIcon";

export default {
  name: "InputGroup",
  props: ["label", "help", "error"],
  components: { HelpIcon },
  computed: {
    helpText() {
      return this.help;
    },
    popOverOptions() {
      return {
        placement: "right"
      };
    }
  }
};
</script>