"use client";
import { useContext } from "react";
import {
  useLazyUploadImageQuery,
  useUpdateUserMutation,
} from "@/redux/api/authApi";
import { Tab } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, updateUserSchema } from "@/src/validations";
import { disableLoading, enableLoading } from "@/redux/slices/settingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MainContext } from "@/layouts/MainContentLayout";
import { AppQueryResult, Category, Country, Role, User } from "@/types/queries";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { map, omit, pick, toNumber, toString } from "lodash";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useLazyUploadImagesQuery } from "@/redux/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AccountInfo } from "@/components/account/tabs/AccountInfo";
import { TabList } from "@/components/account/TabList";
import { ModifyPassword } from "@/components/account/tabs/ModifyPassword";
import BasicInfo from "@/components/account/tabs/BasicInfo";
import CompanyDescription from "@/components/account/tabs/CompanyDescription";
import CompanyServices from "@/components/account/tabs/CompanyServices";
import AboutUs from "@/components/account/tabs/AboutUs";
import UploadPhotos from "@/components/account/tabs/UploadPhotos";
import CompanyLinks from "@/components/account/tabs/CompanyLinks";
import SubscriptionType from "@/components/account/tabs/SubscriptionType";
import AccountSteps from "@/components/account/AccountSteps";
import { MobileStepper } from "@mui/material";
import { Locale } from "@/types/index";

type Inputs = {
  username?: string;
  email?: string;
  image?: File | string;
  country_id?: string;
  role?: Role["name"];
  name?: any;
  description?: any;
  services?: any;
  aboutus?: any;
  caption?: any;
  categories?: [] | undefined;
  tags?: [] | undefined;
  mobile?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  snap?: string;
  tiktok?: string;
  linked?: string;
  iphone?: string;
  android?: string;
  longitude?: string;
  latitude?: string;
  keywords?: string;
  website?: string;
  images?: [];
  address?: string;
  thumb?: File | string;
};
type Props = {
  element: User;
  countries: Country[];
  categories: AppQueryResult<Category[]>;
  lang: Locale["lang"];
  role: Role["name"];
  id: string;
};
export default function ({
  element,
  countries,
  categories,
  role,
  lang,
  id,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get("active_tab") ?? "0";
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [triggerUpdateUser, { data: user, error, isSuccess }] =
    useUpdateUserMutation();
  const [triggerUploadImage] = useLazyUploadImageQuery();
  const [triggerUploadImages] = useLazyUploadImagesQuery();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
  }: any = useForm<User>({
    // resolver: yupResolver(updateUserSchema),
    defaultValues: {
      ...(isSuccess && user
        ? omit(user, [
            "image",
            "images",
            "country",
            "tags",
            "categories",
            "roles",
            "orders",
            "id",
            "name",
            "description",
            "aboutus",
            "services",
            "address",
          ])
        : omit(element, [
            "image",
            "images",
            "country",
            "tags",
            "categories",
            "role",
            "orders",
            "id",
            "name",
            "description",
            "aboutus",
            "services",
            "address",
          ])),
      categories:
        isSuccess && user
          ? map(user.categories, "id")
          : map(element.categories, "id"),
      tags: isSuccess && user ? map(user.tags, "id") : map(element.tags, "id"),
      role: isSuccess && user ? user.roles[0].name : element.roles[0].name,
      name: {
        ar: user?.name?.ar ?? element?.name?.ar ?? "",
        en: user?.name?.en ?? element?.name?.en ?? "",
        ru: user?.name?.ru ?? element?.name?.ru ?? "",
      },
      description: {
        ar: user?.description?.ar ?? element?.description?.ar ?? "",
        en: user?.description?.en ?? element?.description?.en ?? "",
        ru: user?.description?.ru ?? element?.description?.ru ?? "",
      },
      caption: {
        ar: user?.caption?.ar ?? element?.caption?.ar ?? "",
        en: user?.caption?.en ?? element?.caption?.en ?? "",
        ru: user?.caption?.ru ?? element?.caption?.ru ?? "",
      },
      services: {
        ar: user?.services?.ar ?? element?.services?.ar ?? "",
        en: user?.services?.en ?? element?.services?.en ?? "",
        ru: user?.services?.ru ?? element?.services?.ru ?? "",
      },
      aboutus: {
        ar: user?.aboutus?.ar ?? element?.aboutus?.ar ?? "",
        en: user?.aboutus?.en ?? element?.aboutus?.en ?? "",
        ru: user?.aboutus?.ru ?? element?.aboutus?.ru ?? "",
      },
      address: "",
      image: ``,
      images: [],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (body: any) => {
    dispatch(enableLoading());
    await triggerUpdateUser({
      body: {
        ...body,
        ...(body.address ? { address: [body.address] } : {}),
      },
      id: element.id,
    })
      .then((r: any) => {
        if (r && r.data) {
          dispatch(showSuccessToastMessage({ content: trans.process_success }));
          // navigate
          // router.push(
          //   `${
          //     pathname + "?active_tab=" + (parseInt(activeTab) + 1).toString()
          //   }`
          // );
          dispatch(disableLoading());
        } else if (r && r.error && r.error.data) {
          dispatch(
            showErrorToastMessage({
              content: `${r.error.data.message}`,
            })
          );
          dispatch(disableLoading());
        }
      })
      .then(() => {
        if (body.image && body.image[0]) {
          const formData = new FormData();
          formData.append("image", body.image[0]);
          formData.append("name", "image");
          formData.append("model", "user");
          formData.append("id", toString(element.id));
          triggerUploadImage(formData);
        }
      });
  };

  const handleImages = async (imagesGroup: any) => {
    if (imagesGroup.length > 1 && imagesGroup.length <= 10) {
      let formData = new FormData();
      for (let i = 0; i < imagesGroup.length; i++) {
        formData.append(`images[${i}]`, imagesGroup[i]);
      }
      formData.append("model", "user");
      formData.append("id", toString(element.id));
      await triggerUploadImages(formData).then((r: any) => {
        if (r.data && r.data.message) {
          dispatch(showSuccessToastMessage({ content: r.data.message }));
          router.refresh();
        } else if (r.error && r.error.data?.message) {
          dispatch(showErrorToastMessage({ content: r.error.data.message }));
        }
      });
    }
  };

  const handleImage = async (image: File | undefined) => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", "image");
      formData.append("model", "user");
      formData.append("id", toString(element.id));
      await triggerUploadImage(formData).then((r: any) => {
        // console.log({ r });
        if (r.data && r.data.message) {
          router.refresh();
          dispatch(showSuccessToastMessage({ content: r.data.message }));
        } else if (r.error && r.error.data?.message) {
          dispatch(showErrorToastMessage({ content: r.error.data.message }));
        }
      });
    }
  };
  console.log({ element });

  return (
    <Tab.Group
      vertical={true}
      as={`div`}
      className={`flex flex-col md:flex-row p-3 md:p-0`}
      selectedIndex={toNumber(activeTab)}
    >
      <TabList lang={lang} id={id} activeTab={activeTab} role={role} />

      <Tab.Panels as={"div"} className={`flex w-full md:w-2/3 p-4 flex-col`}>
        {activeTab !== "0" && activeTab !== "1" && (
          <AccountSteps active_tab={activeTab} />
        )}
        <LoadingSpinner isLoading={isLoading} />
        <AccountInfo
          onSubmit={onSubmit}
          default_data={{
            ...pick(isSuccess && user ? user : element, [
              "id",
              "username",
              "phone",
              "email",
            ]),
            role: isSuccess && user ? user.role?.name : element.roles[0]?.name,
          }}
        />
        <ModifyPassword />
        {role === "company" ? (
          <>
            <BasicInfo
              categories={categories.data}
              onSubmit={onSubmit}
              countries={countries}
              default_data={{
                ...pick(isSuccess && user ? user : element, [
                  "name",
                  "caption",
                  "categories",
                  "country_id",
                  "keywords",
                ]),
                address:
                  isSuccess && user && user.address
                    ? user.address[0]
                    : element.address && element.address[0],
              }}
            />
            <CompanyDescription
              onSubmit={onSubmit}
              default_data={{
                description: {
                  ar: user?.description?.ar ?? element?.description?.ar ?? "",
                  en: user?.description?.en ?? element?.description?.en ?? "",
                  ru: user?.description?.ru ?? element?.description?.ru ?? "",
                },
              }}
            />
            <CompanyServices
              onSubmit={onSubmit}
              default_data={{
                services: {
                  ar: user?.services?.ar ?? element?.services?.ar ?? "",
                  en: user?.services?.en ?? element?.services?.en ?? "",
                  ru: user?.services?.ru ?? element?.services?.ru ?? "",
                },
              }}
            />
            <AboutUs
              onSubmit={onSubmit}
              default_data={{
                aboutus: {
                  ar: user?.aboutus?.ar ?? element?.aboutus?.ar ?? "",
                  en: user?.aboutus?.en ?? element?.aboutus?.en ?? "",
                  ru: user?.aboutus?.ru ?? element?.aboutus?.ru ?? "",
                },
              }}
            />
            <UploadPhotos
              handleImage={handleImage}
              submitImages={handleImages}
              default_data={{
                image: user?.thumb || element?.thumb || "",
                images: user?.images || element?.images || [],
              }}
            />
            <CompanyLinks
              onSubmit={onSubmit}
              default_data={{
                ...pick(isSuccess && user ? user : element, [
                  "website",
                  "twitter",
                  "facebook",
                  "instagram",
                  "snap",
                  "tiktok",
                  "linked",
                  "iphone",
                  "android",
                ]),
              }}
            />
            <SubscriptionType lang={lang} />
          </>
        ) : null}

        <MobileStepper
          variant="dots"
          steps={11}
          position="static"
          activeStep={parseInt(activeTab)}
          sx={[
            {
              maxWidth: 400,
              flexGrow: 1,
              marginInline: "auto",
            },
            {
              "& .MuiMobileStepper-dotActive": {
                backgroundColor: "#006838",
              },
            },
          ]}
          nextButton={<></>}
          backButton={<></>}
        />
      </Tab.Panels>
    </Tab.Group>
  );
}
