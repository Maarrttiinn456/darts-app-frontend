import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

type Member = {
    id?: string;
    username?: string;
    color?: string | null;
};

// Each entry: { tournament: string } + one numeric key per member id
export type ChartDataPoint = Record<string, string | number>;

interface LeagueStatsChartProps {
    data: ChartDataPoint[];
    members: Member[];
}

const LeagueStatsChart = ({ data, members }: LeagueStatsChartProps) => (
    <section>
        <div className="px-2 pt-6 pb-6">
            <ResponsiveContainer width="100%" height={220}>
                <LineChart
                    data={data}
                    margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                >
                    <XAxis
                        dataKey="tournament"
                        axisLine={{ stroke: 'oklch(0.25 0.008 50)' }}
                        tickLine={false}
                        tick={{
                            fill: 'oklch(0.52 0.008 75)',
                            fontSize: 9,
                            fontWeight: 700,
                            textAnchor: 'middle',
                        }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'oklch(0.52 0.008 75)', fontSize: 9 }}
                        tickFormatter={v => `${(v / 1000).toFixed(1)}k`}
                    />
                    <Tooltip
                        contentStyle={{
                            background: 'oklch(0.16 0.010 50)',
                            border: '1px solid oklch(0.25 0.008 50)',
                            borderRadius: 0,
                            fontSize: 11,
                            fontWeight: 700,
                            color: 'oklch(0.93 0.008 75)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                        }}
                        labelStyle={{
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: 6,
                            color: 'oklch(0.52 0.008 75)',
                        }}
                        itemStyle={{ padding: '1px 0' }}
                        formatter={(value: number, _key: string, entry) => [
                            value.toLocaleString('cs-CZ'),
                            entry.name,
                        ]}
                    />
                    {members.map(m => (
                        <Line
                            key={m.id}
                            type="monotone"
                            dataKey={m.id}
                            name={m.username}
                            stroke={m.color ?? undefined}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 px-3 flex flex-wrap gap-x-5 gap-y-2.5">
                {members.map(m => (
                    <div key={m.id} className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 shrink-0"
                            style={{ backgroundColor: m.color ?? undefined }}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">
                            {m.username}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default LeagueStatsChart;
