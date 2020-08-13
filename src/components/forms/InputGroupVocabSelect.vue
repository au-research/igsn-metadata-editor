<template>
  <InputGroup :label="label" :help="help" :error="errored">
    <div class="flex">
      <select
        name
        :value="value"
        v-on:input="updateValue($event.target.value)"
        :required="required"
      >
        <option v-for="item in vocab" :key="item.value" :value="item.value">{{ item.label}}</option>
      </select>
      <button v-if="removable" class="btn btn-red ml-2 text-xs" @click.prevent="remove">Remove</button>
    </div>
  </InputGroup>
</template>

<script>
import InputGroup from "@/components/forms/InputGroup";

export default {
  name: "InputGroupVocabSelect",
  components: { InputGroup },
  props: {
    label: String,
    value: String,
    help: String,
    vocab: Array,
    required: {
      type: Boolean,
      default: false
    },
    removable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);

      // only emit the change event if the parent is listening to it
      if (this.$listeners && this.$listeners.change) {
        this.$emit("change", value);
      }
    },
    remove() {
      this.$emit("remove");
    }
  },
  computed: {
    errored() {
      return (
        this.required === true && (this.value == undefined || this.value == "")
      );
    }
  }
};
</script>