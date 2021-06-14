<template>
  <v-card class="neu-glow">
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6">SubCounties</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end">
        <v-btn icon class="neu-glow" @click="displayAddSubCountyDialog()">
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
      <v-data-table :headers="headers1" :items="subCounties" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="ma-2"
            tile
            outlined
            color="success"
            @click.prevent="editSubCounty(item)"
          >
            <v-icon left>mdi-pencil</v-icon> Edit
          </v-btn>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red"
            @click.prevent="displayDeleteSubCountyDialog(item)"
          >
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- Add New SubCounty Dialog -->
    <v-dialog v-model="displayAddSubCounty" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Add a New SubCounty</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeAddSubCounty()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newSubCountyName"
                    label="SubCounty Name"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="newSubCountyCode"
                    label="SubCounty Code"
                  />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="newSubCountyCounty"
                    :items="getCounties"
                    item-text="name"
                    item-value="id"
                    label="County Name"
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
            @click="createNewSubCounty()"
          >
            Add New SubCounty
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit County Dialog -->
    <v-dialog v-model="displayEditSubCounty" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Edit SubCounty</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeEditSubCounty()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="selectedSubCounty.name"
                    label="SubCounty Name"
                    :disabled="disableContent"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="selectedSubCounty.subCountyCode"
                    label="County Code"
                    :disabled="disableContent"
                  />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="selectedSubCounty.countyId"
                    :items="getCounties"
                    item-text="name"
                    item-value="id"
                    label="County Name"
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
            @click="updateSubCounty()"
          >
            Update SubCounty
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete County Dialog -->
    <v-dialog v-model="displayDeleteSubCounty" persistent max-width="450">
      <v-card>
        <v-card-title>
          <span class="headline">Delete {{ selectedSubCounty.name }}?</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeDeleteSubCountyDialog()">
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
            @click.prevent="deleteSubCounty(selectedSubCounty.id)"
            ><v-icon left>mdi-delete</v-icon> Delete</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            @click="closeDeleteSubCountyDialog()"
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
      displayAddSubCounty: false,
      newSubCountyName: null,
      newSubCountyCode: null,
      newSubCountyCounty: null,

      // Editing County
      disableContent: true,
      displayEditSubCounty: false,
      selectedSubCounty: {},

      // Deleting county
      displayDeleteSubCounty: false,

      search: '',
      headers1: [
        {
          text: 'Name',
          align: 'start',
          value: 'name'
        },
        {
          text: 'SubCounty Code',
          value: 'subCountyCode'
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
      subCounties: []
    }
  },
  created() {
    this.loadSubCounties()
  },
  methods: {
    ...mapActions('subcounty', ['createSubCounty']),

    // Some helpers

    // End of helpers

    editSubCounty(subCounty) {
      this.$store.dispatch('county/getCounties').then(() => {
        this.selectedSubCounty = subCounty
        this.selectedSubCountySubcounty = subCounty.county
        this.displayEditSubCounty = true
      })
    },
    updateSubCounty() {
      const subCountyDetails = {
        name: this.selectedSubCounty.name,
        subCountyCode: this.selectedSubCounty.subCountyCode,
        countyId: this.selectedSubCounty.countyId,
        id: this.selectedSubCounty.id
      }

      this.$store
        .dispatch('subcounty/updateSubCounty', subCountyDetails)
        .then(() => {
          const subCountyUpdateSuccess = this.getUpdateSubCountySuccess
          if (subCountyUpdateSuccess === true) {
            this.displaySnackBar = true
            this.snackBarColor = 'success'
            this.snackBarMessage = 'SubCounty was updated successfully!'
            // Reset selected subcounty
            this.selectedSubCounty = {}
            // Close update subcounty dialog disable content
            this.displayEditSubCounty = false
            this.disableContent = true

            //Reset subcounties
            this.subCounties = []

            // Reload subcounties
            this.loadSubCounties()

            //  Reset updateCountySuccess in the store
            this.$store.dispatch('subcounty/resetUpdateSubCountySuccess')
          } else if (subCountyUpdateSuccess === false) {
            this.displaySnackBar = true
            this.snackBarColor = 'red'
            this.snackBarMessage =
              'Sub County could not be updated! Please try again.'

            // Reset UpdateCounty dialog
            this.selectedSubCounty = {}
            // Close update county dialog and disable content
            this.displayEditSubCounty = false
            this.disableContent = true
          }

          // reset snackbar
          this.resetSnackBar()
        })
    },
    deleteSubCounty(subCountyId) {
      this.$store
        .dispatch('subcounty/deleteSubCounty', subCountyId)
        .then(() => {
          const subCountyDeleteSuccess = this.getDeleteSubCountySuccess
          if (subCountyDeleteSuccess === true) {
            this.displaySnackBar = true
            this.snackBarColor = 'success'
            this.snackBarMessage = 'SubCounty was deteted successfully!'
            // Reset selected subcounty
            this.selectedSubCounty = {}
            // Close delete subcounty dialog disable content
            this.displayDeleteSubCounty = false

            //Reset subcounties
            this.subCounties = []

            // Reload subcounties
            this.loadSubCounties()

            //  Reset updateSubCountySuccess in the store
            this.$store.dispatch('subcounty/resetDeleteSubCountySuccess')
          } else if (subCountyDeleteSuccess === false) {
            this.displaySnackBar = true
            this.snackBarColor = 'red'
            this.snackBarMessage =
              'Subounty could not be deleted! Please try again.'

            // Reset SelectedSubCounty
            this.selectedSubCounty = {}
            // Close update subcounty dialog and disable content
            this.displayDeleteSubCounty = false
          }

          // reset snackbar
          this.resetSnackBar()
        })
    },
    createNewSubCounty() {
      const subCounty = {
        name: this.newSubCountyName,
        subCountyCode: this.newSubCountyCode,
        countyId: this.newSubCountyCounty
      }
      this.$store.dispatch('subcounty/createSubCounty', subCounty).then(() => {
        const subCountyCreateSuccess = this.getCreateSubCountySuccess
        if (subCountyCreateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage =
            'SubCounty was added to the database successfully!'
          // Reset create subcounty form
          this.newSubCountyCode = null
          this.newSubCountyName = null
          this.newSubCountyCounty = null
          // Close create subcounty dialog
          this.displayAddSubCounty = false

          //Reset counties
          this.subCounties = []

          // Reload counties
          this.loadSubCounties()

          //  Reset createCountySuccess in the store
          this.$store.dispatch('subcounty/resetCreateSubCountySuccess')
        } else if (subCountyCreateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'County could not be added to the database successfully! Please try again.'

          // Reset create county form
          this.newSubCountyCode = null
          this.newSubCountyName = null
          this.newSubCountyCounty = null
          // Close create subcounty dialog
          this.displayAddSubCounty = false
        }
        // Reset snackbar
        this.resetSnackBar()
      })
    },
    closeEditSubCounty() {
      // Reset Edit County form
      this.selectedSubCounty = {}
      this.displayEditSubCounty = false
      this.disableContent = true
    },
    displayAddSubCountyDialog() {
      this.$store.dispatch('county/getCounties').then(() => {
        this.displayAddSubCounty = true
      })
    },
    closeAddSubCounty() {
      // Reset create sub county form
      this.newSubCountyCode = null
      this.newSubCountyName = null
      this.newSubCountyCounty = null
      this.displayAddSubCounty = false
    },
    displayDeleteSubCountyDialog(subCounty) {
      this.displayDeleteSubCounty = true
      this.selectedSubCounty = subCounty
    },
    closeDeleteSubCountyDialog() {
      this.selectedSubCounty = {}
      this.displayDeleteSubCounty = false
    },
    resetSnackBar() {
      setTimeout(() => {
        this.displaySnackBar = false
        this.snackBarColor = null
        this.snackBarMessage = null
      }, 2000)
    },
    loadSubCounties() {
      this.$store.dispatch('subcounty/getSubCounties').then(() => {
        let unparsedSubCounties = this.getSubCounties
        for (let index = 0; index < unparsedSubCounties.length; index++) {
          const element = unparsedSubCounties[index]
          const subCounty = {
            name: element.name,
            subCountyCode: element.subCountyCode,
            id: element.id,
            countyId: element.countyId,
            county: element.county.name
          }
          this.subCounties.push(subCounty)
        }
      })
    }
  },
  computed: {
    ...mapGetters('subcounty', [
      'getSubCounties',
      'getCreateSubCountySuccess',
      'getUpdateSubCountySuccess',
      'getDeleteSubCountySuccess'
    ]),
    ...mapGetters('county', ['getCounties'])
  }
}
</script>
