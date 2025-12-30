<template>
  <h2>Spieler verwalten</h2>
  <section>
    <div class="player-list">
      <div v-for="p in players" :key="p.id" class="player-item">
        <span>{{ p.name }}</span>
        <button type="button" @click="remove(p.id)" style="margin-left:auto;">Löschen</button>
      </div>
    </div>
    <div style="display:flex; gap:8px; margin-top:8px;">
      <input v-model="name" placeholder="Name hinzufügen" />
      <button type="button" @click="add">Hinzufügen</button>
    </div>
  </section>

  <footer>
    <button type="button" class="primary" @click="startGame">Spiel starten</button>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { loadPlayers, resetGame, savePlayers } from '../store';
import type { Player } from '../types';

export default defineComponent({
  emits: ['start'],
  setup(_, { emit }) {
    const players = ref<Player[]>([]);
    const name = ref('');

    onMounted(() => { players.value = loadPlayers(); });

    function add() {
      const n = name.value.trim(); if (!n) return;
      players.value.push({ id: Math.random().toString(36).slice(2,9), name: n });
      savePlayers(players.value);
      name.value = '';
    }

    function remove(id: string) { players.value = players.value.filter(p=>p.id!==id); savePlayers(players.value); }

    function startGame() { savePlayers(players.value); emit('start', players.value); }

    return { players, name, add, remove, startGame };
  }
});
</script>
