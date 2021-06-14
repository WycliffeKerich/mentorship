<template>
  <v-card class="neu-glow">
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6">Facilities</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end">
        <v-btn icon class="neu-glow" @click="displayAddFacilityDialog()">
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
      <v-data-table :headers="headers1" :items="facilities" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="ma-2"
            tile
            outlined
            color="success"
            @click.prevent="editFacility(item)"
          >
            <v-icon left>mdi-pencil</v-icon> Edit
          </v-btn>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red"
            @click.prevent="displayDeleteFacilityDialog(item)"
          >
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- Add New SubCounty Dialog -->
    <v-dialog v-model="displayAddFacility" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Add a New Facility</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeAddFacility()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newFacilityName"
                    label="Facility Name"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="newFacilityCode"
                    label="Facility Code"
                  />
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="newFacilityLevel"
                    :items="facilityLevels"
                    label="Facility Level"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="newFacilityOwnership"
                    :items="facilityOwnership"
                    label="Facility Ownership"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="newFacilitySubCounty"
                    :items="getSubCounties"
                    item-text="name"
                    item-value="id"
                    label="SubCounty Name"
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
            @click="createNewFacility()"
          >
            Add New Facility
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Facility Dialog -->
    <v-dialog v-model="displayEditFacility" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Edit Facility</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeEditFacility()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="selectedFacility.name"
                    label="Facility Name"
                    :disabled="disableContent"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="selectedFacility.facilityCode"
                    label="Facility Code"
                    :disabled="disableContent"
                  />
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="selectedFacility.facilityLevel"
                    :items="facilityLevels"
                    label="Facility Level"
                    :disabled="disableContent"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="selectedFacility.facilityOwnership"
                    :items="facilityOwnership"
                    label="Facility Ownership"
                    :disabled="disableContent"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="selectedFacility.subcountyId"
                    :items="getSubCounties"
                    item-text="name"
                    item-value="id"
                    label="SubCounty Name"
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
            @click="updateFacility()"
          >
            Update Facility
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete County Dialog -->
    <v-dialog v-model="displayDeleteFacility" persistent max-width="450">
      <v-card>
        <v-card-title>
          <span class="headline">Delete {{ selectedFacility.name }}?</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeDeleteFacilityDialog()">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text
          >If you wish to proceed DELETE the selected conference room, click the
          <span>DELETE</span> button. Click <span>CANCEL</span> if you do not
          wish to proceed.</v-card-text
        >
        <v-card-actions>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red darken-1"
            @click.prevent="deleteFacility(selectedFacility.id)"
            ><v-icon left>mdi-delete</v-icon> Delete</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            @click="closeDeleteFacilityDialog()"
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

      // New Facility
      displayAddFacility: false,
      newFacilityName: null,
      newFacilityCode: null,
      newFacilityLevel: null,
      newFacilityOwnership: null,
      newFacilitySubCounty: null,

      // Editing Facility
      disableContent: true,
      displayEditFacility: false,
      selectedFacility: {},
      selectedSubCounty: {},

      // Deleting Facility
      displayDeleteFacility: false,

      search: '',
      headers1: [
        {
          text: 'Name',
          align: 'start',
          value: 'name'
        },
        {
          text: 'Facility Code',
          value: 'facilityCode'
        },
        {
          text: 'Facility Ownership',
          value: 'facilityOwnership'
        },
        {
          text: 'Facility Level',
          value: 'facilityLevel'
        },
        {
          text: 'County',
          value: 'county'
        },
        {
          text: 'SubCounty',
          value: 'subcounty'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'center'
        }
      ],
      facilities: [],
      facilityLevels: ['Dispensary', 'Health Center', 'Hospital'],
      facilityOwnership: ['MOH', 'FBO', 'Private']
    }
  },
  created() {
    this.loadFacilities()
  },
  methods: {
    ...mapActions('subcounty', ['createSubCounty']),

    // Some helpers

    // End of helpers

    editFacility(facility) {
      this.$store.dispatch('subcounty/getSubCounties').then(() => {
        this.selectedFacility = facility
        this.displayEditFacility = true
      })
    },
    updateFacility() {
      const facility = {
        name: this.selectedFacility.name,
        facilityCode: this.selectedFacility.facilityCode,
        facilityOwnership: this.selectedFacility.facilityOwnership,
        facilityLevel: this.selectedFacility.facilityLevel,
        subcountyId: this.selectedFacility.subcountyId,
        id: this.selectedFacility.id
      }

      this.$store.dispatch('facility/updateFacility', facility).then(() => {
        const facilityUpdateSuccess = this.getUpdateFacilitySuccess
        if (facilityUpdateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Facility was updated successfully!'
          // Reset selected subcounty
          this.selectedFacility = {}
          // Close update facility dialog disable content
          this.displayEditFacility = false
          this.disableContent = true

          //Reset facilities
          this.facilities = []

          // Reload subcounties
          this.loadFacilities()

          //  Reset updateCountySuccess in the store
          this.$store.dispatch('facility/resetUpdateFacilitySuccess')
        } else if (facilityUpdateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Facility could not be updated! Please try again.'

          // Reset UpdateCounty dialog
          this.selectedFacility = {}
          // Close update county dialog and disable content
          this.displayEditFacility = false
          this.disableContent = true
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    deleteFacility(facilityId) {
      this.$store.dispatch('facility/deleteFacility', facilityId).then(() => {
        const facilityDeleteSuccess = this.getDeleteFacilitySuccess
        if (facilityDeleteSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Facility was deteted successfully!'
          // Reset selected facility
          this.selectedFacility = {}
          // Close delete facility dialog disable content
          this.displayDeleteFacility = false

          //Reset facilities
          this.facilities = []

          // Reload facilities
          this.loadFacilities()

          //  Reset updateSubCountySuccess in the store
          this.$store.dispatch('facility/resetDeleteFacilitySuccess')
        } else if (facilityDeleteSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Facility could not be deleted! Please try again.'

          // Reset SelectedFacility
          this.selectedFacility = {}
          // Close update subcounty dialog and disable content
          this.displayDeleteFacility = false
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    createNewFacility() {
      const facility = {
        name: this.newFacilityName,
        facilityCode: this.newFacilityCode,
        facilityOwnership: this.newFacilityOwnership,
        facilityLevel: this.newFacilityLevel,
        subcountyId: this.newFacilitySubCounty
      }
      this.$store.dispatch('facility/createFacility', facility).then(() => {
        const facilityCreateSuccess = this.getCreateFacilitySuccess
        if (facilityCreateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage =
            'Facility was added to the database successfully!'
          // Reset create facility form
          this.newFacilityName = null
          this.newFacilityCode = null
          this.newFacilityLevel = null
          this.newFacilityOwnership = null
          this.newFacilitySubCounty = null
          // Close create facility dialog
          this.displayAddFacility = false

          //Reset counties
          this.facilities = []

          // Reload counties
          this.loadFacilities()

          //  Reset createCountySuccess in the store
          this.$store.dispatch('facility/resetCreateSubFacilitySuccess')
        } else if (facilityCreateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Facility could not be added to the database successfully! Please try again.'

          // Reset create facility form
          this.newFacilityName = null
          this.newFacilityCode = null
          this.newFacilityLevel = null
          this.newFacilityOwnership = null
          this.newFacilitySubCounty = null
          // Close create facility dialog
          this.displayAddFacility = false
        }
        // Reset snackbar
        this.resetSnackBar()
      })
    },
    closeEditFacility() {
      // Reset Edit County form
      this.selectedFacility = {}
      this.displayEditFacility = false
      this.disableContent = true
    },
    displayAddFacilityDialog() {
      this.$store.dispatch('subcounty/getSubCounties').then(() => {
        this.displayAddFacility = true
      })
    },
    closeAddFacility() {
      // Reset create facility form
      this.newFacilityCode = null
      this.newFacilityName = null
      this.newFacilityLevel = null
      this.newFacilityOwnership = null
      this.newFacilitySubCounty = null
      this.displayAddFacility = false
    },
    displayDeleteFacilityDialog(facility) {
      this.displayDeleteFacility = true
      this.selectedFacility = facility
    },
    closeDeleteFacilityDialog() {
      this.selectedFacility = {}
      this.displayDeleteFacility = false
    },
    resetSnackBar() {
      setTimeout(() => {
        this.displaySnackBar = false
        this.snackBarColor = null
        this.snackBarMessage = null
      }, 2000)
    },
    loadFacilities() {
      this.$store.dispatch('facility/getFacilities').then(() => {
        let unparsedFacilities = this.getFacilities
        for (let index = 0; index < unparsedFacilities.length; index++) {
          const element = unparsedFacilities[index]
          const facility = {
            name: element.name,
            facilityCode: element.facilityCode,
            facilityLevel: element.facilityLevel,
            facilityOwnership: element.facilityOwnership,
            id: element.id,
            subcountyId: element.subcountyId,
            subcounty: element.subcounty.name,
            county: element.subcounty.county.name
          }
          this.facilities.push(facility)
        }
      })
    }
  },
  computed: {
    ...mapGetters('facility', [
      'getFacilities',
      'getCreateFacilitySuccess',
      'getUpdateFacilitySuccess',
      'getDeleteFacilitySuccess'
    ]),
    ...mapGetters('county', ['getCounties']),
    ...mapGetters('subcounty', ['getSubCounties'])
  }
}
</script>
