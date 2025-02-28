import { useRouter } from "next/navigation";

import { Button } from "@/components/button";
import { ArrowBackIcon, CameraIcon, TrashIcon } from "@/components/icons";
import { Typography } from "@/components/typography";
import { useTranslation } from "react-i18next";

interface HeaderEditProps {
    onSaved: () => void;
    onClickCamera: () => void;
}
export default function HeaderEdit({ onSaved, onClickCamera}: HeaderEditProps){
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <div className="absolute top-0 left-0 w-full flex justify-between items-center gap-2 p-3 z-10">
                <Button
                    onClick={() => router.back()}
                    className="size-[44px]"
                    child={<ArrowBackIcon />}
                />
                <Button
                    className="size-[44px] ml-auto"
                    child={<TrashIcon />}
                />
                <Button
                    className="size-[44px]"
                    child={<CameraIcon />}
                    onClick={onClickCamera}
                />
                <Button
                    className="py-3 px-6"
                    onClick={onSaved}
                    child={
                        <Typography level='base2sm' className='dark:text-secondary text-surface-2'>
                            {t('save')}
                        </Typography>
                    }
                />
        </div>  
    )
}