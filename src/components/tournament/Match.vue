<template>
  <b-card>
    <b-table-simple bordered class="text-center m-0">
      <b-thead>
        <th>{{ score[0] }}</th>
        <th v-html="nicknames" />
        <th>{{ score[1] }}</th>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-td>{{ strategy[0] }}</b-td>
          <b-td>{{ strategy[1] }}</b-td>
          <b-td>{{ strategy[2] }}</b-td>
        </b-tr>
        <b-tr
          v-for="(scheme, si) in scheme"
          v-bind:key="si">
          <b-td>{{ scheme[0] }}</b-td>
          <b-td>{{ scheme[1] }}</b-td>
          <b-td>{{ scheme[2] }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-card>
</template>

<script>
export default {
  name: 'Match',
  props: {
    match: Object
  },
  computed: {
    score: function () {
      return this.match['score']
    },
    nicknameA: function () {
      const attacingPlayerSurrender = this.match['surrender'][0] ? ' <small class="text-danger">(S)</small>' : ''
      return `${this.match['nicknames'][0]}${attacingPlayerSurrender}`
    },
    nicknameB: function () {
      const defendingPlayerSurrender = this.match['surrender'][1] ? ' <small class="text-danger">(S)</small>' : ''
      return `${this.match['nicknames'][1]}${defendingPlayerSurrender}`
    },
    nicknames: function () {
      const reportLink = `<a v-if="report" href="${this.match['report']}" target="_blank">[Report]</a>`
      return `${this.nicknameA}<small> vs </small>${this.nicknameB} ${reportLink}`
    },
    surrender: function () {
      return this.match['surrender']
    },
    strategy: function() {
      return this.match['strategy']
    },
    scheme: function () {
      return this.match['scheme']
    },
    report: function () {
      return this.match['report']
    }
  }
}
</script>

<style>

</style>
