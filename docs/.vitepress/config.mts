import { defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "<Beer />",
  description: "A VitePress Site",
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    codeTransformers: [transformerTwoslash()],
  },
  themeConfig: {
    search: {
      provider: "local",
    },
    logo: "/assets/logo.png",
    sidebar: [
      {
        text: "Getting Started",
        items: [
          {
            text: "At Glance",
            link: "/at-glance",
          },
          {
            text: "Quick Start",
            link: "/quick-start",
          },
          {
            text: "Tutorial",
            link: "/tutorial",
          },
          {
            text: "Table of Content",
            link: "/table-of-content",
          },
        ],
      },
      {
        text: "Essential",
        collapsed: true,
        items: [
          {
            text: "Structure",
            link: "/essential/structure",
          },
          {
            text: "Route",
            link: "/essential/route",
          },
          {
            text: "Handler",
            link: "/essential/handler",
          },
          {
            text: "Life Cycle",
            link: "/essential/life-cycle",
          },
          {
            text: "Validation",
            link: "/essential/validation",
          },
          {
            text: "Plugin",
            link: "/essential/plugin",
          },
        ],
      },
      {
        text: "Patterns",
        collapsed: true,
        items: [
          {
            text: "Configuration",
            link: "/patterns/configuration",
          },
          {
            text: "Cookie",
            link: "/patterns/cookie",
          },
          {
            text: "Web Socket",
            link: "/patterns/websocket",
          },
          {
            text: "Unit Test",
            link: "/patterns/unit-test",
          },
          {
            text: "Mount",
            link: "/patterns/mount",
          },
          {
            text: "Trace",
            link: "/patterns/trace",
          },
        ],
      },
      {
        text: "Recipe",
        collapsed: true,
        items: [
          {
            text: "OpenAPI",
            link: "/recipe/openapi",
          },
          {
            text: "Opentelemetry",
            link: "/recipe/opentelemetry",
          },
          {
            text: "Drizzle",
            link: "/recipe/drizzle",
          },
          {
            text: "React Email",
            link: "/recipe/react-email",
          },
        ],
      },
      {
        text: "Eden",
        collapsed: true,
        items: [
          {
            text: "Overview",
            link: "/eden/overview.md",
          },
          {
            text: "Installation",
            link: "/eden/installation.md",
          },
          {
            text: "Eden Treaty",
            collapsed: false,
            items: [
              {
                text: "Overview",
                link: "/eden/treaty/overview",
              },
              {
                text: "Parameters",
                link: "/eden/treaty/parameters",
              },
              {
                text: "Response",
                link: "/eden/treaty/response",
              },
              {
                text: "Web Socket",
                link: "/eden/treaty/websocket",
              },
              {
                text: "Config",
                link: "/eden/treaty/config",
              },
              {
                text: "Unit Test",
                link: "/eden/treaty/unit-test",
              },
              {
                text: "Legacy (Treaty 1)",
                link: "/eden/treaty/legacy.md",
              },
            ],
          },
          {
            text: "Eden Fetch",
            link: "/eden/fetch.md",
          },
        ],
      },
      {
        text: "Plugins",
        collapsed: true,
        items: [
          {
            text: "Overview",
            link: "/plugins/overview",
          },
          {
            text: "Bearer",
            link: "/plugins/bearer",
          },
          {
            text: "CORS",
            link: "/plugins/cors",
          },
          {
            text: "Cron",
            link: "/plugins/cron",
          },
          {
            text: "GraphQL Apollo",
            link: "/plugins/graphql-apollo",
          },
          {
            text: "GraphQL Yoga",
            link: "/plugins/graphql-yoga",
          },
          {
            text: "HTML",
            link: "/plugins/html",
          },
          {
            text: "JWT",
            link: "/plugins/jwt",
          },
          {
            text: "OpenTelemetry",
            link: "/plugins/opentelemetry",
          },
          {
            text: "Server Timing",
            link: "/plugins/server-timing",
          },
          {
            text: "Static",
            link: "/plugins/static",
          },
          {
            text: "Stream",
            link: "/plugins/stream",
          },
          {
            text: "Swagger",
            link: "/plugins/swagger",
          },
          {
            text: "trpc",
            link: "/plugins/trpc",
          },
        ],
      },
      {
        text: "Integration",
        collapsed: true,
        items: [
          {
            text: "Nextjs",
            link: "/integrations/nextjs",
          },
          {
            text: "Expo",
            link: "/integrations/expo",
          },
          {
            text: "Astro",
            link: "/integrations/astro",
          },
          {
            text: "SvelteKit",
            link: "/integrations/sveltekit",
          },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/chanwit-y" },
      { icon: "twitter", link: "" },
      { icon: "discord", link: "" },
    ],
  },
});
