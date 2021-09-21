<template>
    <popper trigger="clickToOpen" :options="popOverOptions">
        <div class="popper">
          <div class="p-2 text-left" v-html="helpText"></div>
        </div>

        <a slot="reference" class="focus:outline-none">
          <i class="fas fa-question-circle text-blue mr-2 cursor-pointer"></i>
        </a>
      </popper>
</template>

<script>
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";

export default {
  name: "HelpIcon",
  props: ["help"],
  components: { Popper },
  computed: {
    helpText() {
      let index = "igsn.help." + this.help;
      return this.$t(index);
    },
    popOverOptions() {
      return {
        placement: "right",
      };
    }
  }
};
</script>