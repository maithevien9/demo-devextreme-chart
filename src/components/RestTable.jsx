import styled from 'styled-components';
import { Checkbox, Table } from 'antd';
import React, { useMemo, useState, useEffect } from 'react';
import { Resizable } from 'react-resizable';

const EmptyContainer = styled.div`
  ${({ minHeight }) => minHeight && `min-height: calc(${minHeight}px - 40px);`}
`;

const Wrapper = styled.div`
  .ant-typography {
    width: 100% !important;
  }
  .ant-table-cell {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  ${({ isEverySelected }) =>
    !isEverySelected &&
    ` .custom-checkbox .ant-checkbox-inner::after {
    content: ' ';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 2px;
    border-radius: 2px;
    background-color: #fff;
  }`}

  .custom-checkbox
    .ant-checkbox-input:not(:checked)
    + .ant-checkbox-inner::after {
    display: none;
  }

  .react-resizable {
    position: relative;
    background-clip: padding-box;
  }

  .react-resizable-handle {
    position: absolute;
    width: 5px;
    height: 100%;
    bottom: 0;
    right: -5px;
    cursor: col-resize;
    z-index: 1;

    &:hover {
      border-left: 2px solid #ebebed;
    }
  }

  ${({ selectedRowKeys }) =>
    !!selectedRowKeys.length &&
    selectedRowKeys.map(
      (rowKey) => `
        [data-row-key='${rowKey}'] {
          .ant-table-cell, .ant-typography {
            background-color: var(--light-primary-color) !important;
            color: var(--primary-color) !important;
          }
        }
      `
    )}
`;
function ResizableTitle({ onResize, width, onClick, ...restProps }) {
  const handleClickHeader = (event) => {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const { className } = target;
      if (!className.includes('react-resizable-handle')) {
        onClick?.();
      }
    }
  };

  if (!width) {
    return <th {...restProps} onClick={handleClickHeader} />;
  }

  return (
    <Resizable draggableOpts={{ enableUserSelectHack: false }} height={0} onResize={onResize} width={width}>
      <th {...restProps} onClick={handleClickHeader} />
    </Resizable>
  );
}

export default function RestTable({
  data,
  hasCheckbox = true,
  renderHeaderComponent,
  initialColumns,
  showingColumns,
  hasResizeColumn = true,
  ...props
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [startRowIndex, setStartRowIndex] = useState(null);
  const [columns, setColumns] = useState(initialColumns);

  const onDoubleClick = (key, width) => {
    const index = initialColumns.findIndex((column) => column.key === key);

    setColumns((prevColumns) => {
      const nextColumns = [...prevColumns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: initialColumns[index].width,
      };

      return nextColumns;
    });
  };

  const checkBoxColumn = useMemo(
    () => ({
      dataIndex: 'checkbox',
      fixed: 'left',
      key: 'checkbox',
      render: (_, value) => (
        <Checkbox
          checked={selectedRowKeys.includes(value.key)}
          onChange={(event) => {
            onSelectChange(event.target.checked ? [...selectedRowKeys, value.key] : selectedRowKeys.filter((key) => key !== value.key));
          }}
        />
      ),
      title: (
        <Checkbox
          checked={!!selectedRowKeys.length}
          className='custom-checkbox'
          onChange={(event) => setSelectedRowKeys(event.target.checked ? data.map((item) => item.key) : [])}
        />
      ),
      width: 40,
    }),
    [data, selectedRowKeys]
  );

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const handleResize =
    (index) =>
    (_event, { size }) => {
      setColumns((prevColumns) => {
        const nextColumns = [...prevColumns];
        const minWidth = 130;
        const columnWidth = Math.max(size.width, minWidth);
        nextColumns[index] = {
          ...nextColumns[index],
          width: columnWidth,
        };
        return nextColumns;
      });
    };

  const resizedColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column, _) => ({
      onResize: handleResize(index),
      width: column.width,
    }),
  }));

  const handleMouseDown = (rowIndex) => {
    if (rowIndex !== undefined) {
      setStartRowIndex(rowIndex);
    }
  };

  const handleMouseUp = () => {
    setStartRowIndex(null);
  };

  const handleMouseEnter = (rowIndex) => {
    if (startRowIndex !== null && rowIndex !== undefined) {
      const newSelectedRowKeys = data
        .slice(Math.min(startRowIndex, rowIndex), Math.max(startRowIndex, rowIndex) + 1)
        .map((item) => item.key);
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };

  const dynamicColumns = (() => {
    const filteredShowingColumns = resizedColumns.filter((column) =>
      showingColumns ? showingColumns.includes(column.title?.toString() ?? '') : true
    );

    return hasCheckbox ? [checkBoxColumn, ...filteredShowingColumns] : filteredShowingColumns;
  })();

  const contentHeight = props.scroll?.y;

  return (
    <Wrapper isEverySelected={selectedRowKeys.length === data.length} selectedRowKeys={selectedRowKeys}>
      {renderHeaderComponent && renderHeaderComponent(selectedRowKeys, setSelectedRowKeys)}
      <Table
        scroll={{ y: window.innerHeight - 100 }}
        columns={dynamicColumns.map((col, index) => ({
          ...col,
          title: (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              onDoubleClick={(event) => onDoubleClick(col.key)}
            >
              {col.title}
            </div>
          ),
        }))}
        dataSource={data}
        locale={{
          emptyText: (
            <EmptyContainer className='flex flex-col items-center justify-center gap-7' minHeight={contentHeight}>
              {/* <EmptyIcon /> */}
              <div className='text-neutral-500 text-xs'>No data</div>
            </EmptyContainer>
          ),
        }}
        onRow={(_record, rowIndex) => ({
          onMouseDown: () => handleMouseDown(rowIndex),
          onMouseEnter: () => handleMouseEnter(rowIndex),
          onMouseUp: handleMouseUp,
        })}
        {...props}
        {...(hasResizeColumn && { components })}
      />
    </Wrapper>
  );
}
