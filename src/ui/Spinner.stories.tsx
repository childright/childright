import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Spinner from "./Spinner";

export default {
  title: "UI/Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = () => <Spinner />;

export const Default = Template.bind({});
