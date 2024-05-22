import salaries from "../Data/salaries.json";
import PropTypes from "prop-types";

// Extract unique job titles
const jobs = salaries.map((job) => job.job_title);
const uniqueJobs = [...new Set(jobs)];

// Initialize the info structure
let info = [
  {
    2024: {
      averageSalary: new Array(uniqueJobs.length).fill(0),
      numberOfJobs: new Array(uniqueJobs.length).fill(0),
      jobTitle: uniqueJobs,
    },
  },
  {
    2023: {
      averageSalary: new Array(uniqueJobs.length).fill(0),
      numberOfJobs: new Array(uniqueJobs.length).fill(0),
      jobTitle: uniqueJobs,
    },
  },
  {
    2022: {
      averageSalary: new Array(uniqueJobs.length).fill(0),
      numberOfJobs: new Array(uniqueJobs.length).fill(0),
      jobTitle: uniqueJobs,
    },
  },
  {
    2021: {
      averageSalary: new Array(uniqueJobs.length).fill(0),
      numberOfJobs: new Array(uniqueJobs.length).fill(0),
      jobTitle: uniqueJobs,
    },
  },
  {
    2020: {
      averageSalary: new Array(uniqueJobs.length).fill(0),
      numberOfJobs: new Array(uniqueJobs.length).fill(0),
      jobTitle: uniqueJobs,
    },
  },
];

// Populate info with data from salaries
for (let i = 0; i < uniqueJobs.length; i++) {
  const jobTitle = uniqueJobs[i];
  salaries.forEach((salary) => {
    const yearIndex = 2024 - salary.work_year;
    if (yearIndex >= 0 && yearIndex < info.length) {
      if (salary.job_title === jobTitle) {
        info[yearIndex][salary.work_year].numberOfJobs[i] += 1;
        info[yearIndex][salary.work_year].averageSalary[i] +=
          salary.salary_in_usd;
      }
    }
  });
}

// Compute the average salaries
info.forEach((yearInfo) => {
  const year = Object.keys(yearInfo)[0];
  const yearData = yearInfo[year];
  yearData.averageSalary = yearData.averageSalary.map((totalSalary, index) => {
    const count = yearData.numberOfJobs[index];
    return count === 0 ? 0 : totalSalary / count;
  });
});

// React Table component
const Table = ({ year, newclass }) => {
  const yearIndex = [2024, 2023, 2022, 2021, 2020].indexOf(year);
  if (yearIndex === -1) return null; // Year not found in data

  return (
    <div className={`sm:px-[10%] px-[3%] ${newclass}`}>
      <div className="flex flex-col items-center">
        <h1 className="mt-8 font-bold text-2xl">{year}</h1>
        <div className="mt-8">
          <table className="min-w-auto divide-y-2 divide-gray-200 bg-white text-sm border-2 table-auto">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-r-2">
                  Job Title
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-r-2">
                  Number of total jobs for that year
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-r-2">
                  Average salary in USD
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {info[yearIndex][year].jobTitle.map((jobTitle, i) => (
                <tr className="odd:bg-gray-50" key={jobTitle}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-r-2">
                    {jobTitle}
                  </td>
                  <td className="whitespace-nowrap px-32 py-2 text-gray-700 border-r-2">
                    {info[yearIndex][year].numberOfJobs[i]}
                  </td>
                  <td className="whitespace-nowrap px-16 py-2 text-gray-700 border-r-2">
                    {Math.round(info[yearIndex][year].averageSalary[i])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  year: PropTypes.number.isRequired,
  newclass: PropTypes.string.isRequired,
};

export default Table;
