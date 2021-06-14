<template>
  <v-col md="12">
    <v-card class="neu-glow">
      <v-row class="mx-0 pa-4" justify="space-between" align="center">
        <!-- title and subtitle -->
        <div>
          <div class="text-h5" align="center">
            Enrollment per Facilty Type and Level
          </div>
        </div>
      </v-row>
      <v-row>
        <v-col cols="4">
          <div>
            <div class="text-h6 text-center">
              Mentee Distribution per Facility Level
            </div>
          </div>
          <v-card-text class="py-0">
            <bar-chart
              :data="facilityLevelData"
              :options="option"
              :style="{ height: '402px' }"
            />
          </v-card-text>
        </v-col>
        <v-col cols="4">
          <div>
            <div class="text-h6 text-center">
              Mentee Distribution per Facility Type
            </div>
          </div>
          <v-card-text class="py-0">
            <bar-chart
              :data="facilityTypeData"
              :options="option"
              :style="{ height: '402px' }"
            />
          </v-card-text>
        </v-col>
        <v-col cols="4">
          <div>
            <div class="text-h6 text-center">
              Mentee Distribution in Facilities
            </div>
          </div>
          <v-card-text class="py-0">
            <pie-chart
              :data="facilityDistributionData"
              :options="facilityDistributionOptions"
              :style="{ height: '402px' }"
            />
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
import colors from 'vuetify/lib/util/colors'

import BarChart from '@/components/ChartJS/BarChart'
import PieChart from '@/components/ChartJS/PieChart'
export default {
  components: { BarChart, PieChart },
  data() {
    return {
      facilityLevelData: {
        labels: ['Kwale', 'Mombasa', 'Kerich', 'Nandi'],
        datasets: [
          {
            label: 'Hospital',
            gradientFill: [colors.purple.lighten4, colors.purple.accent4],
            data: [7, 16, 24, 26],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Health Center',
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            data: [16, 18, 36, 17],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Dispensary',
            gradientFill: [colors.orange.lighten1, colors.pink.accent1],
            data: [11, 3, 10, 13],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }
        ]
      },
      facilityTypeData: {
        labels: ['Kwale', 'Mombasa', 'Kerich', 'Nandi'],
        datasets: [
          {
            label: 'GoK',
            gradientFill: [colors.purple.lighten4, colors.purple.accent4],
            data: [32, 31, 70, 51],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'FBO',
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            data: [2, 2, 0, 5],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Private',
            gradientFill: [colors.orange.lighten1, colors.pink.accent1],
            data: [0, 5, 0, 0],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }
        ]
      },
      facilityDistributionData: {
        labels: ['Kwale', 'Mombasa', 'Kericho', 'Nandi'],
        datasets: [
          {
            gradientFill: [
              [colors.blue.lighten3, colors.green.accent3],
              [colors.purple.lighten3, colors.blue.accent3],
              [colors.red.lighten3, colors.amber.accent3],
              [colors.amber.lighten3, colors.indigo.accent3]
            ],
            data: [34, 45, 80, 56]
          }
        ]
      },
      facilityDistributionOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      option: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            bottom: 10,
            top: 10
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                offsetGridLines: true
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    // chartProps() {
    //   const { labels, currentYear, lastYear } = this.chartProperties
    //   return {
    //     data: !this.compareListYear
    //       ? {
    //           labels: labels,
    //           datasets: currentYear
    //         }
    //       : {
    //           labels: labels,
    //           datasets: lastYear
    //         },
    //     options: this.option
    //   }
    // }
  },
  beforeDestroy() {
    // this.chartProperties = null
    // delete this.chartProperties
  }
}
</script>
