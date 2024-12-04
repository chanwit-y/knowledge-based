<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.home">
    <h1 class="text-red-700">{{ site.title }}</h1>
    <p>{{ site.description }}</p>
    <ul>
      <li><a href="/markdown-examples.html">Markdown Examples</a></li>
      <li><a href="/api-examples.html">API Examples</a></li>
    </ul>
  </div>
  <div v-else>
    <DefaultTheme.Layout>

      <template #doc-top>
        <!-- <div class="h-[220px] top-0 left-0 opacity-25 dark:opacity-[.55] pointer-events-none"> -->
        <div
          class="absolute flex flex-col z-[40] w-full !max-w-full items-center justify-center bg-transparent transition-bg overflow-hidden h-[220px] top-0 left-0 opacity-25 dark:opacity-[.55] pointer-events-none">
          <div class="jumbo absolute opacity-60 -animated" />
          <!-- </div> -->
        </div>
        <button>Click</button>
        <!-- <div id="box" class="absolute top-10 left-10 w-5 h-5 bg-slate-50" /> -->
        <!-- <Content /> -->
      </template>
    </DefaultTheme.Layout>
    <!-- <a href="/">Home</a> -->
    <!-- <Content /> -->
  </div>
</template>
