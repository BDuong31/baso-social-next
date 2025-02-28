import { table } from "console";
import { Typography } from "../typography";
import { MoreIcon } from "../icons";
import { ToggleBlock } from "@/components/toggleBlock";
import { IUserProfile } from "@/interfaces/user";

interface Props {
    data: IUserProfile[];
}

function TableUser(
    {data}: Props
){
    let i = 1;
    const formatDate = (dateStr: string) => {
        const dateObj = new Date(dateStr);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
      };      
    return (
        <table className="w-[100%] bg-[#EFEFEF]">
            <thead className="sticky top-0 z-10 bg-[#EFEFEF]">
                <td className="pt-2 pb-2">
                    <Typography level="base2sm">User no</Typography>
                </td>
                <td>
                    <Typography level="base2sm">User id</Typography>
                </td>
                <td>
                    <Typography level="base2sm">Phone</Typography>
                </td>
                <td>
                    <Typography level="base2sm">Email</Typography>
                </td>
                <td>
                    <Typography level="base2sm">Create date</Typography>
                </td>
                <td>
                    <Typography level="base2sm">Block user</Typography>
                </td>
                <td>
                    <Typography level="base2sm">Action</Typography>
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
                            />
                        </td>
                        <td>
                            <MoreIcon/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableUser;