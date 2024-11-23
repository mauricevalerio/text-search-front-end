<template>
  <form @submit.prevent="emitGetOccurrences">
    <div>
      <label for="sentence">Sentence</label>
      <textarea id="sentence" cols="30" rows="10" v-model="dataObject.sentence" required></textarea>
    </div>
  
    <div>
      <label for="text">Text to search</label>
      <input type="text" id="text" v-model="dataObject.text" required/>
    </div>

    <div>
      <input type="checkbox" id="isFullWordSearch" v-model="dataObject.isFullWordSearch" />
      <label for="isFullWordSearch">Full Word Search</label>
    </div>

    <div>
      <input type="checkbox" id="isCaseSensitive" v-model="dataObject.isCaseSensitive" />
      <label for="isCaseSensitive">Case Sensitive Search</label>
    </div>

    <span class="error-msg">{{ errorMessage }}</span>

    <button>Search</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: [ "dataObject",  "errorMessage" ],
    methods: {
      emitGetOccurrences() {
        this.$emit("getOccurrences");
      }
    }
})
</script>


<style scoped>
</style>