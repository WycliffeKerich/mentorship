<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <scores-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ScoresTable from './Partials/ScoresTable'
export default {
  components: {
    ScoresTable
  }
}
</script>
