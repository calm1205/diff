<script setup>
import RenderDiffLines from "@/components/renderDiffLines/RenderDiffLines.vue"
</script>

<template>
  <main class="container">
    <h1>diff</h1>
    <RenderDiffLines />
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
}
</style>
