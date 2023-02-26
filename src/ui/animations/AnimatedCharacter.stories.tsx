import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { AbsoluteAnimatedCharacter } from "./AnimatedCharacter";

export default {
  title: "Animations/AnimatedCharacter",
  component: AbsoluteAnimatedCharacter,
} as ComponentMeta<typeof AbsoluteAnimatedCharacter>;

const Template: ComponentStory<typeof AbsoluteAnimatedCharacter> = () => (
  <div className="h-screen">
    <AbsoluteAnimatedCharacter />
  </div>
);

export const Default = Template.bind({});
