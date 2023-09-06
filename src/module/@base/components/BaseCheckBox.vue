<template>
  <div>
    <v-checkbox
      :modelValue="modelValue"
      @update:modelValue="emitUpdate"
      :label="label"
      :color="color"
      :value="value"
      :hide-details="hideDetails"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Boolean, // 체크 상태를 v-model로 받음
    label: String, // 라벨 텍스트
    color: String, // 색상
    value: String, // 값
    hideDetails: Boolean, // 세부 정보 숨김 여부
  },
  methods: {
    emitUpdate(value) {
      // 체크 상태가 변경될 때 이벤트를 상위 컴포넌트에 전달
      this.$emit('update:modelValue', value)
    },
  },
}
</script>
