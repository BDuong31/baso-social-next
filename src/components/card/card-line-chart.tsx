import { LineChart,PieChart,Legend, Cell, Pie ,Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowRiseIcon } from "../icons";
import { Typography } from "../typography";
import { cn } from '@/lib/utils';

type Props = {
    title: string;
    data: any;
    color: string;
    strokeWidth: string | number;
    width: string | number;
    height: number | string;
    className: string;
};

const CardLineChart =({ title, data, color, strokeWidth, width, height, className}: Props) =>  {
    return (
        <div className={cn('p-6 gap-2 flex flex-col rounded-[1.25rem] dark:bg-neutral2-2 bg-neutral1-30 [transition:background_.2s] dark:hover:bg-neutral2-5 hover:bg-neutral1-60', className)}>
            <Typography level='title'>{title}</Typography>
            <div className="flex flex-row gap-[4.1rem]">
                <ResponsiveContainer width={width} height={height}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke={color} strokeWidth={strokeWidth} />
                        </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CardLineChart;