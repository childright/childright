import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { withFormik } from "@bbbtech/storybook-formik";
import InputField from "./InputField";

export default {
  title: "UI/InputField",
  component: InputField,
  parameters: {
    formik: {
      initialValues: {
        firstName: "",
      },
    },
  },
  decorators: [withFormik],
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} name="firstName" />
);

export const Default = Template.bind({});
Default.args = {
  label: "First Name",
  hint: "This is a hint",
};
