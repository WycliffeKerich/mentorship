<template>
  <v-col md="12">
    <v-card class="neu-glow">
      <v-row class="mx-0 pa-4" justify="space-between" align="center">
        <!-- title and subtitle -->
        <div>
          <div class="text-h5" align="center">
            Mentee Progress Scores
          </div>
        </div>
      </v-row>
      <v-row>
        <v-col cols="3">
          <div>
            <div class="text-h6 text-center">
              Mombasa County
            </div>
          </div>
          <v-card-text class="py-0">
            <bar-chart
              :data="mombasaCountyData"
              :options="option"
              :style="{ height: '402px' }"
            />
          </v-card-text>
        </v-col>
        <v-col cols="3">
          <div>
            <div class="text-h6 text-center">
              Kwale County
            </div>
          </div>
          <v-card-text class="py-0">
            <bar-chart
              :data="kwaleCountyData"
              :options="option"
              :style="{ height: '402px' }"
            />
          </v-card-text>
        </v-col>
        <v-col cols="3">
          <div>
            <div class="text-h6 text-center">
              Nandi County
            </div>
          </div>
          <v-card-text class="py-0">
            <bar-chart
              :data="nandiCountyData"
              :options="option"
              :style="{ height: '402px' }"
            />
          </v-card-text>
        </v-col>
        <v-col cols="3">
          <div>
            <div class="text-h6 text-center">
              Kericho County
            </div>
          </div>
          <v-card-text class="py-0">
            <bar-chart
              :data="kerichoCountyData"
              :options="option"
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
export default {
  components: { BarChart },
  data() {
    return {
      mombasaCountyData: {
        labels: ['CGTRH', 'Mrima', 'PortReitz', 'Mombasa'],
        datasets: [
          {
            label: 'Baseline',
            gradientFill: [colors.purple.lighten4, colors.purple.accent4],
            data: [0.65, 0.48, 0.58, 0.62],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Midline',
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            data: [0.82, 0.68, 0.82, 0.8],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Endline',
            gradientFill: [colors.orange.lighten1, colors.pink.accent1],
            data: [0.92, 0.89, 0.89, 0.91],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }
        ]
      },
      kerichoCountyData: {
        labels: ['AIC Litein', 'Kericho CRH', 'Kapkatet SCH', 'Kericho'],
        datasets: [
          {
            label: 'Baseline',
            gradientFill: [colors.purple.lighten4, colors.purple.accent4],
            data: [0.65, 0.48, 0, 0.62],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Midline',
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            data: [0.82, 0.68, 0, 0.8],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Endline',
            gradientFill: [colors.orange.lighten1, colors.pink.accent1],
            data: [0.92, 0.89, 0, 0.91],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }
        ]
      },
      kwaleCountyData: {
        labels: ['Msambweni CRH', 'Mrima', 'Kwale'],
        datasets: [
          {
            label: 'Baseline',
            gradientFill: [colors.purple.lighten4, colors.purple.accent4],
            data: [0.65, 0.81, 0.9],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Midline',
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            data: [0.82, 0.81, 0.9],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Endline',
            gradientFill: [colors.orange.lighten1, colors.pink.accent1],
            data: [0.92, 0.81, 0.91],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }
        ]
      },
      nandiCountyData: {
        labels: ['Kapsabet CRH', 'Nandi Hills', 'Nandi'],
        datasets: [
          {
            label: 'Baseline',
            gradientFill: [colors.purple.lighten4, colors.purple.accent4],
            data: [0.65, 0.81, 0.9],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Midline',
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            data: [0.82, 0.81, 0.9],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Endline',
            gradientFill: [colors.orange.lighten1, colors.pink.accent1],
            data: [0.92, 0.81, 0.91],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }
        ]
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
