<template>
  <div>
    <v-checkbox
      :color="color"
      :value="value"
      :hide-details="hideDetails"
      :style="`font-size: ${fontSize}`"
    >
    <template v-slot:label>
            <div :class="`text-${size}`">{{ label }}</div></template
          >
  </v-checkbox>
    
  </div>
</template>

<script setup>
  const props = defineProps ({
    label: String, // 라벨 텍스트
    color: String, // 색상
    value: String, // 값
    hideDetails: Boolean, // 세부 정보 숨김 여부
    size: String,
  })

  let fontSize = '16px'
  if (props.size === 'sm') {
    fontSize = '14px'
  }
  else if (props.size === 'lg') {
    fontSize = '18px'
  }
  else if (props.size === 'xl') {
    fontSize = '20px'
  }
</script>

