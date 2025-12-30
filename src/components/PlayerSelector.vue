<template>
  <div class="player-selector">
    <select v-model="selectedId" class="select">
      <option value=""></option>
      <option v-for="p in players" :key="p.id" :value="p.id">{{ p.name }}</option>
    </select>

    <button type="button" class="small" :class="{ unsure: currentUnsure }" @click="toggleUnsure">?</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import type { GameItem, Player } from '../types';

export default defineComponent({
  name: 'PlayerSelector',
  props: {
    item: { type: Object as () => GameItem, required: true },
    players: { type: Array as () => Player[], required: true }
  },
  emits: ['change'],
  setup(props, { emit }) {
    // start with empty selection unless item.shownBy is set
    const selectedId = ref<string | null>(props.item.shownBy ?? '');

    // do not auto-select first player; keep selection empty to represent "no one" shown
    watch(() => props.players, (p) => { /* noop */ });

    // current unsure state for this item
    const currentUnsure = computed(() => !!props.item.unsure);

    // when selection changes, emit item update (selectedId may be null/empty)
    watch(selectedId, (val) => {
      emit('change', { itemId: props.item.id, playerId: val ? val : null, unsure: props.item.unsure ?? false });
    });

    // react to external changes of the item (e.g. other components updating the state)
    watch(() => props.item.shownBy, (val) => {
      selectedId.value = val ?? '';
    });

    function toggleUnsure() {
      const newUnsure = !(props.item.unsure ?? false);
      emit('change', { itemId: props.item.id, playerId: selectedId.value || null, unsure: newUnsure });
    }

    return { selectedId, currentUnsure, toggleUnsure };
  }
});
</script>
