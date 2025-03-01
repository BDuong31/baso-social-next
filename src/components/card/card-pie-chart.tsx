import { LineChart,PieChart,Legend, Cell, Pie ,Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowRiseIcon } from "../icons";
import { Typography } from "../typography";
import { cn } from '@/lib/utils'

type ChartData = { name: string; value: number };

type Props = {
    title: string;
    data: ChartData[];
    colors: any;
    color: string;
    inner: string | number;
    outer: string | number;
    paddingangle: string | number;
    width: string | number;
    height: string | number
    className: string;
};

const CardPieChart =({ title, data, colors, color, inner, outer, paddingangle,width, height, className }: Props) =>  {
    return (
        <div className={cn('p-6 gap-2 flex flex-col rounded-[1.25rem] dark:bg-neutral2-2 bg-neutral1-30 [transition:background_.2s] dark:hover:bg-neutral2-5 hover:bg-neutral1-60', className)}>
            <Typography level='title'>{title}</Typography>
            <div className="flex flex-row gap-[4.1rem]">
                <ResponsiveContainer width={width} height={height}>
                    <PieChart>
                        <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={inner}
                        outerRadius={outer}
                        fill={color}
                        paddingAngle={Number(paddingangle)}
                        dataKey="value"
                        >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CardPieChart;