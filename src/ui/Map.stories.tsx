import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Map from "./Map";

export default {
  title: "UI/Map",
  component: Map,
} as ComponentMeta<typeof Map>;

const Template: ComponentStory<typeof Map> = () => (
  <div className="h-screen w-screen">
    <Map />
  </div>
);

export const Default = Template.bind({});
