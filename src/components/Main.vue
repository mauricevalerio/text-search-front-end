<template>
  
  <header>
    <h1>Text Search</h1>
  
    <p>This counts the number of occurrences of text found in the sentence.</p>
  </header>
  
  <main>
    <Form :dataObject="dataObject" @getOccurrences="getOccurrences" :errorMessage="errorMessage"></Form>

    <HistoryList :history="history" @loadHistory="loadHistory"></HistoryList>
  </main>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from './Form.vue';
import HistoryList from './HistoryList.vue';
import { textSearchApi } from '../utils/api';
import type { Data } from '@/types';

  export default defineComponent({
    components: { Form, HistoryList },
    data(): Data {
      return {
        dataObject: {
          sentence: "",
          text: "",
          isFullWordSearch: false,
          isCaseSensitive: false, 
        },
        errorMessage: "",
        textOccurrence: "",
        history: JSON.parse(localStorage.getItem("dataObject") || "[]")
      }
    },
    methods: {
      async getOccurrences() {
        try {
          const data = await textSearchApi(this.dataObject);
          
          this.textOccurrence = data.toString();

          this.getLocalStorageData();
          
          this.resetForm();

        } catch (err) {
            if (err instanceof Error) {
              this.errorMessage = `${err.message} - Unable to communicate with the web server API.`;
            } else {
              this.errorMessage = "An unknown error occurred.";
            }
        }
      },
      resetForm() {
        this.dataObject.sentence = "";
        this.dataObject.text = "";
        this.dataObject.isFullWordSearch = false;
        this.dataObject.isCaseSensitive = false;
        this.errorMessage = "";
      },
      getLocalStorageData() {
        if (localStorage.getItem("dataObject")) {
            localStorage.setItem("dataObject", JSON.stringify( 
              [ 
                {
                  ...this.dataObject, 
                  "Occurrences": this.textOccurrence 
                }, 
                ...JSON.parse(localStorage.getItem("dataObject")!)
              ]
            ));
          
          } else {
            localStorage.setItem("dataObject", JSON.stringify([{ ...this.dataObject, "Occurrences": this.textOccurrence }]));
          }
          
          this.history = JSON.parse(localStorage.getItem("dataObject")!)
      },
      loadHistory(idx: number) {
        const selectedHistory = this.history.find((_, index) => index === idx)!

        this.dataObject.sentence = selectedHistory.sentence
        this.dataObject.text = selectedHistory.text
        this.dataObject.isFullWordSearch = selectedHistory.isFullWordSearch
        this.dataObject.isCaseSensitive = selectedHistory.isCaseSensitive
      }
    }
  })

</script>

<style scoped>
</style>
