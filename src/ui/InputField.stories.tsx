import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { withFormik } from "@bbbtech/storybook-formik";
import TextInputField from "./TextInputField";
import * as Yup from "yup";

export default {
  title: "UI/TextInputField",
  component: TextInputField,
  parameters: {
    formik: {
      initialValues: {
        firstName: "",
      },
      validationSchema: Yup.object().shape({
        firstName: Yup.string().required().min(3).max(7),
      }),
    },
  },
  decorators: [withFormik],
} as ComponentMeta<typeof TextInputField>;

const Template: ComponentStory<typeof TextInputField> = (args) => (
  <TextInputField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "firstName",
  label: "First Name",
  placeholder: "First Name",
};
