<template>
  <b-card>
    <b-table-simple bordered class="text-center m-0">
      <b-thead>
        <th>{{ score[0] }}</th>
        <th>{{ nicknames[0] }} <small>vs</small> {{ nicknames[1] }} <a v-if="report" v-bind:href="report" target="_blank">[Report]</a></th>
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
    nicknames: function () {
      return this.match['nicknames']
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
