<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <signal-functions-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import SignalFunctionsTable from './Partials/SignalFunctionsTable'
export default {
  components: {
    SignalFunctionsTable
  }
}
</script>
