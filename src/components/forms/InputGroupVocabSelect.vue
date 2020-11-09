<template>
  <InputGroup :label="label" :help="help" :error="errors[0]">
    <div class="flex">
      <select
          name
          :value="value"
          v-on:input="updateValue($event.target.value)"
          :required="required"
      >
        <option v-for="item in vocab" :key="item.value" :value="item.value">{{ item.label }}</option>
      </select>
      <a v-if="removable" class="btn btn-red ml-2 text-xs" @click.prevent="remove">Remove</a>
    </div>
  </InputGroup>
</template>

<script>
import InputGroup from "@/components/forms/InputGroup";

export default {
  name: "InputGroupVocabSelect",
  components: {InputGroup},
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
    },
    errors: {
      type: Array,
      default: () => {
        return []
      }
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
  }
};
</script>