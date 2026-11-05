# Motion graphics

Title cards, supers, and lower-thirds.

**Input:** the on-screen strings and the master safe area.

**Output:** `motion.json`. The sample picture is drawn by `engine/rendering/SampleShort.tsx`, which calls `timing.ts` for the title-card window (from 0 until 0.4s after the first caption starts).

Safe area used by the sample: 220px top, 80px left and right, 280px bottom. That is a starting pad so Instagram, TikTok, and YouTube chrome are less likely to cover type. It is not a substitute for checking a phone.

Do not add a super the script does not contain. The role spec is [the motion designer](../../agents/motion-designer.md).
