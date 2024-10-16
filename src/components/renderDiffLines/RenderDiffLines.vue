<script setup lang="ts">
import { splitLinesGroup } from "@/src/script/parse-word-diff"
import { replaceAddition } from "./replaceAddition"
import { replaceDeletion } from "./replaceDeletion"

const hasModifiedWord = (line: string) => {
  if (line.includes(`{+`) || line.includes(`[-`)) return "hasChange"
  return ""
}

const { originalLines, modifiedLines } = splitLinesGroup
</script>

<template>
  <div v-for="(_, index) of originalLines" class="pare-lines">
    <p class="line original">
      <span class="index">{{ index }}</span>
      <span
        :class="hasModifiedWord(originalLines[index])"
        v-html="replaceDeletion(originalLines[index])"
      />
    </p>
    <p class="line modified">
      <span class="index">{{ index }}</span>
      <span
        :class="hasModifiedWord(modifiedLines[index])"
        v-html="replaceAddition(modifiedLines[index])"
      />
    </p>
  </div>
</template>

<style scoped>
.pare-lines {
  display: flex;
  gap: 20px;
}

.line {
  flex: 1;
  display: flex;
  align-items: top;
  gap: 5px;
}

.index {
  font-size: 10px;
  text-align: center;
  width: 20px;
}
.original :deep(.highlight) {
  background-color: rgb(255 175 184);
}
.modified :deep(.highlight) {
  background-color: rgb(155 239 184);
}
.original .hasChange {
  width: 100%;
  background-color: rgb(255 235 238);
}
.modified .hasChange {
  width: 100%;
  background-color: rgb(224 255 235);
}
</style>
