import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { withFormik } from "@bbbtech/storybook-formik";
import DatePickerField from "./DatePickerField";
import * as Yup from "yup";

export default {
  title: "UI/DatePickerField",
  component: DatePickerField,
  parameters: {
    formik: {
      initialValues: {
        birthday: "",
      },
      validationSchema: Yup.object().shape({
        firstName: Yup.date().required(),
      }),
    },
  },
  decorators: [withFormik],
} as ComponentMeta<typeof DatePickerField>;

const Template: ComponentStory<typeof DatePickerField> = (args) => (
  <DatePickerField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "birthday",
};
