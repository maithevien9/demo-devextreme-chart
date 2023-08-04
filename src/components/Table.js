import RestTable from './RestTable';
import { useState } from 'react';
import { Typography, Button } from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    aircraftRegistration: 'B73NG3C1',
    aircraftType: 'B737-800',
    channel1Duration: 'Placeholder',
    channel2Duration: 'Placeholder',
    channel3Duration: 'Placeholder',
    channel4Duration: 'Placeholder',
    channel5Duration: 'Placeholder',
    key: i,
    referenceNumber: String(46534 + i),
    replayDate: '29/05/23 18:00:01',
    totalDuration: 'Placeholder',
  });
}

export default function Table() {
  const initialColumns = [
    {
      dataIndex: 'referenceNumber',
      fixed: 'left',
      key: 'referenceNumber',
      render: (_, value) => <div className='text-base font-semibold'>{value.referenceNumber}</div>,
      sorter: (value, nextValue) => Number(value.referenceNumber) - Number(nextValue.referenceNumber),
      title: 'Reference Number',
      //       title: (
      // <div
      //   onClick={(e) => {
      //     e.stopPropagation();
      //   }}
      //   onDoubleClick={(event) => onDoubleClick(event, 'referenceNumber')}
      // >
      //   Reference Number
      // </div>
      //       ),
      width: 170,
    },
    {
      dataIndex: 'aircraftRegistration',
      key: 'aircraftRegistration',
      sorter: (value, nextValue) => Number(value.aircraftRegistration) - Number(nextValue.aircraftRegistration),
      title: 'Aircraft Registration',
      width: 180,
    },
    {
      dataIndex: 'aircraftType',
      key: 'aircraftType',
      sorter: (value, nextValue) => Number(value.aircraftType) - Number(nextValue.aircraftType),
      title: 'Aircraft Type',
      width: 138,
    },
    {
      dataIndex: 'replayDate',
      key: 'replayDate',
      render: (_, value) => (
        <Typography.Text className='w-full min-w-20' ellipsis={{ tooltip: true }}>
          {value.replayDate}
        </Typography.Text>
      ),
      sorter: (value, nextValue) => Number(value.replayDate) - Number(nextValue.replayDate),
      title: 'Replay Date',
      width: 130,
    },
    {
      dataIndex: 'totalDuration',
      key: 'totalDuration',
      sorter: (value, nextValue) => Number(value.totalDuration) - Number(nextValue.totalDuration),
      title: 'Total Duration',
      width: 144,
    },
    {
      dataIndex: 'channel1Duration',
      key: 'channel1Duration',
      sorter: (value, nextValue) => Number(value.channel1Duration) - Number(nextValue.channel1Duration),
      title: 'Channel 1 Duration',
      width: 175,
    },
    {
      dataIndex: 'channel2Duration',
      key: 'channel2Duration',
      sorter: (value, nextValue) => Number(value.channel1Duration) - Number(nextValue.channel1Duration),
      title: 'Channel 2 Duration',
      width: 175,
    },
    {
      dataIndex: 'channel3Duration',
      key: 'channel3Duration',
      sorter: (value, nextValue) => Number(value.channel1Duration) - Number(nextValue.channel1Duration),
      title: 'Channel 3 Duration',
      width: 175,
    },
    {
      dataIndex: 'channel4Duration',
      key: 'channel4Duration',
      sorter: (value, nextValue) => Number(value.channel1Duration) - Number(nextValue.channel1Duration),
      title: 'Channel 4 Duration',
      width: 175,
    },
    {
      dataIndex: 'channel5Duration',
      key: 'channel5Duration',
      sorter: (value, nextValue) => Number(value.channel1Duration) - Number(nextValue.channel1Duration),
      title: 'Channel 5 Duration',
      width: 175,
    },
    {
      fixed: 'right',
      key: 'operation',
      render: () => (
        <div className='flex gap-6 justify-center action-column'>
          <div>Action</div>
        </div>
      ),
      title: 'Action',
      width: 168,
    },
  ];

  const popoverColumns = initialColumns.map((column) => ({
    isDisabled: column.title === 'Reference Number',
    title: column.title?.toString() ?? '',
  }));

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '90%' }}>
        <RestTable
          data={data}
          hasCheckbox
          hasResizeColumn
          initialColumns={initialColumns}
          showSorterTooltip={false}
          showingColumns={popoverColumns.map((column) => column.title)}
        />
      </div>
    </div>
  );
}

// (col, props, ctx) => {
//      const icon = col.sorter.order === 'ascend' ? 'up' : 'down';
//      const direction = col.sorter.order === 'ascend' ? 'descend' : 'ascend;

//       return <Button icon={icon} onClick={ctx.toggleSortOrder(direction) />
//    }
