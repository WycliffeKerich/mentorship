<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <sub-counties-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import SubCountiesTable from './Partials/SubCountiesTable'
export default {
  components: {
    SubCountiesTable
  }
}
</script>
