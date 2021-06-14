<template>
  <v-card class="neu-glow">
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6">Sessions</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end">
        <v-btn icon class="neu-glow" @click="displayAddSessionDialog()">
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
      <v-data-table :headers="headers1" :items="sessions" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="ma-2"
            tile
            outlined
            color="success"
            @click.prevent="editSession(item)"
          >
            <v-icon left>mdi-pencil</v-icon> Edit
          </v-btn>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red"
            @click.prevent="displayDeleteSessionDialog(item)"
          >
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- Add New SubCounty Dialog -->
    <v-dialog v-model="displayAddSession" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Add a New Session</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeAddSession()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="5">
                  <v-select
                    v-model="newSessionMenteeId"
                    label="Mentee Code"
                    :items="getMentees"
                    item-text="menteeCode"
                    item-value="id"
                    @change="loadSignalFunctions"
                  />
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="newSessionSignalFunctionId"
                    label="Signal Function"
                    :items="filteredSignalFunctions"
                    item-text="name"
                    item-value="id"
                    :disabled="disableCreateSessionContent"
                  />
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="newSessionMentorId"
                    label="Mentor Name"
                    :items="getMentors"
                    item-text="name"
                    item-value="id"
                    :disabled="disableCreateSessionContent"
                  />
                </v-col>

                <v-col cols="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="newSessionDate"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="newSessionDate"
                        label="Session Date"
                        prepend-icon="event"
                        readonly
                        :disabled="disableCreateSessionContent"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="newSessionDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(newSessionDate)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="8">
                  <v-select
                    v-model="newSessionFacilityId"
                    :items="getFacilities"
                    label="Session Facility"
                    item-text="name"
                    item-value="id"
                    :disabled="disableCreateSessionContent"
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
            @click="createNewSession()"
          >
            Add New Session
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Session Dialog -->
    <v-dialog v-model="displayEditSession" max-width="600" persistent>
      <v-card class="text-center">
        <v-card-title>
          <span class="headline">Edit Session</span>

          <v-spacer />

          <v-icon aria-label="Close" @click="closeEditSession()">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="selectedSession.menteeCode"
                    label="Mentee Code"
                    disabled
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="selectedSession.signalFunction"
                    label="Signal Function"
                    disabled
                  />
                </v-col>

                <v-col cols="4">
                  <v-menu
                    ref="editMenu"
                    v-model="editMenu"
                    :close-on-content-click="false"
                    :return-value.sync="selectedSession.sessionDate"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="selectedSession.sessionDate"
                        label="Session Date"
                        prepend-icon="event"
                        readonly
                        :disabled="disableContent"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="selectedSession.sessionDate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="editMenu = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.editMenu.save(selectedSession.sessionDate)
                        "
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="selectedSession.mentorId"
                    :items="getMentors"
                    label="Mentor Name"
                    item-text="name"
                    item-value="id"
                    :disabled="disableContent"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="selectedSession.facilityId"
                    :items="getFacilities"
                    label="Mentorship Facility"
                    item-text="name"
                    item-value="id"
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
            @click="updateSession()"
          >
            Update Session
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete County Dialog -->
    <v-dialog v-model="displayDeleteSession" persistent max-width="600">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Delete {{ selectedSession.menteeCode }}'s
            {{ selectedSession.signalFunctionCode }} session?</span
          >

          <v-spacer />

          <v-icon aria-label="Close" @click="closeDeleteSessionDialog()">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text
          >If you wish to proceed DELETE the selected session, click the
          <span>DELETE</span> button. Click <span>CANCEL</span> if you do not
          wish to proceed.</v-card-text
        >
        <v-card-actions>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="red darken-1"
            @click.prevent="deleteSession(selectedSession.id)"
            ><v-icon left>mdi-delete</v-icon> Delete</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="green darken-1"
            @click="closeDeleteSessionDialog()"
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

      // New Session
      newSessionDate: new Date().toISOString().substr(0, 10),
      newSessionMenteeId: null,
      newSessionMentorId: null,
      newSessionFacilityId: null,
      newSessionSignalFunctionId: null,
      menu: false,
      displayAddSession: false,
      disableCreateSessionContent: true,

      filteredSignalFunctions: [],

      // Session Levels
      sessionLevels: ['1', '2', '3', '4', '5'],

      // Editing Session
      disableContent: true,
      displayEditSession: false,
      selectedSession: {},
      selectedSubCounty: {},
      editMenu: false,

      // Deleting Session
      displayDeleteSession: false,

      search: '',
      headers1: [
        {
          text: 'Session Date',
          value: 'sessionDate'
        },
        {
          text: 'Mentee',
          align: 'start',
          value: 'menteeCode'
        },
        {
          text: 'Mentor',
          value: 'mentorName'
        },
        {
          text: 'Signal Function',
          value: 'signalFunction'
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
      sessions: []
    }
  },
  created() {
    this.loadSessions()
  },
  methods: {
    ...mapActions('subcounty', ['createSubCounty']),

    // Some helpers

    // End of helpers

    editSession(session) {
      // this.$store.dispatch('subcounty/getSubCounties').then(() => {
      //   this.selectedSession = session
      //   this.displayEditSession = true
      // })
      this.selectedSession = session
      this.displayEditSession = true

      this.$store.dispatch('mentor/getMentors')
      this.$store.dispatch('facility/getFacilities')
    },
    updateSession() {
      const session = {
        sessionDate: this.selectedSession.sessionDate,
        menteeId: this.selectedSession.menteeId,
        mentorId: this.selectedSession.mentorId,
        facilityId: this.selectedSession.facilityId,
        signalFunctionId: this.selectedSession.signalFunctionId,
        id: this.selectedSession.id
      }

      this.$store.dispatch('session/updateSession', session).then(() => {
        const sessionUpdateSuccess = this.getUpdateSessionSuccess
        if (sessionUpdateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Session was updated successfully!'
          // Reset selected subcounty
          this.selectedSession = {}
          // Close update session dialog disable content
          this.displayEditSession = false
          this.disableContent = true

          //Reset sessions
          this.sessions = []

          // Reload subcounties
          this.loadSessions()

          //  Reset updateCountySuccess in the store
          this.$store.dispatch('session/resetUpdateSessionSuccess')
        } else if (sessionUpdateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Session could not be updated! Please try again.'

          // Reset UpdateCounty dialog
          this.selectedSession = {}
          // Close update county dialog and disable content
          this.displayEditSession = false
          this.disableContent = true
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    deleteSession(sessionId) {
      this.$store.dispatch('session/deleteSession', sessionId).then(() => {
        const sessionDeleteSuccess = this.getDeleteSessionSuccess
        if (sessionDeleteSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage = 'Session was deteted successfully!'
          // Reset selected session
          this.selectedSession = {}
          // Close delete session dialog disable content
          this.displayDeleteSession = false

          //Reset sessions
          this.sessions = []

          // Reload sessions
          this.loadSessions()

          //  Reset updateSubCountySuccess in the store
          this.$store.dispatch('session/resetDeleteSessionSuccess')
        } else if (sessionDeleteSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Session could not be deleted! Please try again.'

          // Reset SelectedSession
          this.selectedSession = {}
          // Close update subcounty dialog and disable content
          this.displayDeleteSession = false
        }

        // reset snackbar
        this.resetSnackBar()
      })
    },
    createNewSession() {
      const session = {
        sessionDate: this.newSessionDate,
        menteeId: this.newSessionMenteeId,
        mentorId: this.newSessionMentorId,
        facilityId: this.newSessionFacilityId,
        signalFunctionId: this.newSessionSignalFunctionId
      }
      this.$store.dispatch('session/createSession', session).then(() => {
        const sessionCreateSuccess = this.getCreateSessionSuccess
        if (sessionCreateSuccess === true) {
          this.displaySnackBar = true
          this.snackBarColor = 'success'
          this.snackBarMessage =
            'Session was added to the database successfully!'
          // Reset create session form
          this.newSessionMenteeId = null
          this.newSessionMentorId = null
          this.newSessionSignalFunctionId = null
          this.newSessionFacilityId = null
          this.newSessionDate = new Date().toISOString().substr(0, 10)

          // Close create session dialog
          this.displayAddSession = false

          this.disableCreateSessionContent = true

          this.filteredSignalFunctions = []

          //Reset counties
          this.sessions = []

          // Reload counties
          this.loadSessions()

          //  Reset createCountySuccess in the store
          this.$store.dispatch('session/resetCreateSessionSuccess')
          this.$store.dispatch('session/resetSpecificSessions')
        } else if (sessionCreateSuccess === false) {
          this.displaySnackBar = true
          this.snackBarColor = 'red'
          this.snackBarMessage =
            'Session could not be added to the database successfully! Please try again.'

          // Reset create session form
          this.newSessionMenteeId = null
          this.newSessionMentorId = null
          this.newSessionSignalFunctionId = null
          this.newSessionFacilityId = null
          this.newSessionDate = new Date().toISOString().substr(0, 10)
          // Close create session dialog
          this.displayAddSession = false
        }
        // Reset snackbar
        this.resetSnackBar()
      })
    },
    closeEditSession() {
      // Reset Edit County form
      this.selectedSession = {}
      this.displayEditSession = false
      this.disableContent = true
    },
    displayAddSessionDialog() {
      this.$store.dispatch('mentee/getMentees').then(() => {
        this.displayAddSession = true
      })
      this.$store.dispatch('mentor/getMentors')
      this.$store.dispatch('facility/getFacilities')
    },
    loadSignalFunctions() {
      this.filteredSignalFunctions = []
      this.$store.dispatch('session/resetSpecificSessions')
      this.$store.dispatch('signalfunction/getSignalFunctions').then(() => {
        this.$store
          .dispatch('session/getSpecificSessions', this.newSessionMenteeId)
          .then(() => {
            let signalFunctions = this.getSignalFunctions

            let specificSessions = this.getSpecificSessions

            if (
              Object.keys(specificSessions).length === 0 &&
              specificSessions.constructor === Object
            ) {
              this.filteredSignalFunctions = signalFunctions

              this.disableCreateSessionContent = false
            } else {
              const signalFunctionSessiond = []
              specificSessions.forEach((element) => {
                signalFunctionSessiond.push(element.signalFunctionId)
              })

              for (var i = 0; i < signalFunctionSessiond.length; i++) {
                for (let k = 0; k < signalFunctions.length; k++) {
                  if (signalFunctions[k].id === signalFunctionSessiond[i]) {
                    signalFunctions.splice(k, 1)
                  }
                }
              }

              // Do an alert
              if (signalFunctions.length === 0) {
                alert(
                  'This mentee has sessions attached to all the signal functions'
                )
                this.newSessionMenteeId = null
              } else {
                this.filteredSignalFunctions = signalFunctions

                this.disableCreateSessionContent = false
              }
            }
          })
      })
    },
    closeAddSession() {
      // Reset create session form
      this.newSessionMenteeId = null
      this.newSessionMentorId = null
      this.newSessionSignalFunctionId = null
      this.newSessionFacilityId = null
      this.newSessionDate = new Date().toISOString().substr(0, 10)

      this.displayAddSession = false
      this.disableCreateSessionContent = true
      this.filteredSignalFunctions = []
    },
    displayDeleteSessionDialog(session) {
      this.displayDeleteSession = true
      this.selectedSession = session
    },
    closeDeleteSessionDialog() {
      this.selectedSession = {}
      this.displayDeleteSession = false
    },
    resetSnackBar() {
      setTimeout(() => {
        this.displaySnackBar = false
        this.snackBarColor = null
        this.snackBarMessage = null
      }, 2000)
    },
    loadSessions() {
      this.$store.dispatch('session/getSessions').then(() => {
        let sessions = this.getSessions
        console.log(sessions)
        for (let index = 0; index < sessions.length; index++) {
          const element = sessions[index]
          const session = {
            sessionDate: element.sessionDate,
            menteeCode: element.mentee.menteeCode,
            menteeId: element.menteeId,
            signalFunction: element.signalFunction.name,
            signalFunctionId: element.signalFunctionId,
            mentorName: element.mentorsessions[0].mentor.name,
            mentorId: element.mentorId,
            mentorshipFacility: element.facilitysessions[0].facility.name,
            facilityId: element.facilityId,
            id: element.id
          }
          this.sessions.push(session)
        }
      })
    }
  },
  computed: {
    ...mapGetters('session', [
      'getSessions',
      'getSpecificSessions',
      'getCreateSessionSuccess',
      'getUpdateSessionSuccess',
      'getDeleteSessionSuccess'
    ]),
    ...mapGetters('signalfunction', ['getSignalFunctions']),
    ...mapGetters('mentee', ['getMentees']),
    ...mapGetters('mentor', ['getMentors']),
    ...mapGetters('facility', ['getFacilities'])
  }
}
</script>
