<template>
  <v-card class="neu-glow">
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6">Counties</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end">
        <v-btn icon class="neu-glow" @click="displayAddCounty = true">
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
      <v-data-table :headers="headers1" :items="counties" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="ma-2"
            tile
            outlined
            color="success"
            @click.prevent="editCounty(item)"
          >
            <v-icon left>mdi-pencil</v-icon> Edit
          </v-btn>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red"
            @click.prevent="displayDeleteCountyDialog(item)"
          >
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- Add New County Dialog -->
    <v-dialog v-model="displayAddCounty" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Add a New County</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeAddCounty()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="newCountyName" label="Name" />
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="newCountyCode" label="County Code" />
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
            @click="createNewCounty()"
          >
            Add New County
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit County Dialog -->
    <v-dialog v-model="displayEditCounty" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Edit County</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeEditCounty()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="selectedCounty.name"
                    label="Name"
                    :disabled="disableContent"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="selectedCounty.countyCode"
                    label="County Code"
                    :disabled="disableContent"
                  />
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
            @click="updateCounty()"
          >
            Update County
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete County Dialog -->
    <v-dialog v-model="displayDeleteCounty" persistent max-width="450">
      <v-card>
        <v-card-title>
          <span class="headline">Delete {{ selectedCounty.name }}?</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeDeleteCountyDialog()">
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
            @click.prevent="deleteCounty(selectedCounty.id)"
            ><v-icon left>mdi-delete</v-icon> Delete</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            @click="closeDeleteCountyDialog()"
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
      displayAddCounty: false,
      newCountyName: null,
      newCountyCode: null,

      // Editing County
      disableContent: true,
      displayEditCounty: false,
      selectedCounty: {},

      // Deleting county
      displayDeleteCounty: false,

      search: '',
      headers1: [
        {
          text: 'Name',
          align: 'start',
          value: 'name'
        },
        {
          text: 'County Code',
          value: 'countyCode'
        },
        {
          text: 'Subcounties',
          value: 'subcounties'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'center'
        }
      ],
      counties: []
    }
  },
  created() {
    this.loadCounties()
  },
  methods: {
    ...mapActions('county', ['createCounty']),

    editCounty(county) {
      this.displayEditCounty = true
      this.selectedCounty = county
    },
    updateCounty() {
      const countyDetails = {
        name: this.selectedCounty.name,
        countyCode: this.selectedCounty.countyCode,
        id: this.selectedCounty.id
      }

      this.$store.dispatch('county/updateCounty', countyDetails).then(() => {
        const countyUpdateSuccess = this.getUpdateCountySuccess
        if (countyUpdateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'County was updated successfully!'
          // Reset selected county
          this.selectedCounty = {}
          // Close update county dialog disable content
          this.displayEditCounty = false
          this.disableContent = true

          //Reset counties
          this.counties = []

          // Reload counties
          this.loadCounties()

          //  Reset updateCountySuccess in the store
          this.$store.dispatch('county/resetUpdateCountySuccess')
        } else if (countyUpdateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'County could not be updated! Please try again.'

          // Reset UpdateCounty dialog
          this.selectedCounty = {}
          // Close update county dialog and disable content
          this.displayEditCounty = false
          this.disableContent = true
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    deleteCounty(countyId) {
      this.$store.dispatch('county/deleteCounty', countyId).then(() => {
        const countyDeleteSuccess = this.getDeleteCountySuccess
        if (countyDeleteSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'County was deteted successfully!'
          // Reset selected county
          this.selectedCounty = {}
          // Close delete county dialog disable content
          this.displayDeleteCounty = false

          //Reset counties
          this.counties = []

          // Reload counties
          this.loadCounties()

          //  Reset updateCountySuccess in the store
          this.$store.dispatch('county/resetDeleteCountySuccess')
        } else if (countyDeleteSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'County could not be deleted! Please try again.'

          // Reset SelectedCounty
          this.selectedCounty = {}
          // Close update county dialog and disable content
          this.displayDeleteCounty = false
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    createNewCounty() {
      const county = {
        name: this.newCountyName,
        countyCode: this.newCountyCode
      }
      this.$store.dispatch('county/createCounty', county).then(() => {
        const countyCreateSuccess = this.getCreateCountySuccess
        if (countyCreateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage =
            'County was added to the database successfully!'
          // Reset create county form
          this.newCountyCode = null
          this.newCountyName = null
          // Close create county dialog
          this.displayAddCounty = false

          //Reset counties
          this.counties = []

          // Reload counties
          this.loadCounties()

          //  Reset createCountySuccess in the store
          this.$store.dispatch('county/resetCreateCountySuccess')
        } else if (countyCreateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'County could not be added to the database successfully! Please try again.'

          // Reset create county form
          this.newCountyCode = null
          this.newCountyName = null
          // Close create county dialog
          this.displayAddCounty = false
        }
        // Reset snackbar
        this.resetSnackBar()
      })
    },
    closeAddCounty() {
      // Reset create county form
      this.newCountyCode = null
      this.newCountyName = null
      this.displayAddCounty = false
    },
    closeEditCounty() {
      // Reset Edit County form
      this.selectedCounty = {}
      this.displayEditCounty = false
      this.disableContent = true
    },
    displayDeleteCountyDialog(county) {
      this.displayDeleteCounty = true
      this.selectedCounty = county
    },
    closeDeleteCountyDialog() {
      this.selectedCounty = {}
      this.displayDeleteCounty = false
    },
    resetSnackBar() {
      setTimeout(() => {
        this.displaySnackBar = false
        this.snackBarColor = null
        this.snackBarMessage = null
      }, 2000)
    },
    loadCounties() {
      this.$store.dispatch('county/getCounties').then(() => {
        let unparsedCounties = this.getCounties
        for (let index = 0; index < unparsedCounties.length; index++) {
          const element = unparsedCounties[index]
          let subcounties = element.subcounties
          let subcountynumber = subcounties.length
          const county = {
            name: element.name,
            countyCode: element.countyCode,
            subcounties: subcountynumber,
            id: element.id
          }
          this.counties.push(county)
        }
      })
    }
  },
  computed: {
    ...mapGetters('county', [
      'getCounties',
      'getCreateCountySuccess',
      'getUpdateCountySuccess',
      'getDeleteCountySuccess'
    ])
  }
}
</script>
