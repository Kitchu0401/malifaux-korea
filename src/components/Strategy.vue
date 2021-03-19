<template>
  <div>

    <b-select
      v-model="selectedRuleset"
      v-bind:options="selectedRulesetOptions" />

    <div class="accordion" role="tablist">

      <!-- Strategy -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="primary">Strategy</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              
              <b-list-group>
                <b-list-group-item 
                  v-bind:key="s['symbol']"
                  v-for="s in strategy"
                  class="flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h3 class="mb-2">{{ s['title'] }}</h3>
                    <b-icon font-scale="1.5" icon="eye-slash" v-on:click="hideSymbol(s['symbol'])" />
                  </div>
                  <small><div class="text-left" v-html="s['content']"></div></small>
                </b-list-group-item>
              </b-list-group>
              
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <!-- Scheme -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="primary">Scheme</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              
              <b-list-group>
                <b-list-group-item 
                  v-bind:key="s['symbol']"
                  v-for="s in scheme"
                  class="flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h3 class="mb-2">{{ s['title'] }}</h3>
                    <b-icon font-scale="1.5" icon="eye-slash" v-on:click="hideSymbol(s['symbol'])" />
                  </div>
                  <small><div class="text-left" v-html="s['content']"></div></small>
                </b-list-group-item>
              </b-list-group>
              
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <!-- Reset Button -->
      <b-card no-body class="mb-1" v-if="hiddenSymbol.length > 0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block variant="secondary" v-on:click="resetHiddenSymbol">Reset hidden</b-button>
        </b-card-header>
      </b-card>

      <!--
      <b-iconstack
        font-scale="1.5"
        class="position-absolute"
        style="bottom: 1.0em; right: 1.0em;"
        v-on:click="resetHiddenSymbol">
        <b-icon icon="arrow-clockwise" scale="0.75" />
        <b-icon icon="circle" />
      </b-iconstack>
      -->
      
    </div>

  </div>
</template>

<script>
const LEAGUE = {
  Q1: 'Q1',
  Q2: 'Q2',
  Q3: 'Q3',
  Q4: 'Q4'
}

export default {
  name: 'Strategy',
  data: function () {
    return {
      currentRuleset: 'GG1 Season 1',
      selectedRuleset: 'GG1 Season 1',
      selectedRulesetOptions: [
        { value: 'GG1 Season 1', text: 'GG1 Season 1' },
        { value: LEAGUE.Q1, text: '2021 The First Quater Malifaux League  Q1 (2021.03.12 - 2021.03.19)' },
        { value: LEAGUE.Q2, text: '2021 The First Quater Malifaux League  Q2 (2021.03.19 - 2021.03.26)' },
        { value: LEAGUE.Q3, text: '2021 The First Quater Malifaux League  Q3 (2021.03.26 - 2021.04.02)' },
        { value: LEAGUE.Q4, text: '2021 The First Quater Malifaux League  Q4 (2021.04.02 - 2021.04.11)' }
      ],
      ruleset: [],
      hiddenSymbol: []
    }
  },
  computed: {
    strategy: function () {
      if (this.ruleset.length <= 0) {
        return []
      }

      var ruleset = this.ruleset.filter(r => r['ruleset'] === this.currentRuleset)[0]
      var strategy = ruleset['strategy']

      switch (this.selectedRuleset) {
        case LEAGUE.Q1:
          return strategy.filter(s => s['symbol'] === 'Crow')
        case LEAGUE.Q2:
          return strategy.filter(s => s['symbol'] === 'Ram')
        case LEAGUE.Q3:
          return strategy.filter(s => s['symbol'] === 'Book')
        case LEAGUE.Q4:
          return strategy.filter(s => s['symbol'] === 'Mask')
      }

      return strategy.filter(s => this.hiddenSymbol.indexOf(s['symbol']) < 0)
    },
    scheme: function () {
      if (this.ruleset.length <= 0) {
        return []
      }

      var ruleset = this.ruleset.filter(r => r['ruleset'] === this.currentRuleset)[0]
      var scheme = ruleset['scheme']

      switch (this.selectedRuleset) {
        case LEAGUE.Q1:
          return scheme.filter(s => ['1', '6', '8', '10', '12'].indexOf(s['symbol']) >= 0)
        case LEAGUE.Q2:
          return scheme.filter(s => ['2', '3', '4', '5', '7'].indexOf(s['symbol']) >= 0)
        case LEAGUE.Q3:
          return scheme.filter(s => ['3', '5', '7', '9', '11'].indexOf(s['symbol']) >= 0)
        case LEAGUE.Q4:
          return scheme.filter(s => ['6', '8', '4', '12', '13'].indexOf(s['symbol']) >= 0)
      }

      return scheme.filter(s => this.hiddenSymbol.indexOf(s['symbol']) < 0)
    }
  },
  methods: {
    hideSymbol: function (symbol) {
      const symbolStrategy = ['Ram', 'Book', 'Mask', 'Crow']
      const symbolScheme = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']

      if (this.hiddenSymbol.indexOf(symbol) >= 0) return
      if (symbolStrategy.indexOf(symbol) >= 0 && this.hiddenSymbol.filter(s => symbolStrategy.indexOf(s) >= 0).length >= 3) return
      if (symbolScheme.indexOf(symbol) >= 0 && this.hiddenSymbol.filter(s => symbolScheme.indexOf(s) >= 0).length >= 11) return

      this.hiddenSymbol.push(symbol)
    },
    resetHiddenSymbol: function () {
      this.hiddenSymbol = []
    }
  },
  created: function () {
    fetch('data/strategy.json?nocache=true')
      .then(r => r.json())
      .then(d => this.ruleset = d)
      .catch(e => console.error(e))
  }
}
</script>

<style>

</style>
