import type { ComponentStory, ComponentMeta } from "@storybook/react";
import AnimatedCharacter from "./AnimatedWizard";

export default {
  title: "Animations/AnimatedWizard",
  component: AnimatedCharacter,
} as ComponentMeta<typeof AnimatedCharacter>;

const Template: ComponentStory<typeof AnimatedCharacter> = () => (
  <div className="h-screen">
    <AnimatedCharacter />
  </div>
);

export const Default = Template.bind({});
