<template>
  <div>

    <b-row class="mb-2">
      <b-col md="8">
        <p class="mb-0 text-left" style="font-size: 1.5rem;"><strong>2021 The First Quater Malifaux League</strong></p>
      </b-col>
      <b-col md="4">
        <b-select
          v-model="selectedQuater"
          v-bind:options="selectedQuaterOptions" />
      </b-col>
    </b-row>

    <participant
      v-for="(participant, participantIndex) in participants"
      v-bind:key="participant['nickname']"
      v-bind:participant="participant"
      v-bind:participant-index="participantIndex"
      v-bind:selected-quater="selectedQuater" />

  </div>
</template>

<script>
import _ from 'lodash'

import Participant from './Participant'

export default {
  name: 'Tournament',
  components: {
    Participant
  },
  data: function () {
    return {
      tournaments: [],
      selectedQuater: 1,
      selectedQuaterOptions: [
        { value: 1, text: 'Quater 1 (2021.03.12 - 2021.03.19)' },
        { value: 2, text: 'Quater 2 (2021.03.20 - 2021.03.26)' },
        { value: 3, text: 'Quater 3 (2021.03.27 - 2021.04.02)' },
        { value: 4, text: 'Quater 4 (2021.04.03 - 2021.04.11)' }
      ]
    }
  },
  computed: {
    participants: function () {
      if (this.tournaments.length <= 0) return []
      return this.tournaments[0]['participant']
    }
  },
  methods: {
    process: function (tournaments) {
      if (tournaments.length <= 0) {
        this.tournaments = []
        return
      }
      
      // 토너먼트 정보 초기화
      tournaments.forEach(tournament => {
        // 고정값 초기화
        tournament['participant'].forEach(player => {
          player['match'] = []
          player['stats'] = {
            'win': 0,
            'draw': 0,
            'lose': 0,
            'total': 0,
            'point': 0,
          }
        })

        // 매치 데이터 할당
        tournament['match'].forEach(match => {
          match['player'].forEach(player => {
            player['score'] = 0
            player['score'] += Object.values(player['strategy'])[0]
            player['score'] += _.sum(Object.values(player['scheme']))
          })

          var attackingPlayer = match['player'][0]
          var defendingPlayer = match['player'][1]
          var winOrLose = attackingPlayer['score'] > defendingPlayer['score'] || defendingPlayer['surrender'] ? 1
                        : attackingPlayer['score'] < defendingPlayer['score'] || attackingPlayer['surrender'] ? -1
                        : 0;

          var strategy = [
            Object.values(attackingPlayer['strategy'])[0],
            Object.keys(attackingPlayer['strategy'])[0],
            Object.values(defendingPlayer['strategy'])[0]
          ]
          var scheme = Object
            .entries(attackingPlayer['scheme'])
            .map((s, i) => {
              return [
                s[1],
                s[0],
                Object.values(defendingPlayer['scheme'])[i]
              ]
            })

          // 일치하는 플레이어에게 데이터 입력
          tournament['participant'].forEach(player => {
            // 첫 번째 유저와 일치 할 경우
            if (player['nickname'] == attackingPlayer['nickname']) {
              // 승/패/무승부 횟수 가산
              player['stats']['total'] += 1
              if (winOrLose == 1) {
                player['stats']['win'] += 1
                player['stats']['point'] += 3
              } else if (winOrLose == 0) {
                player['stats']['draw'] += 1
                player['stats']['point'] += 1
              } else {
                player['stats']['lose'] += 1
              }

              player['match'].push({
                'quater': match['quater'],
                'score': [attackingPlayer['score'], defendingPlayer['score']],
                'nicknames': [attackingPlayer['nickname'], defendingPlayer['nickname']],
                'surrender': [attackingPlayer['surrender'], defendingPlayer['surrender']],
                'strategy': strategy,
                'scheme': scheme,
                'report': match['report']
              })
            }
            // 두 번째 유저와 일치 할 경우
            else if (player['nickname'] == defendingPlayer['nickname']) {
              // 승/패/무승부 횟수 가산
              player['stats']['total'] += 1
              if (winOrLose == -1) {
                player['stats']['win'] += 1
                player['stats']['point'] += 3
              } else if (winOrLose == 0) {
                player['stats']['draw'] += 1
                player['stats']['point'] += 1
              } else {
                player['stats']['lose'] += 1
              }

              match['player'] = [
                match['player'][1],
                match['player'][0]
              ]

              player['match'].push({
                'quater': match['quater'],
                'score': [defendingPlayer['score'], attackingPlayer['score']],
                'nicknames': [defendingPlayer['nickname'], attackingPlayer['nickname']],
                'surrender': [defendingPlayer['surrender'], attackingPlayer['surrender']],
                'strategy': [...strategy].reverse(),
                'scheme': scheme.map(s => [...s].reverse()),
                'report': match['report']
              })
            }
          })
        })

        tournament['participant'] = _.orderBy(
          tournament['participant'],
          ['stats.point', 'stats.win', 'stats.draw', 'stats.lose', 'stats.total'],
          ['desc', 'desc', 'desc', 'asc', 'desc'])
      })

      this.tournaments = tournaments

      // 쿼터 정보 초기화
      this.initializeQuater()
    },
    initializeQuater: function () {
      const current = new Date()
      const quater = this.tournaments[0]['quater']
      for (var i in quater) {
        if (Date.parse(quater[i]['fromDate']) < current) {
          this.selectedQuater = parseInt(i) + 1
        }
      }
    }
  },
  created: function () {
    fetch('data/tournament.json?nocache=true')
      .then(r => r.json())
      .then(d => this.process(d))
      .catch(e => console.error(e))
  }
}
</script>

<style>

</style>
