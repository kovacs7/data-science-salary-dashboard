import { useState } from "react";
import salaries from "../Data/salaries.json";
import { LineChart, BarChart } from "@tremor/react";
import Table from "../components/Table";
import chatBot from "../assets/chatBot.svg"

const valueFormatter = function (number) {
  return "$" + new Intl.NumberFormat("us").format(number).toString();
};
const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

const Tables = () => {
  let numberOfJobs = {
    2024: 0,
    2023: 0,
    2022: 0,
    2021: 0,
    2020: 0,
  };
  let sumOfSalariesPerYr = {
    sum1: 0,
    sum2: 0,
    sum3: 0,
    sum4: 0,
    sum5: 0,
  };
  salaries.forEach((salary) => {
    if (salary.work_year === 2024) {
      numberOfJobs[2024] += 1;
      sumOfSalariesPerYr.sum1 += salary.salary_in_usd;
    } else if (salary.work_year === 2023) {
      numberOfJobs[2023] += 1;
      sumOfSalariesPerYr.sum2 += salary.salary_in_usd;
    } else if (salary.work_year === 2022) {
      numberOfJobs[2022] += 1;
      sumOfSalariesPerYr.sum3 += salary.salary_in_usd;
    } else if (salary.work_year === 2021) {
      numberOfJobs[2021] += 1;
      sumOfSalariesPerYr.sum4 += salary.salary_in_usd;
    } else if (salary.work_year === 2020) {
      numberOfJobs[2020] += 1;
      sumOfSalariesPerYr.sum5 += salary.salary_in_usd;
    }
  });
  let mainTableValues = [
    {
      averageSalary: sumOfSalariesPerYr.sum1 / numberOfJobs[2024],
      year: 2024,
      numberOfJobsPerYr: numberOfJobs[2024],
    },
    {
      averageSalary: sumOfSalariesPerYr.sum2 / numberOfJobs[2023],
      year: 2023,
      numberOfJobsPerYr: numberOfJobs[2023],
    },
    {
      averageSalary: sumOfSalariesPerYr.sum3 / numberOfJobs[2022],
      year: 2022,
      numberOfJobsPerYr: numberOfJobs[2022],
    },
    {
      averageSalary: sumOfSalariesPerYr.sum4 / numberOfJobs[2021],
      year: 2021,
      numberOfJobsPerYr: numberOfJobs[2021],
    },
    {
      averageSalary: sumOfSalariesPerYr.sum5 / numberOfJobs[2020],
      year: 2020,
      numberOfJobsPerYr: numberOfJobs[2020],
    },
  ];
  
  const [ ClassName, setClassName] = useState("block")
  const [ ClassNameForTable, setClassNameForTable] = useState("hidden")
  const [ yearForTable, setyearForTable] = useState(0)
  function handleTableAndGraph(year) {
    setClassName("hidden");
    setClassNameForTable("block");
    setyearForTable(year);
  }
  function handleReset() {
    setClassName("block");
    setClassNameForTable("hidden");
  }

  return (
    <div className="sm:px-[10%] px-[3%]">
      <a
        className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 absolute top-8 z-10 left-[80%] flex items-center gap-2"
        href="/Chat"
      >
        <div className="w-[25px] h-[25px]"> <img src={chatBot} alt="chatbot"/></div>
        Chat Bot
      </a>
      {/* wrapper */}
      <div className="flex flex-col items-center">
        <h1 className="mt-8 font-bold text-2xl">Main Table:</h1>
        <div className="mt-8 scroll-mx-2">
          <table className="min-w-auto divide-y-2 divide-gray-200 bg-white text-sm border-2">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-r-2">
                  Year
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-r-2">
                  Number of total jobs for that year
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-r-2">
                  Average salary in USD
                </th>
                <th className="px-4 py-2">
                  More <br />
                  <button
                    className={`inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 ${ClassNameForTable}`}
                    onClick={handleReset}
                  >
                    Back
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mainTableValues.map((info) => {
                return (
                  <tr className="odd:bg-gray-50" key={info.year}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-r-2">
                      {info.year}
                    </td>
                    <td className="whitespace-nowrap px-32 py-2 text-gray-700 border-r-2">
                      {info.numberOfJobsPerYr}
                    </td>
                    <td className="whitespace-nowrap px-16 py-2 text-gray-700 border-r-2">
                      {Math.round(info.averageSalary)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() => handleTableAndGraph(info.year)}
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Line-graph */}
        <div className={`flex flex-col w-full ${ClassName}`}>
          <h3 className="text-lg font-medium text-tremor-content-strong mt-8 text-center">
            2024 Machine Learning Engineer Salary Insights
          </h3>
          <div className="flex flex-row gap-4">
            <LineChart
              className="mt-4 h-72"
              data={mainTableValues.reverse()}
              index="year"
              yAxisWidth={65}
              categories={["averageSalary"]}
              colors={["indigo", "cyan"]}
              valueFormatter={valueFormatter}
            />
            <BarChart
              data={mainTableValues}
              index="year"
              categories={["numberOfJobsPerYr"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
              colors={["indigo"]}
              onValueChange={(v) => console.log(v)}
            />
          </div>
        </div>
        {/* Table */}
        <Table year={yearForTable} newclass={ClassNameForTable} />
      </div>
    </div>
  );
};

export default Tables;
