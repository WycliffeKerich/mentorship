<template>
  <v-card class="neu-glow">
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6">Mentors</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end">
        <v-btn icon class="neu-glow" @click="displayAddMentorDialog()">
          <v-icon color="secondary">add</v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-card-text class="pt-0">
      <!-- v-data-table -->
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table :headers="headers1" :items="mentors" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="ma-2"
            tile
            outlined
            color="success"
            @click.prevent="editMentor(item)"
          >
            <v-icon left>mdi-pencil</v-icon> Edit
          </v-btn>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red"
            @click.prevent="displayDeleteMentorDialog(item)"
          >
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- Add New Mentor Dialog -->
    <v-dialog v-model="displayAddMentor" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Add a New Mentor</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeAddMentor()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="9">
                  <v-text-field v-model="newMentorName" label="Mentor Name" />
                </v-col>

                <v-col cols="3">
                  <v-text-field v-model="newMentorCode" label="Mentor Code" />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="newMentorPrimaryFacility"
                    :items="getFacilities"
                    item-text="name"
                    item-value="id"
                    label="Primary Facility"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            @click="createNewMentor()"
          >
            Add New Mentor
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit County Dialog -->
    <v-dialog v-model="displayEditMentor" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Edit Mentor</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeEditMentor()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="9">
                  <v-text-field
                    v-model="selectedMentor.name"
                    label="Mentor Name"
                    :disabled="disableContent"
                  />
                </v-col>

                <v-col cols="3">
                  <v-text-field
                    v-model="selectedMentor.mentorCode"
                    label="Mentor Code"
                    :disabled="disableContent"
                  />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="selectedMentor.facilityId"
                    :items="getFacilities"
                    item-text="name"
                    item-value="id"
                    label="Primary Facility"
                    :disabled="disableContent"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            v-if="disableContent"
            @click="disableContent = !disableContent"
          >
            Edit
          </v-btn>
          <v-spacer />
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            v-if="!disableContent"
            @click="updateMentor()"
          >
            Update Mentor
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete County Dialog -->
    <v-dialog v-model="displayDeleteMentor" persistent max-width="450">
      <v-card>
        <v-card-title>
          <span class="headline">Delete {{ selectedMentor.name }}?</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeDeleteMentorDialog()">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text
          >If you wish to proceed DELETE the selected mentor, click the
          <span>DELETE</span> button. Click <span>CANCEL</span> if you do not
          wish to proceed.</v-card-text
        >
        <v-card-actions>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red darken-1"
            @click.prevent="deleteMentor(selectedMentor.id)"
            ><v-icon left>mdi-delete</v-icon> Delete</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            @click="closeDeleteMentorDialog()"
            ><v-icon left>mdi-cancel</v-icon> Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="snackBarTimeout"
      :value="true"
      absolute
      top
      :color="snackBarColor"
      outlined
    >
      {{ snackBarMessage }}
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      // Snackbar
      displaySnackBar: false,
      snackBarColor: null,
      snackBarMessage: null,
      snackBarTimeout: 2000,

      // New County
      displayAddMentor: false,
      newMentorName: null,
      newMentorCode: null,
      newMentorPrimaryFacility: null,

      // Editing County
      disableContent: true,
      displayEditMentor: false,
      selectedMentor: {},

      // Deleting county
      displayDeleteMentor: false,

      search: '',
      headers1: [
        {
          text: 'Name',
          align: 'start',
          value: 'name'
        },
        {
          text: 'Mentor Code',
          value: 'mentorCode'
        },
        {
          text: 'Primary Facility',
          value: 'primaryFacility'
        },
        {
          text: 'County',
          value: 'county'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'center'
        }
      ],
      mentors: [],
      subCounties: []
    }
  },
  created() {
    this.loadMentors()
  },
  methods: {
    ...mapActions('subcounty', ['createSubCounty']),

    // Some helpers

    // End of helpers

    editMentor(mentor) {
      this.$store.dispatch('facility/getFacilities').then(() => {
        this.selectedMentor = mentor
        this.displayEditMentor = true
      })
    },
    updateMentor() {
      const mentorDetails = {
        name: this.selectedMentor.name,
        mentorCode: this.selectedMentor.mentorCode,
        facilityId: this.selectedMentor.facilityId,
        id: this.selectedMentor.id
      }

      this.$store.dispatch('mentor/updateMentor', mentorDetails).then(() => {
        const mentorUpdateSuccess = this.getUpdateMentorSuccess
        if (mentorUpdateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Mentor was updated successfully!'
          // Reset selected subcounty
          this.selectedMentor = {}
          // Close update Mentor dialog disable content
          this.displayEditMentor = false
          this.disableContent = true

          //Reset mentors
          this.mentors = []

          // Reload mentors
          this.loadMentors()

          //  Reset updateCountySuccess in the store
          this.$store.dispatch('mentor/resetUpdateMentorSuccess')
        } else if (mentorUpdateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Mentor could not be updated! Please try again.'

          // Reset UpdateMentor dialog
          this.selectedMentor = {}
          // Close update county dialog and disable content
          this.displayEditMentor = false
          this.disableContent = true
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    deleteMentor(mentorId) {
      this.$store.dispatch('mentor/deleteMentor', mentorId).then(() => {
        const mentorDeleteSuccess = this.getDeleteMentorSuccess
        if (mentorDeleteSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Mentor was deteted successfully!'
          // Reset selected subcounty
          this.selectedMentor = {}
          // Close delete subcounty dialog disable content
          this.displayDeleteMentor = false

          //Reset mentors
          this.mentors = []

          // Reload mentor
          this.loadMentors()

          //  Reset updateMentorSuccess in the store
          this.$store.dispatch('mentor/resetDeleteMentorSuccess')
        } else if (mentorDeleteSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Mentor could not be deleted! Please try again.'

          // Reset SelectedSubCounty
          this.selectedMentor = {}
          // Close update subcounty dialog and disable content
          this.displayDeleteMentor = false
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    createNewMentor() {
      const mentor = {
        name: this.newMentorName,
        mentorCode: this.newMentorCode,
        facilityId: this.newMentorPrimaryFacility
      }
      this.$store.dispatch('mentor/createMentor', mentor).then(() => {
        const mentorCreateSuccess = this.getCreateMentorSuccess
        if (mentorCreateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage =
            'Mentor was added to the database successfully!'
          // Reset create Mentor form
          this.newMentorCode = null
          this.newMentorName = null
          this.newMentorPrimaryFacility = null
          // Close create Mentor dialog
          this.displayAddMentor = false

          //Reset mentors
          this.mentors = []

          // Reload mentors
          this.loadMentors()

          //  Reset createCountySuccess in the store
          this.$store.dispatch('mentor/resetCreateMentorSuccess')
        } else if (mentorCreateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Mentor could not be added to the database successfully! Please try again.'

          // Reset create county form
          this.newMentorCode = null
          this.newMentorName = null
          this.newMentorPrimaryFacility = null
          // Close create subcounty dialog
          this.displayAddMentor = false
        }
        // Reset snackbar
        this.resetSnackBar()
      })
    },
    closeEditMentor() {
      // Reset Edit Mentor form
      this.selectedMentor = {}
      this.displayEditMentor = false
      this.disableContent = true
    },
    displayAddMentorDialog() {
      this.$store.dispatch('facility/getFacilities').then(() => {
        this.displayAddMentor = true
      })
    },
    closeAddMentor() {
      // Reset create sub county form
      this.newMentorCode = null
      this.newMentoryName = null
      this.newMentorPrimaryFacility = null
      this.displayAddMentor = false
    },
    displayDeleteMentorDialog(mentor) {
      this.displayDeleteMentor = true
      this.selectedMentor = mentor
    },
    closeDeleteMentorDialog() {
      this.selectedMentor = {}
      this.displayDeleteMentor = false
    },
    resetSnackBar() {
      setTimeout(() => {
        this.displaySnackBar = false
        this.snackBarColor = null
        this.snackBarMessage = null
      }, 2000)
    },
    loadMentors() {
      this.$store.dispatch('mentor/getMentors').then(() => {
        let unparsedMentors = this.getMentors
        for (let index = 0; index < unparsedMentors.length; index++) {
          const element = unparsedMentors[index]
          const mentor = {
            name: element.name,
            mentorCode: element.mentorCode,
            id: element.id,
            facilityId: element.facilityId,
            primaryFacility: element.primaryFacility.name,
            county: element.primaryFacility.subcounty.county.name
          }
          this.mentors.push(mentor)
        }
      })
    }
  },
  computed: {
    ...mapGetters('mentor', [
      'getMentors',
      'getCreateMentorSuccess',
      'getUpdateMentorSuccess',
      'getDeleteMentorSuccess'
    ]),
    ...mapGetters('facility', ['getFacilities']),
    ...mapGetters('county', ['getCounties'])
  }
}
</script>
