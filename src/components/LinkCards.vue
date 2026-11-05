<script setup>
import { linkCards } from '@/utils/constants'
const cardRows = linkCards.map((row, ri) => row.map((card, ci) => ({ ...card, id: String(ri * 3 + ci + 1) })))
</script>

<template>
  <div v-for="(row, ri) in cardRows" :key="ri" class="row" :style="ri > 0 ? 'margin-top: 1.5rem;' : ''">
    <div v-for="(card, ci) in row" :key="card.id" class="col" :class="{ '2': ci === 1 }">
      <component :is="card.url ? 'a' : 'span'" :aria-disabled="!card.url || undefined" :id="`link-url-${card.id}`" :href="card.url" target="_blank">
        <div class="link-card cards">
          <i :class="card.icon" :id="`link-icon-${card.id}`"></i>
          <span class="link-name" :id="`link-name-${card.id}`">{{ card.name }}</span>
        </div>
      </component>
    </div>
  </div>
</template>
