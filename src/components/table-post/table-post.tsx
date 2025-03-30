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
import { IPost } from "@/interfaces/post";
import { Button } from "../button";
import { useTranslation } from "react-i18next";

interface Props {
    data: IPost[];
}

function TablePost(
    {data}: Props
){
    let i = 1;
    const [openMenuId, setOpenMenuId] = React.useState<boolean>(false);
    const [isDeleted, setIsDeleted] = React.useState<boolean>(false);
    const [isUserDeleted, setIsUserDeleted] = React.useState<IUserProfile>(null);
    const [isUserUpdated, setIsUserUpdated] = React.useState<IUserProfile>(null);
    const [openUpdateId, setOpenUpdateId] = React.useState<string | null>(null);
    const [ loading , setLoading] = React.useState<boolean>(false);
    const { t } = useTranslation();
    const formatDate = (dateStr: string) => {
        const dateObj = new Date(dateStr);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
      };    
    return (
        <>
            <table className="w-[100%]">
                <thead className="sticky top-0 z-10 bg-[#EFEFEF]">
                    <td className="pt-2 pb-2">
                        <Typography level="base2sm">{t('post no')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('post imgae')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('post content')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('topic')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('author')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('create date')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('action')}</Typography>
                    </td>
                </thead>
                <tbody className="pb-2 bg-[#EFEFEF]">
                    {data.map((post: IPost)=>(
                        <tr key={post.id}>
                            <td>{i++}</td>
                            <td>
                                <img 
                                    src={post.image} 
                                    alt="Post" 
                                    className="w-[50px] h-[50px] object-cover rounded-[0.5rem]"/>
                            </td>
                            <td>{post.content}</td>
                            <td>{post.topic.name}</td>
                            <td>{post.author.firstName} {post.author.lastName}</td>
                            <td>{formatDate(post.createdAt)}</td>
                            <td>
                                <Button
                                    type="button"
                                    className="size-[44px] min-w-[44px]"
                                    child={<TrashIcon />}
                                    onClick={() =>{
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TablePost;