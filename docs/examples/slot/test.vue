<template>
  <div>
    <A>
      <template v-slot:slot1="slotProps1">
        <slot name="slot1" v-bind="slotProps1" />
      </template>
      <template v-slot:slot2="slotProps2">
        <slot name="slot2" v-bind="slotProps2" />
      </template>
      <template v-slot:slot3>
        <slot name="slot3" />
      </template>
    </A>
  </div>
</template>
