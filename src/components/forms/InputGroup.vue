<template>
  <div class="input-group">
    <div class="flex">
      <HelpIcon :help="help" v-if="label && help"></HelpIcon>
      <label v-text="label"></label>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import HelpIcon from "@/components/forms/HelpIcon";

export default {
  name: "InputGroup",
  props: ["label", "help"],
  components: { HelpIcon },
  computed: {
    helpText() {
      let index = "igsn.help." + this.help;
      return this.$t(index);
    },
    popOverOptions() {
      return {
        placement: "right"
      };
    }
  }
};
</script>