<template>
  <div id="app">

    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="#">Malifaux.Kor</b-navbar-brand>
      <b-navbar-nav>
        <!-- <b-nav-item href="#" active>Master Guide</b-nav-item> -->
        <b-nav-text >Starter Master Guide</b-nav-text>
      </b-navbar-nav>

      <!--
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
      -->

    </b-navbar>

    <b-container class="mt-2">

      <b-list-group class="mt-2">
        <!-- Fixed Articles -->
        <b-list-group-item class="py-0">
          <b-row>
            <b-col class="text-left p-2" cols="4">
              <span class="align-middle"><strong>베헤모스 가이드 원본글 모음</strong></span>
            </b-col>
            <b-col class="text-right p-2">
              <b-button class="ml-1" variant="outline-secondary" href="https://gall.dcinside.com/mgallery/board/view/?id=miniaturegame&no=65861">아케이니스트</b-button>
              <b-button class="ml-1" variant="outline-secondary" href="https://gall.dcinside.com/mgallery/board/view/?id=miniaturegame&no=65915">베이유</b-button>
              <b-button class="ml-1" variant="outline-secondary" href="https://gall.dcinside.com/mgallery/board/view/?id=miniaturegame&no=66039">네버본</b-button>
              <b-button class="ml-1" variant="outline-secondary" href="https://gall.dcinside.com/mgallery/board/view/?id=miniaturegame&no=66090">길드</b-button>
              <b-button class="ml-1" variant="outline-secondary" href="https://gall.dcinside.com/mgallery/board/view/?id=miniaturegame&no=66693">텐썬더</b-button>
            </b-col>
          </b-row>
        </b-list-group-item>
        
        <!-- Filters -->
        <b-list-group-item class="p-2 text-left">

          <!-- Factions -->
          <b-form-group
            class="m-0"
            label="선택된 팩션 마스터만 보기"
            v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              v-model="selectedFactions"
              v-bind:options="selectableFactions"
              v-bind:aria-describedby="ariaDescribedby"
              size="sm"
              switches/>
          </b-form-group>

        </b-list-group-item>
      </b-list-group>

      <b-row
        align-h="start"
        class="mt-2">

        <b-col
          v-for="(master, index) in selectedMasters"
          v-bind:key="index"
          lg="3" md="4" sm="6"
          class="p-1">

          <b-card
            v-show="master.name !== ''"
            v-on:click="showDescription(master)"
            class="shadow-sm"
            style="cursor: pointer; height: 100%;"
            no-body>
            
            <b-badge
              v-if="master.guide && master.guide.length > 0"
              v-bind:variant="hasNewGuide(master) ? 'primary' : 'secondary'"
              class="position-absolute"
              style="top: 6px; right: 6px;"
              pill>
              {{ master.guide.length }}
            </b-badge>

            <b-card-body class="px-0 py-3">
              <b-card-title title-tag="h6">{{ master.nameKo }}</b-card-title>
              <b-card-sub-title><small>{{ master.name }}</small></b-card-sub-title>
              <b-card-text>
                <div>
                  <b-badge
                    v-for="(faction, index) in master.faction"
                    v-bind:key="index"
                    v-bind:style="{backgroundColor: getFactionColor(faction)}"
                    style="font-size: 0.5rem; margin-left: 2px; margin-right: 2px;"
                    pill>{{ faction }}</b-badge>
                </div>
                <hr class="mx-3 my-1"/>
                <div>
                  <b-badge
                    v-for="(tag, index) in master.tags"
                    v-bind:key="index"
                    style="font-size: 0.5rem; margin-left: 2px; margin-right: 2px;"
                    pill>{{ tag }}</b-badge>
                </div>
              </b-card-text>
            </b-card-body>
          </b-card>

        </b-col>

      </b-row>
    </b-container>

    <b-modal
      v-bind:title="`${selectedMaster.nameKo} (${selectedMaster.name})`"
      ref="modal-description"
      size="lg"
      scrollable
      hide-footer>

      <b-tabs
        active-nav-item-class="bg-secondary"
        content-class="mt-0"
        pills card>

        <b-tab
          v-for="(guide, index) in selectedMaster.guide"
          v-bind:key="index"
          v-bind:title="guide.author"
          class="pt-0">
          
          <b-card-text>
            <div v-html="guide.content"/>
            <div class="text-right"><i>{{ guide.date }}</i></div>
          </b-card-text>

        </b-tab>
      </b-tabs>

    </b-modal>

  </div>
</template>

<script>
const FACTION = {
  'ARCANISTS': 'ARCANISTS',
  'BAYOU': 'BAYOU',
  'EXPLORER_SOCIETY': 'EXPLORER`S SOCIETY',
  'THE_GUILD': 'GUILD',
  'NEVERBORN': 'NEVERBORN',
  'OUTCASTS': 'OUTCASTS',
  'RESURRECTIONISTS': 'RESURRECTIONISTS',
  'TEN_THUNDERS': 'TEN THUNDERS'
}

const TAG = {
  'BLAST': '범위공격',
  'CONTROL': '컨트롤',
  'POWERFUL': '힘싸움',
  'MELEE': '근접형',
  'RANGE': '원거리형',
  'MOBILITY': '기동성',
  'SUMMON': '소환술사',
  'TERRAIN': '지형 컨트롤',
  'UPGRADE': '업그레이드',
  'TOUGH': '튼튼함',
  'DEBUFF': '디버퍼',
  'SCHEME': '스키머',
  'OBEY': '오베이'
}

const EMPTY_MASTER = {
  name: '',
  nameKo: '',
  faction: [],
  tags: [],
  guide: []
}

export default {
  name: 'App',
  data: function () {
    return {
      currentTimestamp: new Date().getTime(),
      masters: [],
      selectedMaster: EMPTY_MASTER,
      selectedFactions: Object.values(FACTION),
      selectableFactions: Object.values(FACTION).map(f => {
        return {
          text: f, value: f
        }
      })
    }
  },
  computed: {
    selectedMasters: function () {
      return this.masters.filter(m => m.faction.every(f => this.selectedFactions.indexOf(f) >= 0))
    }
  },
  methods: {
    getFactionColor: function (f) {
      switch (f) {
        case FACTION.ARCANISTS:
          return 'blue'
        case FACTION.BAYOU:
          return 'brown'
        case FACTION.EXPLORER_SOCIETY:
          return 'darkcyan'
        case FACTION.THE_GUILD:
          return 'red'
        case FACTION.NEVERBORN:
          return 'purple'
        case FACTION.OUTCASTS:
          return 'goldenrod'
        case FACTION.RESURRECTIONISTS:
          return 'green'
        case FACTION.TEN_THUNDERS:
          return 'orangered'
      
        default:
          return 'black'
      }
    },
    showDescription: function (m) {
      if (m.guide && m.guide.length > 0) {
        this.selectedMaster = m
        this.$refs['modal-description'].show()
      }
    },
    hasNewGuide: function (m) {
      if (!m.guide || m.guide.length <= 0) {
        return false;
      }

      return m.guide.some(g => (this.currentTimestamp - Date.parse(g.date)) < 1000 * 60 * 60 * 24 * 3)
    },
    validateMasterData: function (masters) {
      var _masters = []

      for (var i = 0; i < masters.length; i++) {
        var m = masters[i];

        if (m.faction.some(f => Object.values(FACTION).every(_f => _f != f))) {
          console.error(m.name, m.faction)
          continue
        }

        if (m.tags.some(t => Object.values(TAG).every(_t => _t != t))) {
          console.error(m.name, m.tags)
          continue
        }

        m.guide = m.guide || []

        _masters.push(m)
      }

      return _masters
    }
  },
  created: function () {
    fetch('data/guide.json')
      .then(r => r.json())
      .then(d => this.masters = this.validateMasterData(d))
      .catch(e => console.error(e))
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
