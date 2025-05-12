# 🌿 Tell Lore: AI-Powered Interactive Storytelling

Built at the [AI Work & Life Hackathon](https://x.com/Jhuang0804/status/1921365087492747323) in NYC, May 2025.

Won [Lore](https://x.com/zehranaqvi_)'s track _For the Obsessesed_.

Watch our demo [here](https://x.com/Jhuang0804/status/1921365106698375379).

## ✨ What We Built

**Tell Lore** is a drag-and-drop canvas for creating _interactive_, _animated_ stories — no coding, no animating, just storytelling.

With Tell Lore, you can:

-   Describe each scene in natural language
-   Define choices for the reader to react to
-   Visually connect scenes with branching logic
-   Submit your story and export it to structured JSON
-   Generate fully animated scenes using AI tools like **Pika Labs**
-   Deliver an explorable, cinematic experience — as magical as Studio Ghibli

## 💡 Why We Built It

Interactive storytelling is powerful — it transforms audiences into participants. But creating it traditionally requires:

-   Writing a branching narrative
-   Storyboarding dozens of scenes
-   Animating each one individually
-   Coding transitions and logic

We wanted to change that.

Our mission:  
**Make interactive storytelling as simple as typing a story and connecting the dots.**

Whether you're a teacher, a parent, a writer, or a child — you should be able to bring your story to life and let others explore it.

## 🧠 How It Works

-   Scenes are created as visual blocks on a canvas
-   Each scene includes:
    -   A title
    -   A description ("scenario")
    -   Two choices
-   Choices can be dragged to connect to the next scene
-   You can edit everything inline, visually
-   When you're done, click **Submit** to export a `story.json` and power your interactive player or AI video pipeline

## 🛠 Tech Stack

-   **Next.js, React, and TypeScript** — frontend
-   **@xyflow/react** (React Flow) — interactive graph editor
-   **Pika Labs** — AI video generation from scenes
-   **Tailwind CSS** — lightweight UI
