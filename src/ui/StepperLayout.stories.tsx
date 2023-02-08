import type { ComponentStory, ComponentMeta } from "@storybook/react";

import StepperLayout from "./StepperLayout";

export default {} as ComponentMeta<typeof StepperLayout>;

const Template: ComponentStory<typeof StepperLayout> = (args) => (
  <StepperLayout {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: <p>STEP 1</p>,
};
