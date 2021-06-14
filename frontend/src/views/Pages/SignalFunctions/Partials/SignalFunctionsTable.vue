<template>
  <v-card class="neu-glow">
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6">Signal Functions</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end">
        <v-btn icon class="neu-glow" @click="displayAddSignalFunction = true">
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
      <v-data-table
        :headers="headers1"
        :items="signalFunctions"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="ma-2"
            tile
            outlined
            color="success"
            @click.prevent="editSignalFunction(item)"
          >
            <v-icon left>mdi-pencil</v-icon> Edit
          </v-btn>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red"
            @click.prevent="displayDeleteSignalFunctionDialog(item)"
          >
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- Add New Signal Function Dialog -->
    <v-dialog v-model="displayAddSignalFunction" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Add a New Signal Function</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeAddSignalFunction()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="newSignalFunctionName"
                    label="Signal Function Name"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="newSignalFunctionCode"
                    label="Signal Function Code"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Signal Function Description"
                    v-model="newSignalFunctionDescription"
                  />
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
            @click="createNewSignalFunction()"
          >
            Add New Signal Function
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Signal Function Dialog -->
    <v-dialog v-model="displayEditSignalFunction" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Edit Signal Function</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeEditSignalFunction()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="selectedSignalFunction.name"
                    label="Name"
                    :disabled="disableContent"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="selectedSignalFunction.signalFunctionCode"
                    label="Signal Function Code"
                    :disabled="disableContent"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Signal Function Description"
                    v-model="selectedSignalFunction.signalFunctionDescription"
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
            @click="updateSignalFunction()"
          >
            Update Signal Function
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Signal Function Dialog -->
    <v-dialog v-model="displayDeleteSignalFunction" persistent max-width="450">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Delete {{ selectedSignalFunction.name }}?</span
          >

          <v-spacer />

          <v-icon aria-label="Close" @click="closeDeleteSignalFunctionDialog()">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text
          >If you wish to proceed DELETE the selected Signal Function, click the
          <span>DELETE</span> button. Click <span>CANCEL</span> if you do not
          wish to proceed.</v-card-text
        >
        <v-card-actions>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red darken-1"
            @click.prevent="deleteSignalFunction(selectedSignalFunction.id)"
            ><v-icon left>mdi-delete</v-icon> Delete</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            @click="closeDeleteSignalFunctionDialog()"
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      // Snackbar
      displaySnackBar: false,
      snackBarColor: null,
      snackBarMessage: null,
      snackBarTimeout: 2000,

      // New Signal Function
      displayAddSignalFunction: false,
      newSignalFunctionName: null,
      newSignalFunctionCode: null,
      newSignalFunctionDescription: null,

      // Editing County
      disableContent: true,
      displayEditSignalFunction: false,
      selectedSignalFunction: {},

      // Deleting county
      displayDeleteSignalFunction: false,

      search: '',
      headers1: [
        {
          text: 'Name',
          align: 'start',
          value: 'name'
        },
        {
          text: 'Signal Function Code',
          value: 'signalFunctionCode'
        },
        {
          text: 'Signal Function Description',
          value: 'signalFunctionDescription'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'center'
        }
      ],
      signalFunctions: []
    }
  },
  created() {
    this.loadSignalFunctions()
  },
  methods: {
    editSignalFunction(signalFunction) {
      this.displayEditSignalFunction = true
      this.selectedSignalFunction = signalFunction
    },
    updateSignalFunction() {
      const signalFunctionDetails = {
        name: this.selectedSignalFunction.name,
        signalFunctionCode: this.selectedSignalFunction.signalFunctionCode,
        signalFunctionDescription: this.selectedSignalFunction
          .signalFunctionDescription,
        id: this.selectedSignalFunction.id
      }

      this.$store
        .dispatch('signalfunction/updateSignalFunction', signalFunctionDetails)
        .then(() => {
          const signalFunctionUpdateSuccess = this
            .getUpdateSignalFunctionSuccess
          if (signalFunctionUpdateSuccess === true) {
            this.displaySnackBar = true
            this.snackBarColor = 'success'
            this.snackBarMessage = 'Signal Function was updated successfully!'
            // Reset selected Signal Function
            this.selectedSignalFunction = {}
            // Close update Signal Function dialog disable content
            this.displayEditSignalFunction = false
            this.disableContent = true

            //Reset counties
            this.signalFunctions = []

            // Reload counties
            this.loadSignalFunctions()

            //  Reset updateSignalFunctionSuccess in the store
            this.$store.dispatch(
              'signalfunction/resetUpdateSignalFunctionSuccess'
            )
          } else if (signalFunctionUpdateSuccess === false) {
            this.displaySnackBar = true
            this.snackBarColor = 'red'
            this.snackBarMessage =
              'Signal Function could not be updated! Please try again.'

            // Reset UpdateSignalFunction dialog
            this.selectedSignalFunction = {}
            // Close update Signal Function dialog and disable content
            this.displayEditSignalFunction = false
            this.disableContent = true
          }

          // reset snackbar
          this.resetSnackBar()
        })
    },
    deleteSignalFunction(signalFunctionId) {
      this.$store
        .dispatch('signalfunction/deleteSignalFunction', signalFunctionId)
        .then(() => {
          const signalFunctionDeleteSuccess = this
            .getDeleteSignalFunctionSuccess
          if (signalFunctionDeleteSuccess === true) {
            this.displaySnackBar = true
            this.snackBarColor = 'success'
            this.snackBarMessage = 'Signal Function was deteted successfully!'
            // Reset selected signal function
            this.selectedSignalFunction = {}
            // Close delete signal function dialog disable content
            this.displayDeleteSignalFunction = false

            //Reset signal functions
            this.signalFunctions = []

            // Reload signal functions
            this.loadSignalFunctions()

            //  Reset updateCountySuccess in the store
            this.$store.dispatch(
              'signalfunction/resetDeleteSignalFunctionSuccess'
            )
          } else if (signalFunctionDeleteSuccess === false) {
            this.displaySnackBar = true
            this.snackBarColor = 'red'
            this.snackBarMessage =
              'Signal Function could not be deleted! Please try again.'

            // Reset SelectedSignal Function
            this.selectedSignalFunction = {}
            // Close update county dialog and disable content
            this.displayDeleteSignalFunction = false
          }

          // reset snackbar
          this.resetSnackBar()
        })
    },
    createNewSignalFunction() {
      const signalFunction = {
        name: this.newSignalFunctionName,
        signalFunctionCode: this.newSignalFunctionCode,
        signalFunctionDescription: this.newSignalFunctionDescription
      }
      this.$store
        .dispatch('signalfunction/createSignalFunction', signalFunction)
        .then(() => {
          const signalFunctionCreateSuccess = this
            .getCreateSignalFunctionSuccess
          if (signalFunctionCreateSuccess === true) {
            this.displaySnackBar = true
            this.snackBarColor = 'success'
            this.snackBarMessage =
              'SignalFunction was added to the database successfully!'
            // Reset create Signal Function form
            this.newSignalFunctionCode = null
            this.newSignalFunctionName = null
            this.newSignalFunctionDescription = null
            // Close create Signal Function dialog
            this.displayAddSignalFunction = false

            //Reset signalf unctions
            this.signalFunctions = []

            // Reload signalFunctions
            this.loadSignalFunctions()

            //  Reset createSignalFunctionSuccess in the store
            this.$store.dispatch(
              'signalfunction/resetCreateSignalFunctionSuccess'
            )
          } else if (signalFunctionCreateSuccess === false) {
            this.displaySnackBar = true
            this.snackBarColor = 'red'
            this.snackBarMessage =
              'Signal Function could not be added to the database successfully! Please try again.'

            // Reset create Signal Function form
            this.newSignalFunctionCode = null
            this.newSignalFunctionName = null
            this.newSignalFunctionDescription = null
            // Close create Signal Function dialog
            this.displayAddSignalFunction = false
          }
          // Reset snackbar
          this.resetSnackBar()
        })
    },
    closeAddSignalFunction() {
      // Reset create county form
      this.newSignalFunctionCode = null
      this.newSignalFunctionName = null
      this.newSignalFunctionDescription = null
      this.displayAddSignalFunction = false
    },
    closeEditSignalFunction() {
      // Reset Edit Signal Function form
      this.selectedSignalFunction = {}
      this.displayEditSignalFunction = false
      this.disableContent = true
    },
    displayDeleteSignalFunctionDialog(signalFunction) {
      this.displayDeleteSignalFunction = true
      this.selectedSignalFunction = signalFunction
    },
    closeDeleteSignalFunctionDialog() {
      this.selectedSignalFunction = {}
      this.displayDeleteSignalFunction = false
    },
    resetSnackBar() {
      setTimeout(() => {
        this.displaySnackBar = false
        this.snackBarColor = null
        this.snackBarMessage = null
      }, 2000)
    },
    loadSignalFunctions() {
      this.$store.dispatch('signalfunction/getSignalFunctions').then(() => {
        let unparsedSignalFunctions = this.getSignalFunctions
        for (let index = 0; index < unparsedSignalFunctions.length; index++) {
          const element = unparsedSignalFunctions[index]
          const signalFunction = {
            name: element.name,
            signalFunctionCode: element.signalFunctionCode,
            signalFunctionDescription: element.signalFunctionDescription,
            id: element.id
          }
          this.signalFunctions.push(signalFunction)
        }
      })
    }
  },
  computed: {
    ...mapGetters('signalfunction', [
      'getSignalFunctions',
      'getCreateSignalFunctionSuccess',
      'getUpdateSignalFunctionSuccess',
      'getDeleteSignalFunctionSuccess'
    ])
  }
}
</script>
