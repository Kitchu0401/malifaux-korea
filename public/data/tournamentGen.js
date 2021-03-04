var fs = require('fs')
var _ = require('lodash')

var body = {
  "title": "Sandeep Desai",
  "fromDate": "2021-03-13",
  "toDate": "2021-04-03",
  "participant": [
    {
        "nickname": "베헤모스",
        "faction": "NEVERBORN",
        "master": "The Dreamer"
    },
    {
        "nickname": "어니버니",
        "faction": "EXPLORER`S SOCIETY",
        "master": "Lord Cooper"
    },
    {
        "nickname": "킷츄",
        "faction": "ARCANISTS",
        "master": "Marcus"
    },
    {
        "nickname": "마성민",
        "faction": "BAYOU",
        "master": "Zoraida"
    },
    {
        "nickname": "시마도르",
        "faction": "BAYOU",
        "master": "Brewmaster"
    },
    {
        "nickname": "김근태",
        "faction": "OUTCASTS",
        "master": "Tara"
    },
    {
        "nickname": "Kenneth",
        "faction": "ARCANISTS",
        "master": "Kaeris"
    },
    {
        "nickname": "Minman",
        "faction": "ARCANISTS",
        "master": "Rasputina"
    }
  ]
}

function pick(arr) {
  return arr[randInt(arr.length)]
}

function randInt(to) {
  return parseInt(Math.random() * to)
}

const strategy = {
  "strategy": "Public Execution",
  "scheme": [
    "Breakthrough",
    "Hidden Martrys",
    "Catch and Release",
    "Leave your Mark",
    "Spread them out"
  ]
}

// pick random players
var countPlayers = 5
var pickedPlayers = []
while (pickedPlayers.length < countPlayers) {
  var p = pick(body['participant'])
  if (pickedPlayers.some(_p => _p['nickname'] == p['nickname'])) continue
  pickedPlayers.push(_.cloneDeep(p))
}

for (p in body['participant']) {
  body['participant'][p]['match'] = []
  body['participant'][p]['stats'] = {
    "win": 0,
    "draw": 0,
    "lose": 0,
    "point": 0
  }
}

// generate random match history
var countMatches = 5
var countPerPlayers = {}
for (p in pickedPlayers) countPerPlayers[pickedPlayers[p]['nickname']] = 0
var countGeneratedMatches = 0
while (countGeneratedMatches < countMatches) {
  var picked, attacker, defender

  // pick attacker
  do {
    picked = pick(pickedPlayers)
    if (countPerPlayers[picked['nickname']] > 3) continue
    attacker = _.cloneDeep(picked)
    countPerPlayers[picked['nickname']] += 1
    break
  } while (true);

  // pick defender
  do {
    picked = pick(pickedPlayers)
    if (countPerPlayers[picked['nickname']] > 3) continue
    if (picked['nickname'] == attacker['nickname']) continue
    defender = _.cloneDeep(picked)
    countPerPlayers[picked['nickname']] += 1
    break
  } while (true);

  // generate match
  var matchBody = {
    "attacker": {
      "player": attacker,
      "strategy": {},
      "scheme": [],
      "score": -1
    },
    "defender": {
      "player": defender,
      "strategy": {},
      "scheme": [],
      "score": -1
    }
  }

  function getScheme(s) {
    var scheme = {}
    scheme[s] = randInt(3)
    return scheme
  }

  matchBody['attacker']['strategy'][strategy['strategy']] = randInt(3)
  matchBody['attacker']['scheme'] = _.sampleSize(strategy['scheme'], 2).map(getScheme)
  matchBody['attacker']['score'] = Object.values(matchBody['attacker']['strategy'])[0] + _.sum(matchBody['attacker']['scheme'].map(s => Object.values(s)[0]))

  matchBody['defender']['strategy'][strategy['strategy']] = randInt(3)
  matchBody['defender']['scheme'] = _.sampleSize(strategy['scheme'], 2).map(getScheme)
  matchBody['defender']['score'] = Object.values(matchBody['defender']['strategy'])[0] + _.sum(matchBody['defender']['scheme'].map(s => Object.values(s)[0]))

  // if someone wins
  if (matchBody['attacker']['score'] != matchBody['defender']['score']) {
    winner = matchBody['attacker']['score'] > matchBody['defender']['score'] ? matchBody['attacker'] : matchBody['defender']
    winnerPlayer = body['participant'].filter(_p => _p['nickname'] == winner['player']['nickname'])[0]
    winnerPlayer['match'].push(_.cloneDeep(matchBody))
    winnerPlayer['stats']['win'] += 1

    loser = matchBody['attacker']['score'] < matchBody['defender']['score'] ? matchBody['attacker'] : matchBody['defender']
    loserPlayer = body['participant'].filter(_p => _p['nickname'] == loser['player']['nickname'])[0]
    loserPlayer['match'].push(_.cloneDeep(matchBody))
    loserPlayer['stats']['lose'] += 1
  }
  // or tied
  else {
    drawPlayer = body['participant'].filter(_p => _p['nickname'] == matchBody['attacker']['player']['nickname'])[0]
    drawPlayer['match'].push(_.cloneDeep(matchBody))
    drawPlayer['stats']['draw'] += 1

    drawPlayer = body['participant'].filter(_p => _p['nickname'] == matchBody['defender']['player']['nickname'])[0]
    drawPlayer['match'].push(_.cloneDeep(matchBody))
    drawPlayer['stats']['draw'] += 1
  }

  countGeneratedMatches = countGeneratedMatches + 1
}

// calculate match point
for (p in body['participant']) {
  body['participant'][p]['stats']['point'] += body['participant'][p]['stats']['win'] * 3
  body['participant'][p]['stats']['point'] += body['participant'][p]['stats']['draw'] * 1
}

fs.writeFile('tournamentSample.json', JSON.stringify(body, null, '\t'), 'utf8', () => { console.log('Done!') })

