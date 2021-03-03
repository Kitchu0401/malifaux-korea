<template>
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
</template>

<script>
export default {
  name: 'Strategy',
  data: function () {
    return {
      currentRuleset: 'GG1 Season 1',
      ruleset: [],
      hiddenSymbol: []
    }
  },
  computed: {
    strategy: function () {
      if (this.ruleset.length <= 0) {
        return []
      }

      return this.ruleset
        .filter(r => r['ruleset'] === this.currentRuleset)[0]['strategy']
        .filter(s => this.hiddenSymbol.indexOf(s['symbol']) < 0)
    },
    scheme: function () {
      if (this.ruleset.length <= 0) {
        return []
      }

      return this.ruleset
        .filter(r => r['ruleset'] === this.currentRuleset)[0]['scheme']
        .filter(s => this.hiddenSymbol.indexOf(s['symbol']) < 0)
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
    fetch('data/strategy.json')
      .then(r => r.json())
      .then(d => this.ruleset = d)
      .catch(e => console.error(e))
  }
}
</script>

<style>

</style>
