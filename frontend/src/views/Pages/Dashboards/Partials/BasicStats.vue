<template>
  <v-row>
    <v-col cols="12" sm="6" lg="3">
      <basic-statistic
        title="Mentors"
        :heading="countiesNumber"
        :avatar="{
          icon: 'map',
          style: {
            color: 'blue accent-3'
          },
          avatarStyle: { class: 'neu-glow', size: 50 }
        }"
      >
        <!-- <div class="my-2">
          <span>48K more to goal</span>
        </div>
        <v-progress-linear value="52" color="blue accent-3"></v-progress-linear> -->
      </basic-statistic>
    </v-col>

    <v-col cols="12" sm="6" lg="3">
      <basic-statistic
        title="Facilities"
        :heading="facilitiesNumber"
        :avatar="{
          icon: 'local_hospital',
          style: {
            color: 'pink lighten-1'
          },
          avatarStyle: { class: 'neu-glow', size: 50 }
        }"
      >
        <!-- <div class="my-2">
          <span>32 To goal</span>
        </div>
        <v-progress-linear
          value="78"
          color="pink lighten-1"
        ></v-progress-linear> -->
      </basic-statistic>
    </v-col>

    <v-col cols="12" sm="6" lg="3">
      <basic-statistic
        title="Mentors"
        :heading="mentorsNumber"
        :avatar="{
          icon: 'person',
          style: {
            color: 'cyan accent-3'
          },
          avatarStyle: { class: 'neu-glow', size: 50 }
        }"
      >
        <!-- <div class="my-2">
          <span>20K more to goal</span>
        </div>
        <v-progress-linear value="80" color="cyan accent-3"></v-progress-linear> -->
      </basic-statistic>
    </v-col>

    <v-col cols="12" sm="6" lg="3">
      <basic-statistic
        title="Mentees"
        :heading="menteesNumber"
        :avatar="{
          icon: 'person_outline',
          style: {
            color: 'green accent-3'
          },
          avatarStyle: { class: 'neu-glow', size: 50 }
        }"
      >
        <!-- <div class="my-2">
          <span>32K more to goal</span>
        </div>
        <v-progress-linear
          value="68"
          color="green accent-3"
        ></v-progress-linear> -->
      </basic-statistic>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
// import BasicStatistic from "@/components/UI/Widgets/Cards/Statistics/BasicStatistic";
import BasicStatistic from '@/components/UI/Widgets/Cards/Statistics/BasicStatistic'
export default {
  data() {
    return {
      counties: [],
      facilities: [],
      mentors: [],
      mentees: [],

      countiesNumber: null,
      facilitiesNumber: null,
      mentorsNumber: null,
      menteesNumber: null
    }
  },
  beforeCreate() {
    this.$store.dispatch('county/getCounties').then(() => {
      this.counties = this.getCounties
      this.countiesNumber = this.counties.length
    })
    this.$store.dispatch('facility/getFacilities').then(() => {
      this.facilities = this.getFacilities
      this.facilitiesNumber = this.facilities.length
    })
    this.$store.dispatch('mentor/getMentors').then(() => {
      this.mentors = this.getMentors
      this.mentorsNumber = this.mentors.length
    })
    this.$store.dispatch('mentee/getMentees').then(() => {
      this.mentees = this.getMentees
      this.menteesNumber = this.mentees.length
    })
  },
  mounted() {},
  computed: {
    ...mapGetters('signalfunction', ['getSignalFunctions']),
    ...mapGetters('mentee', ['getMentees']),
    ...mapGetters('county', ['getCounties']),
    ...mapGetters('mentor', ['getMentors']),
    ...mapGetters('facility', ['getFacilities'])
  },
  components: { BasicStatistic }
}
</script>
