<template>
  <InputGroup :label="label" :help="help" :error="errors[0]">
    <div class="flex">
      <input
          type="text"
          :value="value"
          :placeholder="placeholderValue"
          v-on:input="updateValue($event.target.value)"
          :disabled="disabled"
      />
      <button v-if="removable" class="btn btn-red text-xs ml-2" @click.prevent="remove">Remove</button>
    </div>
  </InputGroup>
</template>

<script>
import InputGroup from "@/components/forms/InputGroup";

export default {
  name: "InputGroupText",
  components: {InputGroup},
  props: {
    label: String,
    value: String,
    help: String,
    placeholder: String,
    validationText: String,
    required: {
      type: Boolean,
      default: false
    },
    removable: {
      type: Boolean,
      default: false
    },
    disabled: {
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
      this.$emit("input", value)
    },
    remove() {
      this.$emit("remove", this.$refs);
    }
  },
  computed: {
    placeholderValue() {
      return this.placeholder ? this.placeholder : this.label;
    }
  }
};
</script>