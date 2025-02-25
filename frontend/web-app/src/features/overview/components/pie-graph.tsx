'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { getAllEmployees } from '@/lib/actions/employee.actions';
import {
  getAllDepartments,
  getEmployeesByDepartment
} from '@/lib/actions/department.actions';
const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 190, fill: 'var(--color-other)' }
];

interface DepartmentEmployeeCount {
  departmentName: string;
  count: number;
  fill: string;
}

export function PieGraph() {
  const [departmentEmployees, setDepartmentEmployees] = React.useState<
    DepartmentEmployeeCount[]
  >([]);

  const formatted = departmentEmployees.map((department) => ({
    [department.departmentName]: {
      label: department.count
    }
  }));

  const colors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'];

  React.useEffect(() => {
    const fetchDepartmentEmployees = async () => {
      try {
        const departments = await getAllDepartments();

        const departmentData = await Promise.all(
          departments.map(async (department, index) => {
            const employees = await getEmployeesByDepartment(department.id);
            return {
              departmentName: department.name,
              count: employees.length,
              fill: colors[index % colors.length] // Cy
            };
          })
        );

        setDepartmentEmployees(departmentData);
      } catch (error) {
        console.error('Error fetching department employees:', error);
      }
    };

    fetchDepartmentEmployees();
  }, []);


  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Active Employees By Department</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={formatted as unknown as ChartConfig}
          className='mx-auto aspect-square max-h-[360px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={departmentEmployees}
              dataKey='count'
              nameKey='departmentName'
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        ></tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        ></tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
