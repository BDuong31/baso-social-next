import { table } from "console";
import { Typography } from "../typography";
import { MoreIcon } from "../icons";
import { ToggleBlock } from "@/components/toggleBlock";
import { IUserProfile } from "@/interfaces/user";
import React from "react";
import { adminUpdateUserProfile, deleteUserProfile } from "@/apis/user";
import MoreOptions from "@/sections/admin/components/more-options";
import { Delete } from "lucide-react";
import { DeleteUser, EditForm } from "@/sections/admin/components";
import { useTranslation } from "react-i18next";

interface Props {
    data: IUserProfile[];
}

function TableUser(
    {data}: Props
){
    let i = 1;
    const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
    const [isDeleted, setIsDeleted] = React.useState<boolean>(false);
    const [isUserDeleted, setIsUserDeleted] = React.useState<IUserProfile>(null);
    const [isUserUpdated, setIsUserUpdated] = React.useState<IUserProfile>(null);
    const [openUpdateId, setOpenUpdateId] = React.useState<string | null>(null);
    const [ loading , setLoading] = React.useState<boolean>(false);
    const formatDate = (dateStr: string) => {
        const dateObj = new Date(dateStr);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
      };   
    const { t } = useTranslation(); 
    const handleFieldChange = (updatedData: Partial<IUserProfile>) => {
      setIsUserUpdated((prevData) => ({ ...prevData, ...updatedData }));
    };
    return (
        <>
            <table className="w-[100%]">
                <thead className="sticky top-0 z-10 bg-[#EFEFEF]">
                    <td className="pt-2 pb-2">
                        <Typography level="base2sm">{t('user no')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('user name')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('phone')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('email')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('create date')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('action block user')}</Typography>
                    </td>
                    <td>
                        <Typography level="base2sm">{t('action')}</Typography>
                    </td>
                </thead>
                <tbody className="pb-2 bg-[#EFEFEF]">
                    {data.map((user: IUserProfile)=>(
                        <tr key={user.id}>
                            <td>{i++}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.phone === null ? "Chưa có thông tin" : user.phone}</td>
                            <td>{user.email === null ? "Chưa có thông tin" : user.email}</td>
                            <td>{formatDate(user.createdAt)}</td>
                            <td>
                                <ToggleBlock
                                    check={user.status == "active" ? false : true}
                                    onChange={(checked: boolean) => {
                                        console.log(`User ${user.id} block status:`, checked);
                                        // Gọi API để cập nhật trạng thái block của user
                                        adminUpdateUserProfile(user.id, {
                                            status: checked ? "banned" : "active"
                                        })
                                            .then((response) => {
                                                console.log("Update user status success:", response);
                                            }
                                            )
                                            .catch((error) => {
                                                console.error("Error updating user status:", error);
                                            }
                                        );
                                    }}
                                />
                            </td>
                            <td className="p-2 text-center relative">
                                <div className="inline-block relative">
                                    <MoreIcon onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)} />
                                    {openMenuId === user.id && (
                                        <MoreOptions
                                            onEdit={() => {
                                                console.log("Edit user:", user.id);
                                                setOpenUpdateId(user.id);
                                                setIsUserUpdated(user);
                                            }}
                                            onDelete={() => {
                                                console.log("Delete user:", user.id);
                                                setIsDeleted(true);
                                                setIsUserDeleted(user);
                                                // // Gọi API để xóa user
                                                // deleteUserProfile(user.id)
                                                //     .then((response) => {
                                                //         console.log("Delete user success:", response);                                                    
                                                //     }
                                                //     )
                                                //     .catch((error) => {
                                                //         console.error("Error deleting user:", error);
                                                //     }
                                                //     );
                                            }}
                                        />
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isDeleted && (
                <DeleteUser
                    onClick={() => {
                        console.log("Confirm delete user:", isUserDeleted.id);
                        deleteUserProfile(isUserDeleted.id)
                            .then((response) => {
                                console.log("Delete user success:", response);
                                setIsDeleted(false);
                                setOpenUpdateId(null);
                            }
                            )
                            .catch((error) => {
                                console.error("Error deleting user:", error);
                            }
                        );
                    }}
                    onClose={() => {
                        setIsDeleted(false);
                        setOpenUpdateId(null);
                    }}
                    userData={isUserDeleted}
                />
            )}

        {openUpdateId && (
            <EditForm
                userInfo={isUserUpdated}
                onUpdateProfile={handleFieldChange}
                onUpdate={() => {
                    setLoading(true);
                    console.log("Confirm update user:", isUserUpdated);
                    adminUpdateUserProfile(isUserUpdated.id, isUserUpdated )
                        .then((response) => {
                            console.log("Update user success:", response);
                            setLoading(false);
                        }
                        )
                        .catch((error) => {
                            console.error("Error updating user:", error);
                            setLoading(false);
                        }
                        );
                }}
                onClose={() => {
                    setOpenUpdateId(null);
                    setIsUserUpdated(null);
                    setLoading(false);
                }}
                loading={loading}
            />
        )}
        </>
    )
}

export default TableUser;