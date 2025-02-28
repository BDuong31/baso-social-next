import { useRouter } from "next/navigation";

import { Button } from "@/components/button";
import { ArrowBackIcon } from "@/components/icons";
import { Typography } from "@/components/typography";
import { useTranslation } from "react-i18next";
import { useUserProfile } from "@/context/user-context";

export default function HeaderFollowers() {
    const { userProfile } = useUserProfile();
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <section className="mt-[3rem] md:mt-0 mb-3 flex gap-5 items-center">
            <Button
                child={<ArrowBackIcon />}
                disabled={false}
                onClick={() => router.back()}
                className="size-[44px]"
            />
            <Typography level="title" className="dark:text-secondary text-surface-2">
                {userProfile?.firstName} {userProfile?.lastName}
            </Typography>
        </section>
    )
}