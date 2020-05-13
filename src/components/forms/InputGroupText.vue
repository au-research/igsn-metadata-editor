<template>
  <InputGroup :label="label" :class="[errored ? 'error' : '']">
    <div class="flex">
      <input
        :value="value"
        :placeholder="placeholderValue"
        v-on:input="updateValue($event.target.value)"
        :required="required"
      />
      <button v-if="removable" class="btn btn-red text-xs ml-2" @click.prevent="remove">Remove</button>
    </div>
    <span v-if="errored" v-text="validationTextValue"></span>
  </InputGroup>
</template>

<script>
import InputGroup from "@/components/forms/InputGroup";

export default {
  name: "InputGroupText",
  components: { InputGroup },
  props: {
    label: String,
    value: String,
    placeholder: String,
    validationText: String,
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
      this.$emit("input", value)
    },
    remove() {
      this.$emit("remove", this.$refs);
    }
  },
  computed: {
    placeholderValue() {
      return this.placeholder ? this.placeholder : this.label;
    },
    validationTextValue() {
      return this.validationText
        ? this.validationText
        : "This field is required";
    },
    errored() {
      return this.required && (this.value == undefined || this.value == "");
    }
  }
};
</script>