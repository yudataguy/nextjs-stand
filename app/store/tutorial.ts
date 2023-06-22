import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";

export const DEFAULT_TUTORIAL = {
  run: false,
  stepIndex: 0,
  steps: [
    {
      content: "Let's begin our journey!",
      //   locale: { skip: <strong aria-label="skip">SKIP</strong> },
      placement: "center",
      target: "body",
    },
    {
      content: "These are our super awesome projects!",
      placement: "bottom",
      target: ".newChatButton",
      title: "Projects",
    },
    {
      content: "You can also create new projects by clicking here",
      placement: "bottom",
      target: ".languageButton",
      title: "New Project",
    },
    {
      content: "You can also create new projects by clicking here",
      placement: "bottom",
      target: ".new-project",
      title: "New Project",
    },
  ],
};

export type Tutorial = typeof DEFAULT_TUTORIAL;

export type TutorialStore = Tutorial & {
  reset: () => void;
  update: (updater: (tutorial: Tutorial) => void) => void;
};

export const useTutorialStore = create<TutorialStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_TUTORIAL,

      reset() {
        set(() => ({ ...DEFAULT_TUTORIAL }));
      },

      update(updater) {
        const config = { ...get() };
        updater(config);
        set(() => config);
      },
    }),
    {
      name: StoreKey.Tutorial,
      version: 2,
      migrate(persistedState, version) {
        if (version === 2) return persistedState as any;

        const state = persistedState as Tutorial;

        return state;
      },
    },
  ),
);
