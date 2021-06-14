<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <mentees-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import MenteesTable from './Partials/MenteesTable'
export default {
  components: {
    MenteesTable
  }
}
</script>
