import React, { useEffect, useState } from "react";
import Job from "./Job";

const Jobs = ({ data, setKeywords, keywords }) => {
  const [filteredData, setfilteredData] = useState([]);
  const modifiedData = () => {
      if (keywords) {
      const newData = data.filter((d) => {
        return keywords.every((key) => {
          return (
            d.role === key ||
            d.level === key ||
            d.languages.includes(key) ||
            d.tools.includes(key)
          );
        });
      });
      setfilteredData(newData);
    } else {
      setfilteredData(data);
    }
  };
  useEffect(() => {
  }, [])
  

  useEffect(() => {
    modifiedData();
  }, [keywords]);

  return (
    <div className="jobs">
      {filteredData.map((d) => {
        return <Job key={d._id} data={d} setkeywords={setKeywords} />;
      })}
    </div>
  );
};

export default Jobs;
