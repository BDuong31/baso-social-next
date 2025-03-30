import { table } from "console";
import { Typography } from "../typography";
import { MoreIcon, TrashIcon } from "../icons";
import { ToggleBlock } from "@/components/toggleBlock";
import { IUserProfile } from "@/interfaces/user";
import React from "react";
import { adminUpdateUserProfile, deleteUserProfile } from "@/apis/user";
import MoreOptions from "@/sections/admin/components/more-options";
import { Delete } from "lucide-react";
import { DeleteUser, EditForm } from "@/sections/admin/components";
import { ITopic } from "@/interfaces/topic";
import { usePost } from "@/context/post-context";
import { Button } from "../button";
import DeleteTopic from "@/sections/admin/components/delete-topic";
import { useTranslation } from "react-i18next";

interface Props {
    data: ITopic[];
}

function TableTopic(
    {data}: Props
){
    let i = 1;
    const [openMenuId, setOpenMenuId] = React.useState<boolean>(false);
    const [isDeleted, setIsDeleted] = React.useState<boolean>(false);
    const [ isTopic, setIsTopic] = React.useState<ITopic>(null);
    const { posts } = usePost();
    const [ loading , setLoading] = React.useState<boolean>(false);
    const formatDate = (dateStr: string) => {
        const dateObj = new Date(dateStr);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
      };    
    const { t } = useTranslation();
    return (
        <>
            <table className="w-[100%]">
                <thead className="sticky top-0 z-10 bg-[#EFEFEF]">
                    <td className="pt-2 pb-2">
                        <Typography level="base2sm">{t('topic no')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('topic name')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('topic color')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('total post')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('action')}</Typography>
                    </td>
                </thead>
                <tbody className="pb-2 bg-[#EFEFEF]">
                    {data.map((topic: ITopic)=>(
                        <tr key={topic.id}>
                            <td>{i++}</td>
                            <td>
                                <Typography level="base2sm">{topic.name}</Typography>
                            </td>
                            <td>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: topic.color }}></div>
                                    <Typography level="base2sm">{topic.color}</Typography>
                                </div>
                            </td>
                            <td>
                                <Typography level="base2sm">{posts.filter(post => post.topic.id === topic.id).length}</Typography>
                            </td>
                            <td>
                                <Button
                                    type="button"
                                    className="size-[44px] min-w-[44px]"
                                    child={<TrashIcon />}
                                    onClick={() =>{
                                        setIsDeleted(true);
                                        setIsTopic(topic);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isDeleted && (
                <DeleteTopic
                    data={isTopic}
                    onClick={() => {
                        setLoading(true);
                        deleteUserProfile(isTopic.id)
                            .then((response) => {
                                console.log("Delete topic success:", response);
                                setLoading(false);
                                setIsDeleted(false);
                                setIsTopic(null);
                            })
                            .catch((error) => {
                                console.error("Error deleting topic:", error);
                                setLoading(false);
                            });
                    }}
                    onClose={() => {
                        setIsDeleted(false);
                        setIsTopic(null);
                    }}
                />
            )}
        </>
    )
}

export default TableTopic;