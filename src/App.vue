<template>
  <PlayerList v-if="view === 'players'" @start="handleStart" />
  <GameBoard v-else :players="players" @back="handleBack" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlayerList from './components/PlayerList.vue';
import GameBoard from './components/GameBoard.vue';
import { loadPlayers } from './store';

export default defineComponent({
  components: { PlayerList, GameBoard },
  setup() {
    const players = ref(loadPlayers());
    const view = ref(players.value.length ? 'game' : 'players');

    function handleStart(pList: any[]) {
      players.value = pList;
      view.value = 'game';
    }

    function handleBack() {
      players.value = loadPlayers();
      view.value = 'players';
    }

    return { players, view, handleStart, handleBack };
  }
});
</script>
