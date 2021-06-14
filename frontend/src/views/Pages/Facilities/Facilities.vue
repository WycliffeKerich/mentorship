<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <facilities-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import FacilitiesTable from './Partials/FacilitiesTable'
export default {
  components: {
    FacilitiesTable
  }
}
</script>
