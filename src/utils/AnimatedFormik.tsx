import type { FormikConfig, FormikValues } from "formik";
import { Formik } from "formik";
import React from "react";
import useRiveStateInput from "../hooks/useRiveStateInput";

/* export const ErrorListener = () => {
  const formik = useFormikContext();
  const [submitCount, setSubmitCount] = useState(formik.submitCount);

  const validationFail = useRiveStateInput("validation fail");

  useEffect(() => {
    if (
      !formik.isValidating &&
      !formik.isSubmitting &&
      formik.errors &&
      formik.submitCount > submitCount
    ) {
      validationFail?.fire();

      setSubmitCount(formik.submitCount);
    }
  }, [
    formik.errors,
    formik.isSubmitting,
    formik.isValidating,
    formik.submitCount,
    submitCount,
    validationFail,
  ]);

  return null;
}; */

function AnimatedFormik<T extends FormikValues>(props: FormikConfig<T>) {
  const validationSuccess = useRiveStateInput("validation success");

  return (
    <Formik
      {...props}
      onSubmit={(...args) => {
        validationSuccess?.fire();
        props.onSubmit(...args);
      }}
    >
      {props.children}
    </Formik>
  );
}

export default AnimatedFormik;
