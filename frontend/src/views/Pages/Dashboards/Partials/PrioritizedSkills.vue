<template>
  <v-col md="12">
    <v-card class="neu-glow">
      <v-row class="mx-0 pa-4" justify="space-between" align="center">
        <!-- title and subtitle -->
        <div>
          <div class="text-h5" align="center">
            Prioritized Skills
          </div>
        </div>
      </v-row>
      <v-row>
        <v-col cols="6">
          <div>
            <div class="text-h6 text-center">
              Skills Prioritized by Mentees for Mentorship
            </div>
          </div>
          <v-card-text class="py-0">
            <bar-chart
              :data="kwaleMombasaData"
              :options="option"
              :style="{ height: '402px' }"
            />
          </v-card-text>
        </v-col>
        <v-col cols="6">
          <div>
            <div class="text-h6 text-center">
              Skills Prioritized by Mentees for Mentorship
            </div>
          </div>
          <v-card-text class="py-0">
            <bar-chart
              :data="kerichoNandiData"
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
      kwaleMombasaData: {
        labels: [
          'Filling a Partograph',
          'Perform AVD',
          'Newborn Rescucitation',
          'Manouvre Breech',
          'Perform MVA',
          'Remove Placenta',
          'Manage PPH',
          'AMTSL'
        ],
        datasets: [
          {
            label: 'Kwale',
            gradientFill: [colors.purple.lighten4, colors.purple.accent4],
            data: [2, 22, 10, 19, 23, 6, 4, 0],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Mombasa',
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            data: [4, 7, 21, 12, 6, 14, 9, 2],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }
        ]
      },
      kerichoNandiData: {
        labels: [
          'Managing Eclampsia',
          'Filing a patograph',
          'Perform AVD',
          'Newborn Resuscitation',
          'Manouvre Breech',
          'Perform MVA'
        ],
        datasets: [
          {
            label: 'Kericho',
            gradientFill: [colors.purple.lighten4, colors.purple.accent4],
            data: [44, 19, 52, 11, 25, 35],
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            shadowBlur: 8,
            shadowColor: 'rgba(66, 165, 245, 0.5)',
            categoryPercentage: 0.5,
            barPercentage: 0.5
          },
          {
            label: 'Nandi',
            gradientFill: [colors.blue.lighten4, colors.blue.accent4],
            data: [20, 7, 27, 14, 30, 33],
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
  }
}
</script>
