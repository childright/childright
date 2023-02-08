import { api } from "../../utils/api";
import { RadioGroup } from "@headlessui/react";
import type { FC } from "react";
import { useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import Button from "../../ui/Button";

const StepperPage: FC = () => {
  const user = api.user.me.useQuery();

  const utils = api.useContext();

  const saveMutation = api.step1.save.useMutation({
    onSuccess: () => utils.user.getCurrentStep.invalidate(),
  });

  const [isParent, setIsParent] = useState<boolean | undefined>(undefined);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);

  if (user.data === null) {
    return <>Error</>;
  } else if (user.data === undefined) {
    return <>Loading...</>;
  }

  return (
    <div className="h-full w-full border-8">
      <RadioGroup value={isParent} onChange={setIsParent}>
        <RadioGroup.Option value={true}>
          {({ checked }) => (
            <div>
              <input type="radio" checked={checked} /> Elternteil
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value={false}>
          {({ checked }) => (
            <div>
              <input type="radio" checked={checked} /> Kind
            </div>
          )}
        </RadioGroup.Option>
      </RadioGroup>

      {isParent === false && (
        <div className="flex rounded-md bg-white p-2">
          <p className="mr-3">Geburtsdatum:</p>
          <DatePicker onChange={setBirthDate} value={birthDate} />
        </div>
      )}

      <Button
        intent="secondary"
        disabled={
          isParent === undefined ||
          (isParent === false && birthDate === undefined)
        }
        onClick={() =>
          saveMutation.mutate({
            isParent: isParent as boolean,
            birthDate: birthDate,
          })
        }
      >
        Weiter
      </Button>
    </div>
  );
};

export default StepperPage;
