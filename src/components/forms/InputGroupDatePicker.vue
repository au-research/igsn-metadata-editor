<template>
  <InputGroup :label="label" :class="[errored ? 'error' : '']" :help="help">
    <date-pick v-model="date"></date-pick>
  </InputGroup>
</template>

<script>
import InputGroup from "@/components/forms/InputGroup";
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

export default {
  components: { InputGroup, DatePick },
  props: {
    value: String,
    label: String,
    placeholder: String,
    help: String
  },
  data() {
    return {
      date: this.value,
      errored: false
    };
  },
  watch: {
    date() {
       this.$emit("input", this.date);
    }
  },
  methods: {
    parseDate(dateString) {
        return Date.parse(dateString)
    }
  },
  mounted() {
    setTimeout(() => {
      this.date = this.value
    }, 100)
  }
};
</script>

<style lang="css">
.vdpComponent {
  font-size: inherit;
  display: block;
}

.vdpInnerWrap {
  font-size: x-small;
}
</style>