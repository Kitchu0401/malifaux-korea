<template>
  <b-card no-body class="mb-1">
    <b-card-header
      header-tag="header" role="tab"
      class="p-0 d-flex w-100 justify-content-between"
      v-b-toggle="`participant-detail-${participantIndex}`">
      <h4 class="p-2 m-0 align-middle">{{ nickname }} <small>({{ faction }} - {{ master }})</small></h4>
      <div>
        <p class="m-1 text-right">Point: {{ stats['point'] }}</p>
        <p class="m-1 text-right"><small>W: {{ stats['win'] }} / L: {{ stats['lose'] }} / D: {{ stats['draw'] }}</small></p>
      </div>
    </b-card-header>
    <b-collapse v-bind:id="`participant-detail-${participantIndex}`" visible accordion="my-accordion" role="tabpanel">
      <b-card-body class="p-1">
        <b-card-group>
          <match
            v-for="(m, mi) in match"
            v-bind:key="mi"
            v-bind:match="m" />
        </b-card-group>
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
    participantIndex: Number
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
      return this.participant['match']
    }
  }
}
</script>

<style>

</style>
