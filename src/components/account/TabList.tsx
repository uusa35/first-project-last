import React, { useContext } from "react";
import { Tab } from "@headlessui/react";
import { AccountTab } from "@/components/account/AccountTab";
import AccountInfoIcon from "@/appIcons/account/info.svg";
import Password from "@/appIcons/account/password.svg";
import Aboutus from "@/appIcons/account/about_us.svg";
import BasicInfo from "@/appIcons/account/basic_info.svg";
import Description from "@/appIcons/account/description.svg";
import Links from "@/appIcons/account/links.svg";
import Payment from "@/appIcons/account/payment.svg";
import ShowPersonnalInfo from "@/appIcons/account/show_personal_info.svg";
import Type from "@/appIcons/account/type.svg";
import UploadImage from "@/appIcons/account/upload.svg";
import Services from "@/appIcons/account/services.svg";
import { MainContext } from "@/layouts/MainContentLayout";
import { appLinks } from "@/src/links";
import { useSearchParams } from "next/navigation";
import { Locale } from "@/types/index";

export interface Props {
  activeTab: String;
  lang: Locale["lang"];
  id: string;
}

export function TabList({ activeTab, lang, id }: Props) {
  const trans: { [key: string]: string } = React.useContext(MainContext);
  const searchParams = useSearchParams;

  return (
    <Tab.List
      className={`flex flex-col justify-start items-center w-full md:w-1/3 p-6 bg-expo-light gap-y-6 `}
      as={"div"}>
      <AccountTab
        title={<p>{trans.account_details}</p>}
        desc={<p>{trans.change_account_information}</p>}
        icon={<AccountInfoIcon className='w-6 h-6' />}
        active={activeTab === "0"}
        tab_index='0'
      />
      <AccountTab
        title={<p>{trans.modify_password}</p>}
        desc={<p>{trans.modify_your_password}</p>}
        icon={<Password className='w-6 h-6' />}
        active={activeTab === "1"}
        tab_index='1'
      />
      <AccountTab
        title={<p>{trans.basic_information}</p>}
        desc={<p>{trans.change_your_company_information}</p>}
        icon={<BasicInfo className='w-6 h-6' />}
        active={activeTab === "2"}
        tab_index='2'
      />
      <AccountTab
        title={<p>{trans.company_description}</p>}
        desc={<p>{trans.add_information_about_your_company}</p>}
        icon={<Description className='w-6 h-6' />}
        active={activeTab === "3"}
        tab_index='3'
      />
      <AccountTab
        title={<p>{trans.company_services}</p>}
        desc={<p>{trans.add_your_company_services}</p>}
        icon={<Services className='w-6 h-6' />}
        active={activeTab === "4"}
        tab_index='4'
      />
      <AccountTab
        title={<p>{trans.about_us}</p>}
        desc={<p>{trans.add_an_overview_of_your_company}</p>}
        icon={<Aboutus className='w-6 h-6' />}
        active={activeTab === "5"}
        tab_index='5'
      />
      <AccountTab
        title={<p>{trans.upload_the_pictures}</p>}
        desc={<p>{trans.upload_photos_of_your_company}</p>}
        icon={<UploadImage className='w-6 h-6' />}
        active={activeTab === "6"}
        tab_index='6'
      />
      <AccountTab
        title={<p>{trans.company_links}</p>}
        desc={<p>{trans.enter_the_company_links}</p>}
        icon={<Links className='w-6 h-6' />}
        active={activeTab === "7"}
        tab_index='7'
      />
      <AccountTab
        title={<p>{trans.subtype}</p>}
        desc={<p>{trans.choose_the_type_of_subscription_or_sponsorship}</p>}
        icon={<Type className='w-6 h-6' />}
        active={activeTab === "8"}
        tab_index='8'
      />
      <AccountTab
        title={<p>{trans.payment_process}</p>}
        desc={<p>{trans.go_to_the_payment_page}</p>}
        icon={<Payment className='w-6 h-6' />}
        active={activeTab === "9"}
        tab_index='9'
      />
      <AccountTab
        title={<p>{trans.View_profile}</p>}
        desc={<p>{trans.You_can_see_your_profile_from_here}</p>}
        icon={<ShowPersonnalInfo className='w-6 h-6' />}
        active={activeTab === "10"}
        tab_index="10"
        link={appLinks.userShow(lang, id)}
      />
    </Tab.List>
  );
}
