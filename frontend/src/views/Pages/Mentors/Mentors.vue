<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <mentors-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import MentorsTable from './Partials/MentorsTable'
export default {
  components: {
    MentorsTable
  }
}
</script>
