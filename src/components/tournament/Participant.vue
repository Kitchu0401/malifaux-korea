<template>
  <b-card no-body class="mb-1">
    <b-card-header
      header-tag="header" role="tab"
      class="p-2 d-flex text-light bg-dark w-100 justify-content-between"
      v-b-toggle="`participant-detail-${participantIndex}`">
      <div class="text-left">
        <h4 class="">{{ nickname }}</h4>
        <p class="mb-0"><strong>{{ master }}</strong> <small>({{ faction }})</small></p>
      </div>
      <div>
        <b-table-simple bordered class="m-0 text-light score-board">
          <b-thead>
            <b-tr>
              <b-th>P</b-th>
              <b-th>T</b-th>
              <b-th>W</b-th>
              <b-th>D</b-th>
              <b-th>L</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td>{{ stats['point'] }}</b-td>
              <b-td>{{ stats['total'] }}</b-td>
              <b-td>{{ stats['win'] }}</b-td>
              <b-td>{{ stats['draw'] }}</b-td>
              <b-td>{{ stats['lose'] }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
    </b-card-header>
    <b-collapse v-bind:id="`participant-detail-${participantIndex}`" visible accordion="my-accordion" role="tabpanel">

      <!-- match list found -->
      <b-card-body class="p-1">
        <b-card-group v-if="match.length > 0">
          <match
            v-for="(m, mi) in match"
            v-bind:key="mi"
            v-bind:match="m" />
        </b-card-group>
      </b-card-body>

      <!-- match list not found -->
      <b-card-body v-if="match.length <= 0">
        <b-card-text>No match history found ?.?</b-card-text>
      </b-card-body>
      
    </b-collapse>
  </b-card>
</template>

<script>
import Match from './Match'

export default {
  name: 'Participant',
  components: {
    Match
  },
  props: {
    participant: Object,
    participantIndex: Number,
    selectedQuater: Number
  },
  computed: {
    nickname: function () {
      return this.participant['nickname']
    },
    faction: function() {
      return this.participant['faction']
    },
    master: function () {
      return this.participant['master']
    },
    stats: function () {
      return this.participant['stats']
    },
    match: function () {
      return this.participant['match'].filter(m => m['quater'] === this.selectedQuater)
    }
  }
}
</script>

<style>
.score-board {
  font-size: 0.75rem;
}

.score-board th {
  padding: 0.25rem 0.5rem;
}

.score-board td {
  padding: 0.25rem 0.5rem;
}
</style>
