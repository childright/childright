import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { boolean } from "zod";

const Step1Page: NextPage = () => {
  const user = api.user.me.useQuery();
  const saveMutation = api.step1.save.useMutation();

  const [isParent, setIsParent] = useState<boolean | undefined>(undefined);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);

  if (user.data === null) {
    return <>Error</>;
  } else if (user.data === undefined) {
    return <>Loading...</>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <RadioGroup
        value={isParent}
        onChange={setIsParent}
        className=" text-white"
      >
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

      <button
        className="m-3 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
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
      </button>
    </main>
  );
};

export default Step1Page;
