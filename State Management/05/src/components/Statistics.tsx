interface StatisticsProps {
  checkPriorityStats: (status: string) => number;
  checkStatusStats: (status: string) => number;
  stateLength: number;
};

export const Statistics = (props: StatisticsProps) => {
  const {checkPriorityStats, checkStatusStats, stateLength} = props;

  return <div className="statistic">
     <h3>Statistics</h3>
      <p>Total number of tasks: {stateLength}</p>
      
      <p>Todo: {checkStatusStats("todo")}</p>
      <p>In-progress: {checkStatusStats("in-progress")}</p>
      <p>Done: {checkStatusStats("done")}</p>
      <br />
      <p>Low: {checkPriorityStats("low")}</p>
      <p>Medium: {checkPriorityStats("medium")}</p>
      <p>High: {checkPriorityStats("high")}</p>
  </div>
};