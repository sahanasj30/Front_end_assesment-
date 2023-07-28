import React from 'react';
import ReusableAnalyticsTable from './ReusableAnalyticsTable';

const AnalyticsPage = () => {
  // Sample data for demonstration purposes
  const data = [
    { column7: '28 July 2023', column8: "Callbreak", column9: 0, column4: '12,233,122,212' , column5:'$4.12' , column6:'0.00%' },
    { column7: '28 July 2023', column8: 'ShareChat', column9: 0, column4: '2,422,231', column5:'$2.32' , column6:'45.00%' },
    { column7: '28 July 2023', column8: 'ShareChat', column9: 0, column4: '3,122,212', column5:'$4.12' , column6:'78.00%' },
    { column7: '28 July 2023', column8: 'Callbreak', column9: 0, column4:'22,212' , column5: '$4.12', column6: '0.00%'},
    { column7: '28 July 2023', column8: 'ShareChat', column9: 0, column4: '2,422,231', column5:'$2.32' , column6:'45.00%' },
    { column7: '28 July 2023', column8: 'ShareChat', column9: 0, column4: '3,122,212', column5: '$4.12', column6:'78.00%' },
    { column7: '28 July 2023', column8: 'Callbreak', column9: 0, column4: '12', column5: '$4.12', column6: '0.00%'},
    // Add more data rows as needed
  ];

  return (
    <div>
      <h1>Analytics Page</h1>
      <ReusableAnalyticsTable data={data} />
    </div>
  );
};

export default AnalyticsPage;
