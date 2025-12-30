<template>
  <h2>Täter</h2>
  <section class="items">
    <div v-for="it in suspects" :key="it.id" class="item-row">
      <div class="item-name">{{ it.name }}</div>
      <PlayerSelector :item="it" :players="players" @change="onPlayerChange" />
    </div>
  </section>

  <h2>Tatwaffen</h2>
  <section class="items">
    <div v-for="it in weapons" :key="it.id" class="item-row">
      <div class="item-name">{{ it.name }}</div>
      <PlayerSelector :item="it" :players="players" @change="onPlayerChange" />
    </div>
  </section>

  <h2>Räume</h2>
  <section class="items">
    <div v-for="it in rooms" :key="it.id" class="item-row">
      <div class="item-name">{{ it.name }}</div>
      <PlayerSelector :item="it" :players="players" @change="onPlayerChange" />
    </div>
  </section>

  <footer>
    <button type="button" class="primary" @click="newGame">Neues Spiel</button>
    <button type="button" @click="$emit('back')">Spieler verwalten</button>
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import PlayerSelector from './PlayerSelector.vue';
import { loadGame, saveGame, resetGame, ensureMarksForPlayers } from '../store';
import type { Player, GameState } from '../types';

export default defineComponent({
  components: { PlayerSelector },
  props: { players: { type: Array as () => Player[], required: true } },
  emits: ['back'],
  setup(props) {
    const state = ref<GameState>(loadGame(props.players));
    state.value = ensureMarksForPlayers(state.value, props.players);

    function newGame() { state.value = resetGame(props.players); }

    function onPlayerChange(payload: { itemId: string; playerId: string | null; unsure?: boolean }) {
      const { itemId, playerId, unsure } = payload;
      const it = state.value.items.find(i => i.id === itemId)!;
      it.shownBy = playerId ?? null;
      it.unsure = !!unsure;
      saveGame(state.value);
    }

    function playerName(id: string) { const p = props.players.find(x=>x.id===id); return p ? p.name : '—'; }

    const suspects = computed(()=> state.value.items.filter(i=>i.type==='suspect'));
    const weapons = computed(()=> state.value.items.filter(i=>i.type==='weapon'));
    const rooms = computed(()=> state.value.items.filter(i=>i.type==='room'));

    return { suspects, weapons, rooms, onPlayerChange, newGame, playerName };
  }
});
</script>
