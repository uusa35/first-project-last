import InputLabel from "@/components/InputLabel";
import { TextEditor } from "@/components/TextEditor";
import { MainContext } from "@/layouts/MainContentLayout";
import { useAppSelector } from "@/redux/hooks";
import { Tab } from "@headlessui/react";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsData = {
  aboutus: {
    ar: string;
    en: string;
    ru: string;
  };
};

type Props = {
  default_data: InputsData;
  onSubmit: SubmitHandler<InputsData>;
};

export default function AboutUs({ default_data, onSubmit }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
  }: any = useForm({
    defaultValues: default_data,
  });

  // console.log(getValues());
  return (
    <Tab.Panel>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-8 ${isLoading && "hidden"}`}>
        <h1 className='text-2xl mb-10 mt-5'>
          {trans.register_to_participate_in_the_exhibition}
        </h1>

        <InputLabel value='نبذه عنا' />
        <TextEditor
          defaultValue={getValues("aboutus.en")}
          language='ar'
          name='aboutus'
          setValue={setValue}
        />

        <InputLabel value='About Us' />
        <TextEditor
          defaultValue={getValues("aboutus.en")}
          language='en'
          name='aboutus'
          setValue={setValue}
        />

        <InputLabel value='О нас' />
        <TextEditor
          defaultValue={getValues("aboutus.ru")}
          language='ru'
          name='aboutus'
          setValue={setValue}
        />

        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <button type='submit' className='btn-default'>
            {trans.continue}
          </button>
        </div>
      </form>
    </Tab.Panel>
  );
}
