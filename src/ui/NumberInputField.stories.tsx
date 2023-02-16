import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { withFormik } from "@bbbtech/storybook-formik";
import NumberInputField from "./NumberInputField";
import * as Yup from "yup";

export default {
  title: "UI/NumberInputField",
  component: NumberInputField,
  parameters: {
    formik: {
      initialValues: {
        amount: undefined,
      },
      validationSchema: Yup.object({
        amount: Yup.number()
          .required("Required")
          .test(
            "is-divisible-by-2",
            "Must be divisible by 2",
            (value) => value % 2 === 0
          ),
      }),
    },
  },
  decorators: [withFormik],
} as ComponentMeta<typeof NumberInputField>;

const Template: ComponentStory<typeof NumberInputField> = (args) => (
  <NumberInputField {...args} name="amount" />
);

export const Default = Template.bind({});
Default.args = {
  label: "Amount",
  hint: "This is a hint",
  min: 0,
  max: 100,
};
