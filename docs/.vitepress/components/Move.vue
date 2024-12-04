<script setup lang="ts">
import { getHighlighter, Highlighter } from 'shiki'
import { ShikiMagicMove } from 'shiki-magic-move/vue'
import { ref, shallowRef } from 'vue'

const highlighter = ref<Highlighter>()

const loadingPromise = shallowRef<Promise<void> | undefined>(getHighlighter({
	themes: [ 'vitesse-dark'],
	langs: ['javascript', 'typescript', 'json'],
}).then((h) => {
	highlighter.value = h
	loadingPromise.value = undefined
}))
const begin = `{
      if: {
        leftTerm: {
          leftTerm: 1,
          operator: "=",
          rightTerm: 1,
        },
        operator: "and",
        rightTerm: {
          leftTerm: 1,
          operator: "=",
          rightTerm: 1,
        },
      },
      then: "Yes",
      else: "No",
      as: "result",
    }`
const code = ref(begin);


function animate() {
	code.value = `{
      result: {
        $cond: {
          if: {
            $and: [{ $eq: [1, 1] }, { $eq: [1, 1] }],
          },
          then: "Yes",
          else: "No",
        },
      },
  }`
}

function reset() {
  code.value = begin
}
</script>

<template>
	<div v-if="highlighter" class="" >
		<ShikiMagicMove class="p-2 rounded-md" lang="json" theme="vitesse-dark" :highlighter="highlighter" :code="code"
			:options="{ duration: 800, stagger: 0.3 }" />
		<button @click="animate">
			Animate
		</button>
    <button @click="reset">
      Reset
    </button>
	</div>

</template>