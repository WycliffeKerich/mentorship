<template>
  <v-card class="neu-glow">
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6">Mentees</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end">
        <v-btn icon class="neu-glow" @click="displayAddMenteeDialog()">
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
      <v-data-table :headers="headers1" :items="mentees" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="ma-2"
            tile
            outlined
            color="success"
            @click.prevent="editMentee(item)"
          >
            <v-icon left>mdi-pencil</v-icon> Edit
          </v-btn>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red"
            @click.prevent="displayDeleteMenteeDialog(item)"
          >
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- Add New Mentee Dialog -->
    <v-dialog v-model="displayAddMentee" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Add a New Mentee</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeAddMentee()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="newMenteeCode" label="Mentee Code" />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="newMenteePrimaryFacility"
                    :items="getFacilities"
                    item-text="name"
                    item-value="id"
                    label="Primary Facility"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="newMenteeMentorshipFacility"
                    :items="getFacilities"
                    item-text="name"
                    item-value="id"
                    label="Mentorship Facility"
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
            @click="createNewMentee()"
          >
            Add New Mentee
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit County Dialog -->
    <v-dialog v-model="displayEditMentee" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Edit Mentee</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeEditMentee()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="selectedMentee.menteeCode"
                    label="Mentee Code"
                    :disabled="disableContent"
                  />
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="selectedMentee.primaryFacilityId"
                    :items="getFacilities"
                    item-text="name"
                    item-value="id"
                    label="Primary Facility"
                    :disabled="disableContent"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="selectedMentee.mentorshipFacilityId"
                    :items="getFacilities"
                    item-text="name"
                    item-value="id"
                    label="Mentorship Facility"
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
            @click="updateMentee()"
          >
            Update Mentee
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete County Dialog -->
    <v-dialog v-model="displayDeleteMentee" persistent max-width="450">
      <v-card>
        <v-card-title>
          <span class="headline">Delete {{ selectedMentee.menteeCode }}?</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeDeleteMenteeDialog()">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text
          >If you wish to proceed DELETE the selected mentee, click the
          <span>DELETE</span> button. Click <span>CANCEL</span> if you do not
          wish to proceed.</v-card-text
        >
        <v-card-actions>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red darken-1"
            @click.prevent="deleteMentee(selectedMentee.id)"
            ><v-icon left>mdi-delete</v-icon> Delete</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            @click="closeDeleteMenteeDialog()"
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
      displayAddMentee: false,
      newMenteeCode: null,
      newMenteePrimaryFacility: null,
      newMenteeMentorshipFacility: null,

      // Editing County
      disableContent: true,
      displayEditMentee: false,
      selectedMentee: {},

      // Deleting county
      displayDeleteMentee: false,

      search: '',
      headers1: [
        {
          text: 'Mentee Id',
          value: 'menteeCode'
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
          text: 'Mentorship Facility',
          value: 'mentorshipFacility'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'center'
        }
      ],
      mentees: []
    }
  },
  created() {
    this.loadMentees()
  },
  methods: {
    ...mapActions('subcounty', ['createSubCounty']),

    // Some helpers

    // End of helpers

    editMentee(mentee) {
      this.$store.dispatch('facility/getFacilities').then(() => {
        this.selectedMentee = mentee
        this.displayEditMentee = true
      })
    },
    updateMentee() {
      const menteeDetails = {
        name: this.selectedMentee.name,
        menteeCode: this.selectedMentee.menteeCode,
        facilityId: this.selectedMentee.facilityId,
        id: this.selectedMentee.id
      }

      this.$store.dispatch('mentee/updateMentee', menteeDetails).then(() => {
        const menteeUpdateSuccess = this.getUpdateMenteeSuccess
        if (menteeUpdateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Mentee was updated successfully!'
          // Reset selected subcounty
          this.selectedMentee = {}
          // Close update Mentee dialog disable content
          this.displayEditMentee = false
          this.disableContent = true

          //Reset mentees
          this.mentees = []

          // Reload mentees
          this.loadMentees()

          //  Reset updateCountySuccess in the store
          this.$store.dispatch('mentee/resetUpdateMenteeSuccess')
        } else if (menteeUpdateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Mentee could not be updated! Please try again.'

          // Reset UpdateMentee dialog
          this.selectedMentee = {}
          // Close update county dialog and disable content
          this.displayEditMentee = false
          this.disableContent = true
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    deleteMentee(menteeId) {
      this.$store.dispatch('mentee/deleteMentee', menteeId).then(() => {
        const menteeDeleteSuccess = this.getDeleteMenteeSuccess
        if (menteeDeleteSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Mentee was deteted successfully!'
          // Reset selected subcounty
          this.selectedMentee = {}
          // Close delete subcounty dialog disable content
          this.displayDeleteMentee = false

          //Reset mentees
          this.mentees = []

          // Reload mentee
          this.loadMentees()

          //  Reset updateMenteeSuccess in the store
          this.$store.dispatch('mentee/resetDeleteMenteeSuccess')
        } else if (menteeDeleteSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Mentee could not be deleted! Please try again.'

          // Reset SelectedSubCounty
          this.selectedMentee = {}
          // Close update subcounty dialog and disable content
          this.displayDeleteMentee = false
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    createNewMentee() {
      const mentee = {
        menteeCode: this.newMenteeCode,
        primaryFacilityId: this.newMenteePrimaryFacility,
        mentorshipFacilityId: this.newMenteePrimaryFacility
      }
      this.$store.dispatch('mentee/createMentee', mentee).then(() => {
        const menteeCreateSuccess = this.getCreateMenteeSuccess
        if (menteeCreateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage =
            'Mentee was added to the database successfully!'
          // Reset create Mentee form
          this.newMenteeCode = null
          this.newMenteePrimaryFacility = null
          this.newMenteeMentorshipFacility = null
          // Close create Mentee dialog
          this.displayAddMentee = false

          //Reset mentees
          this.mentees = []

          // Reload mentees
          this.loadMentees()

          //  Reset createCountySuccess in the store
          this.$store.dispatch('mentee/resetCreateMenteeSuccess')
        } else if (menteeCreateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Mentee could not be added to the database successfully! Please try again.'

          // Reset create county form
          this.newMenteeCode = null
          this.newMenteePrimaryFacility = null
          this.newMenteeMentorshipFacility = null
          // Close create subcounty dialog
          this.displayAddMentee = false
        }
        // Reset snackbar
        this.resetSnackBar()
      })
    },
    closeEditMentee() {
      // Reset Edit Mentee form
      this.selectedMentee = {}
      this.displayEditMentee = false
      this.disableContent = true
    },
    displayAddMenteeDialog() {
      this.$store.dispatch('facility/getFacilities').then(() => {
        this.displayAddMentee = true
      })
    },
    closeAddMentee() {
      // Reset create sub county form
      this.newMenteeCode = null
      this.newMenteePrimaryFacility = null
      this.newMenteeMentorshipFacility = null
      this.displayAddMentee = false
    },
    displayDeleteMenteeDialog(mentee) {
      this.displayDeleteMentee = true
      this.selectedMentee = mentee
    },
    closeDeleteMenteeDialog() {
      this.selectedMentee = {}
      this.displayDeleteMentee = false
    },
    resetSnackBar() {
      setTimeout(() => {
        this.displaySnackBar = false
        this.snackBarColor = null
        this.snackBarMessage = null
      }, 2000)
    },
    loadMentees() {
      this.$store.dispatch('mentee/getMentees').then(() => {
        let unparsedMentees = this.getMentees
        for (let index = 0; index < unparsedMentees.length; index++) {
          const element = unparsedMentees[index]
          const mentee = {
            menteeCode: element.menteeCode,
            id: element.id,
            primaryFacilityId: element.primaryFacilityId,
            mentorshipFacilityId: element.mentorshipFacilityId,
            primaryFacility: element.primaryFacility.name,
            mentorshipFacility: element.mentorshipFacility.name,
            county: element.primaryFacility.subcounty.county.name
          }
          this.mentees.push(mentee)
        }
      })
    }
  },
  computed: {
    ...mapGetters('mentee', [
      'getMentees',
      'getCreateMenteeSuccess',
      'getUpdateMenteeSuccess',
      'getDeleteMenteeSuccess'
    ]),
    ...mapGetters('facility', ['getFacilities']),
    ...mapGetters('county', ['getCounties'])
  }
}
</script>
