<template>
  <div class="vuse-content-wrapper">
    <v-container fluid>
      <basic-stats />

      <v-row>
        <enrollment-and-completion />
      </v-row>
      <v-row>
        <enrolment-per-facility />
      </v-row>
      <v-row>
        <mentee-progress-scores />
      </v-row>
      <v-row>
        <prioritized-skills />
      </v-row>
      <!-- <v-row>
        <sales-revenue />
        <ui-design />
      </v-row>
      <v-row>
        <v-col cols="12">
          <two-cols-stats />
        </v-col>
        <v-col cols="12">
          <project-table />
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>
<script>
import BasicStats from './Partials/BasicStats'
import EnrolmentPerFacility from './Partials/EnrolmentPerFacility'
import MenteeProgressScores from './Partials/MenteeProgressScores'
import EnrollmentAndCompletion from './Partials/EnrollmentAndCompletion'
import PrioritizedSkills from './Partials/PrioritizedSkills'
// import SalesRevenue from './Partials/SalesRevenue'
// import UiDesign from './Partials/UiDesign'
// import ProjectTable from './Partials/ProjectTable'
// import TwoColsStats from './Partials/TwoColsStats'
export default {
  components: {
    BasicStats,
    EnrolmentPerFacility,
    MenteeProgressScores,
    EnrollmentAndCompletion,
    PrioritizedSkills
    // SalesRevenue,
    // UiDesign,
    // ProjectTable,
    // TwoColsStats
  }
}
</script>

EnrolmentPerFacility
