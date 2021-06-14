<template>
  <v-card class="neu-glow">
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6">Scores</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end">
        <v-btn icon class="neu-glow" @click="displayAddScoreDialog()">
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
      <v-data-table :headers="headers1" :items="scores" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="ma-2"
            tile
            outlined
            color="success"
            @click.prevent="editScore(item)"
          >
            <v-icon left>mdi-pencil</v-icon> Edit
          </v-btn>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red"
            @click.prevent="displayDeleteScoreDialog(item)"
          >
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- Add New SubCounty Dialog -->
    <v-dialog v-model="displayAddScore" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Add a New Score</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeAddScore()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="newScoreMenteeId"
                    label="Mentee Code"
                    :items="getMentees"
                    item-text="menteeCode"
                    item-value="id"
                    @change="loadSignalFunctions"
                  />
                </v-col>

                <v-col cols="6">
                  <v-select
                    v-model="newScoreSignalFunctionId"
                    label="Signal Function"
                    :items="filteredSignalFunctions"
                    item-text="name"
                    item-value="id"
                    :disabled="disableCreateScoreContent"
                  />
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="newScoreBaselineScore"
                    :items="scoreLevels"
                    label="Baseline Score"
                    :disabled="disableCreateScoreContent"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="newScoreMidlineScore"
                    :items="scoreLevels"
                    label="Midline Score"
                    :disabled="disableCreateScoreContent"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="newScoreEndlineScore"
                    :items="scoreLevels"
                    label="Endline Score"
                    :disabled="disableCreateScoreContent"
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
            @click="createNewScore()"
          >
            Add New Score
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Score Dialog -->
    <v-dialog v-model="displayEditScore" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Edit Score</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeEditScore()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="selectedScore.menteeCode"
                    label="Mentee Code"
                    disabled
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="selectedScore.signalFunctionCode"
                    label="Signal Function"
                    disabled
                  />
                </v-col>

                <v-col cols="4">
                  <v-select
                    v-model="selectedScore.baseline"
                    :items="scoreLevels"
                    label="Baseline Score"
                    :disabled="disableContent"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="selectedScore.midline"
                    :items="scoreLevels"
                    label="Midline Score"
                    :disabled="disableContent"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="selectedScore.endline"
                    :items="scoreLevels"
                    label="Endline Score"
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
            @click="updateScore()"
          >
            Update Score
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete County Dialog -->
    <v-dialog v-model="displayDeleteScore" persistent max-width="600">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Delete {{ selectedScore.menteeCode }}'s
            {{ selectedScore.signalFunctionCode }} score?</span
          >

          <v-spacer />

          <v-icon aria-label="Close" @click="closeDeleteScoreDialog()">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text
          >If you wish to proceed DELETE the selected score, click the
          <span>DELETE</span> button. Click <span>CANCEL</span> if you do not
          wish to proceed.</v-card-text
        >
        <v-card-actions>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red darken-1"
            @click.prevent="deleteScore(selectedScore.id)"
            ><v-icon left>mdi-delete</v-icon> Delete</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            @click="closeDeleteScoreDialog()"
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

      // New Score
      displayAddScore: false,
      newScoreMenteeId: null,
      newScoreSignalFunctionId: null,
      newScoreBaselineScore: null,
      newScoreMidlineScore: null,
      newScoreEndlineScore: null,
      disableCreateScoreContent: true,
      filteredSignalFunctions: [],

      // Score Levels
      scoreLevels: ['1', '2', '3', '4', '5'],

      // Editing Score
      disableContent: true,
      displayEditScore: false,
      selectedScore: {},
      selectedSubCounty: {},

      // Deleting Score
      displayDeleteScore: false,

      search: '',
      headers1: [
        {
          text: 'Mentee',
          align: 'start',
          value: 'menteeCode'
        },
        {
          text: 'Signal Function',
          value: 'signalFunctionCode'
        },
        {
          text: 'Baseline',
          value: 'baseline'
        },
        {
          text: 'Midline',
          value: 'midline'
        },
        {
          text: 'Endline',
          value: 'endline'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'center'
        }
      ],
      scores: []
    }
  },
  created() {
    this.loadScores()
  },
  methods: {
    ...mapActions('subcounty', ['createSubCounty']),

    // Some helpers

    // End of helpers

    editScore(score) {
      this.$store.dispatch('subcounty/getSubCounties').then(() => {
        this.selectedScore = score
        this.displayEditScore = true
      })
    },
    updateScore() {
      const score = {
        baseline: this.selectedScore.baseline,
        midline: this.selectedScore.midline,
        endline: this.selectedScore.endline,
        id: this.selectedScore.id
      }

      this.$store.dispatch('score/updateScore', score).then(() => {
        const scoreUpdateSuccess = this.getUpdateScoreSuccess
        if (scoreUpdateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Score was updated successfully!'
          // Reset selected subcounty
          this.selectedScore = {}
          // Close update score dialog disable content
          this.displayEditScore = false
          this.disableContent = true

          //Reset scores
          this.scores = []

          // Reload subcounties
          this.loadScores()

          //  Reset updateCountySuccess in the store
          this.$store.dispatch('score/resetUpdateScoreSuccess')
        } else if (scoreUpdateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage = 'Score could not be updated! Please try again.'

          // Reset UpdateCounty dialog
          this.selectedScore = {}
          // Close update county dialog and disable content
          this.displayEditScore = false
          this.disableContent = true
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    deleteScore(scoreId) {
      this.$store.dispatch('score/deleteScore', scoreId).then(() => {
        const scoreDeleteSuccess = this.getDeleteScoreSuccess
        if (scoreDeleteSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Score was deteted successfully!'
          // Reset selected score
          this.selectedScore = {}
          // Close delete score dialog disable content
          this.displayDeleteScore = false

          //Reset scores
          this.scores = []

          // Reload scores
          this.loadScores()

          //  Reset updateSubCountySuccess in the store
          this.$store.dispatch('score/resetDeleteScoreSuccess')
        } else if (scoreDeleteSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage = 'Score could not be deleted! Please try again.'

          // Reset SelectedScore
          this.selectedScore = {}
          // Close update subcounty dialog and disable content
          this.displayDeleteScore = false
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    createNewScore() {
      const score = {
        menteeId: this.newScoreMenteeId,
        signalFunctionId: this.newScoreSignalFunctionId,
        baseline: this.newScoreBaselineScore,
        midline: this.newScoreMidlineScore,
        endline: this.newScoreEndlineScore
      }
      this.$store.dispatch('score/createScore', score).then(() => {
        const scoreCreateSuccess = this.getCreateScoreSuccess
        if (scoreCreateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Score was added to the database successfully!'
          // Reset create score form
          this.newScoreMenteeId = null
          this.newScoreSignalFunctionId = null
          this.newScoreBaselineScore = null
          this.newScoreMidlineScore = null
          this.newScoreEndlineScore = null

          // Close create score dialog
          this.displayAddScore = false

          this.disableCreateScoreContent = true

          this.filteredSignalFunctions = []

          //Reset counties
          this.scores = []

          // Reload counties
          this.loadScores()

          //  Reset createCountySuccess in the store
          this.$store.dispatch('score/resetCreateScoreSuccess')
          this.$store.dispatch('score/resetSpecificScores')
        } else if (scoreCreateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Score could not be added to the database successfully! Please try again.'

          // Reset create score form
          this.newScoreMenteeId = null
          this.newScoreSignalFunctionId = null
          this.newScoreBaselineScore = null
          this.newScoreMidlineScore = null
          this.newScoreEndlineScore = null
          // Close create score dialog
          this.displayAddScore = false
        }
        // Reset snackbar
        this.resetSnackBar()
      })
    },
    closeEditScore() {
      // Reset Edit County form
      this.selectedScore = {}
      this.displayEditScore = false
      this.disableContent = true
    },
    displayAddScoreDialog() {
      this.$store.dispatch('mentee/getMentees').then(() => {
        this.displayAddScore = true
        // this.$store.dispatch('signalfunction/getSignalFunctions')
      })
    },
    loadSignalFunctions() {
      this.filteredSignalFunctions = []
      this.$store.dispatch('score/resetSpecificScores')
      this.$store.dispatch('signalfunction/getSignalFunctions').then(() => {
        this.$store
          .dispatch('score/getSpecificScores', this.newScoreMenteeId)
          .then(() => {
            let signalFunctions = this.getSignalFunctions

            let specificScores = this.getSpecificScores

            if (
              Object.keys(specificScores).length === 0 &&
              specificScores.constructor === Object
            ) {
              this.filteredSignalFunctions = signalFunctions

              this.disableCreateScoreContent = false
            } else {
              const signalFunctionScored = []
              specificScores.forEach((element) => {
                signalFunctionScored.push(element.signalFunctionId)
              })

              for (var i = 0; i < signalFunctionScored.length; i++) {
                for (let k = 0; k < signalFunctions.length; k++) {
                  if (signalFunctions[k].id === signalFunctionScored[i]) {
                    signalFunctions.splice(k, 1)
                  }
                }
              }

              // Do an alert
              if (signalFunctions.length === 0) {
                alert(
                  'This mentee has scores attached to all the signal functions'
                )
                this.newScoreMenteeId = null
              } else {
                this.filteredSignalFunctions = signalFunctions

                this.disableCreateScoreContent = false
              }
            }
          })
      })
    },
    closeAddScore() {
      // Reset create score form
      this.newScoreCode = null
      this.newScoreName = null
      this.newScoreLevel = null
      this.newScoreOwnership = null
      this.newScoreSubCounty = null
      this.displayAddScore = false

      this.displayAddScore = false
      this.disableCreateScoreContent = true
      this.filteredSignalFunctions = []
    },
    displayDeleteScoreDialog(score) {
      this.displayDeleteScore = true
      this.selectedScore = score
    },
    closeDeleteScoreDialog() {
      this.selectedScore = {}
      this.displayDeleteScore = false
    },
    resetSnackBar() {
      setTimeout(() => {
        this.displaySnackBar = false
        this.snackBarColor = null
        this.snackBarMessage = null
      }, 2000)
    },
    loadScores() {
      this.$store.dispatch('score/getScores').then(() => {
        let unparsedScores = this.getScores
        for (let index = 0; index < unparsedScores.length; index++) {
          const element = unparsedScores[index]
          const score = {
            menteeCode: element.mentee.menteeCode,
            signalFunctionCode: element.signalFunction.name,
            baseline: element.baseline,
            midline: element.midline,
            endline: element.endline,
            id: element.id,
            menteeId: element.menteeId,
            signalFunctionId: element.signalFunctionId
          }
          this.scores.push(score)
        }
      })
    }
  },
  computed: {
    ...mapGetters('score', [
      'getScores',
      'getSpecificScores',
      'getCreateScoreSuccess',
      'getUpdateScoreSuccess',
      'getDeleteScoreSuccess'
    ]),
    ...mapGetters('signalfunction', ['getSignalFunctions']),
    ...mapGetters('mentee', ['getMentees']),
    ...mapGetters('county', ['getCounties']),
    ...mapGetters('subcounty', ['getSubCounties'])
  }
}
</script>
