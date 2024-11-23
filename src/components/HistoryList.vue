<template>
  <template v-if="history.length > 0">
    <aside class="history-list">
        <ul>
          <li v-for="(item, index) in history" @click="() => emitLoadHistory(index)">
            <p>Sentence: {{ item.sentence }}</p>
            <p>Text: {{ item.text }}</p>
            <p>Full Word Search: {{  item.isFullWordSearch ? "Yes" : "No" }}</p>
            <p>Case Sensitive Search: {{  item.isCaseSensitive ? "Yes" : "No" }}</p>
            <p>Occurrence: {{ item.Occurrences }}</p>
          </li>
        </ul>
    </aside>
  </template>
  <template v-else>
    <aside>
      <h3>Empty search history</h3>
    </aside>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ["history"],
  methods: {
      emitLoadHistory(idx: number) {
        this.$emit("loadHistory", idx);
      }
    }

})

</script>

<style scoped>
</style>