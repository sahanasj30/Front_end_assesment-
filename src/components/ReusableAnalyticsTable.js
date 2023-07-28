import React, { useState } from 'react';
import _ from 'lodash'; // Import lodash library
import './ReusableAnalyticsTable.css'; 

const ReusableAnalyticsTable = ({ data }) => {
  const [columns, setColumns] = useState([
    { title: 'Date', key: 'column7', visible: true },
    { title: 'App', key: 'column8', visible: true },
    { title: 'Clicks', key: 'column9', visible: true },
    { title: 'Requests', key: 'column4', visible: true },
    { title: 'Revenue', key: 'column5', visible: true },
    { title: 'Fill Rate', key: 'column6', visible: true },
    // Add more columns as needed
  ]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filters, setFilters] = useState({});

  const handleColumnToggle = (columnKey) => {
    const updatedColumns = columns.map((col) =>
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    );
    setColumns(updatedColumns);
  };

  const handleColumnDrag = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
  };

  const handleColumnDrop = (event, targetIndex) => {
    event.preventDefault();
    const sourceIndex = event.dataTransfer.getData('text');
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(sourceIndex, 1);
    updatedColumns.splice(targetIndex, 0, movedColumn);
    setColumns(updatedColumns);
  };

  const handleSort = (columnKey) => {
    setSortedColumn(columnKey);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (event, columnKey) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [columnKey]: value }));
  };

  // Implement data formatting for each cell
  const formatData = (value, columnKey) => {
    if (columnKey === 'column2') {
      // Format numbers with commas (e.g., 100,000)
      return Number(value).toLocaleString();
    } else if (columnKey === 'column3') {
      // Format dates (assuming 'value' is in ISO format)
      const formattedDate = new Date(value).toLocaleDateString();
      return formattedDate;
    }
    // Default behavior: return the original value as-is
    return value;
  };

  // Implement sorting and filtering logic
  const filteredData = _.filter(data, (item) => {
    return _.every(filters, (filterValue, filterKey) => {
      if (filterValue === '') return true; // If no filter is applied, return true for all items
      return _.includes(item[filterKey].toLowerCase(), filterValue.toLowerCase());
    });

  });

  const sortedData = sortedColumn
    ? _.orderBy(filteredData, sortedColumn, sortDirection)
    : filteredData;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) =>
            column.visible ? (
              <th
                key={column.key}
                draggable
                onDragStart={(e) => handleColumnDrag(e, index)}
                onDrop={(e) => handleColumnDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                <span onClick={() => handleColumnToggle(column.key)}>
                  {column.title}
                </span>
                {sortedColumn === column.key && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
                <br />
                <input
                  type="text"
                  value={filters[column.key] || ''}
                  onChange={(e) => handleFilterChange(e, column.key)}
                  placeholder={`Filter ${column.title}`}
                />
              </th>
            ) : null
          )}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) =>
              column.visible ? (
                <td key={column.key}>
                  {formatData(row[column.key], column.key)}
                </td>
              ) : null
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReusableAnalyticsTable;
