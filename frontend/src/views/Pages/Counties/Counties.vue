<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <counties-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import CountiesTable from './Partials/CountiesTable'
export default {
  components: {
    CountiesTable
  }
}
</script>
