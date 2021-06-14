<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <sessions-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import SessionsTable from './Partials/SessionsTable'
export default {
  components: {
    SessionsTable
  }
}
</script>
