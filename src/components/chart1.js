import ReactEcharts from 'echarts-for-react';
import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import lastData from '../lastData.json';
import paramsData from '../paramsHasAltitude.json';
import paramsWithoutAltitude from '../paramsWithoutAltitude.json';
import { Button, Modal, Input, Select, Space, Form, Radio, Checkbox } from 'antd';
import { cloneDeep } from 'lodash-es';
import Print from './print';
import html2canvas from 'html2canvas';

export default function Home() {
  const chartRef = useRef(null);
  const [hour, setHour] = useState(2);
  const [series, setSeries] = useState(
    paramsData.map((item, index) => ({
      ...item,
      showSymbol: true,

      data: new Array(hour / 2)
        .fill(null)
        .map((item2) => {
          return item.data;
        })
        .flat()
        .map((i) => ({ value: i, symbol: 'none' })),
    }))
  );

  const [chartKey, setChartKey] = useState(0);

  const xAxis = lastData.map((item) => item.frame);
  const xAxis2 = lastData.map((item) => item.time);

  const customXAxisX = xAxis.map((item, index) => `${item}_${index}`);

  const newXAxis = [
    ...xAxis,
    ...new Array(hour / 2 - 1)
      .fill(null)
      .map((item2) => customXAxisX)
      .flat(),
  ];

  const newXAxis2 = [
    ...xAxis2,
    ...new Array(hour / 2 - 1)
      .fill(null)
      .map((item2) => xAxis2)
      .flat(),
  ];

  const options = {
    grid: { show: false },

    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
          icon: {
            back: 'none',
          },
        },
        restore: {},
      },
    },
    xAxis: [
      {
        type: 'category',
        data: newXAxis,
        boundaryGap: false,
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#FF6700', // Customize the color of the split lines
            type: 'solid', // Choose the type of line (solid, dashed, dotted, etc.)
            // ... other lineStyle options
          },
        },
        splitLine: {
          show: true, // Set to false to hide the default split lines
          lineStyle: {
            type: 'solid', // Choose the type of line (solid, dashed, dotted, etc.)
            // ... other lineStyle options
          },
        },
        offset: 5,
      },
      {
        // type: 'category',
        boundaryGap: false,
        data: newXAxis2,
        splitLine: {
          show: false,
        },
        offset: 10,
        axisTick: {
          show: false, // Hide the xAxis tick line
        },
        axisLine: {
          show: false, // Hide the xAxis line
        },
      },
    ],
    yAxis: {
      type: 'value',
      offset: 20,
      splitLine: {
        show: false,
      },
      // hide the yAxis line
      show: false,
    },
    series,
    dataZoom: [
      {
        type: 'slider',
        showDetail: false,
        zoomLock: false,
        brushSelect: false,
      },
      {
        type: 'inside',
      },
    ],
  };

  const secondaryOptions = {
    grid: { show: false },

    xAxis: [
      {
        type: 'category',
        data: newXAxis,
        boundaryGap: false,
        axisPointer: {
          show: false,
        },
        splitLine: {
          show: true, // Set to false to hide the default split lines
        },
      },
      {
        // type: 'category',
        boundaryGap: false,
        data: newXAxis2,
        splitLine: {
          show: false,
        },
        offset: 10,
        axisTick: {
          show: false, // Hide the xAxis tick line
        },
        axisLine: {
          show: false, // Hide the xAxis line
        },
      },
    ],
    yAxis: {
      type: 'value',
      offset: 20,
      splitLine: {
        show: false,
      },
      // hide the yAxis line
      show: false,
    },
    series,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAfterPrint = (value) => {
    console.log('Print dialog closed trigged from button ?', value);
  };

  useEffect(() => {
    window.addEventListener('afterprint', handleAfterPrint);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const handlePrint = (value) => {
    // const elem = document.getElementById('componentB');

    const divElement = document.getElementById('componentB');

    html2canvas(divElement).then(function (canvas) {
      const imageData = canvas.toDataURL('image/png');

      const imgElement = document.createElement('img');
      imgElement.src = imageData;

      let printSection;

      printSection = document.createElement('div');
      printSection.id = 'printSection';
      document.body.appendChild(printSection);

      printSection.appendChild(imgElement);
      setTimeout(() => window.print(), 500);
    });
  };

  const [form] = Form.useForm();

  const [value, setValue] = useState(1);
  const [checked, setChecked] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const onChangeCheckBox = (e) => {
    setChecked(e.target.checked);
  };

  const params = series.map((item) => item.name);

  const calculations = ['<', '<=', '=', '!=', '>=', '>'];

  const calculations2 = ['AND', 'OR', '(', ')'];

  const onClickParams = (name, isParams) => {
    const currentValue = form.getFieldValue('search') ?? '';
    // const lastText = currentValue.split(' ')[currentValue.split(' ').length - 1];

    form.setFieldValue('search', currentValue ? `${currentValue} ${name}` : name);
  };

  const handleSearch = (va) => {
    // const chart = chartRef.current.getEchartsInstance();
    // const option = chart.getOption();

    // const updatedOptions = {
    //   ...option,
    //   series: series.map((item) => ({
    //     ...item,
    //     markLine: { itemStyle: { color: 'rgba(255, 173, 177, 0.4)' }, label: { formatter: '{b}' }, data: [{ xAxis: '21335-1' }] },
    //   })),
    // };

    // chart.setOption(updatedOptions);

    if (va) {
      setSeries((prev) =>
        prev.map((item) => ({
          ...item,
          markLine: { itemStyle: { color: 'rgba(255, 173, 177, 0.4)' }, label: { formatter: '{b}' }, data: [{ xAxis: '21335-1' }] },
          markArea: {},
        }))
      );
    } else {
      setSeries((prev) =>
        prev.map((item) => ({
          ...item,
          markLine: {},
          markArea: {
            itemStyle: {
              color: 'rgba(255, 173, 177, 0.4)',
            },
            data: [
              [
                {
                  xAxis: '22238-1',
                },
                {
                  xAxis: '22625-1',
                },
              ],
            ],
          },
        }))
      );
      //
    }

    setChartKey((prev) => prev + 1);
  };

  return (
    <div>
      <ReactEcharts option={options} style={{ height: 540, paddingLeft: 50 }} ref={chartRef} opts={{ renderer: 'svg' }} key={chartKey} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 200, marginTop: 50 }}>
        <Button type='primary' onClick={showModal}>
          Print
        </Button>

        <div style={{ display: 'flex', gap: 50 }}>
          <div style={{ display: 'flex', gap: 30, border: '1px solid black', flexDirection: 'column', padding: 10, borderRadius: 10 }}>
            {params.map((item) => (
              <div style={{ cursor: 'pointer' }} onClick={() => onClickParams(item)}>
                {item}
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              gap: 30,
              border: '1px solid black',
              flexDirection: 'column',
              padding: 10,
              borderRadius: 10,
              width: 300,
            }}
          >
            {isSearched ? (
              <div>
                <div onClick={() => setIsSearched(false)} style={{ cursor: 'pointer' }}>
                  Back
                </div>

                <div style={{ marginTop: 10 }}>Found Result</div>

                <div style={{ display: 'flex', gap: 10, flexDirection: 'column', marginTop: 20 }}>
                  <strong style={{ cursor: 'pointer' }} onClick={() => handleSearch(true)}>
                    21335-1
                  </strong>
                  <strong style={{ cursor: 'pointer' }} onClick={() => handleSearch(false)}>
                    From 22238-1 to 22625-1
                  </strong>
                </div>
              </div>
            ) : (
              <Form form={form} layout='vertical' autoComplete='off' onFinish={() => setIsSearched(true)}>
                <Form.Item name='search' label='Search Criteria'>
                  <Input.TextArea placeholder='Search Criteria' />
                </Form.Item>

                <Form.Item name='parameter' label='Parameters'>
                  <Select options={params.map((item) => ({ value: item, label: item }))} onChange={(va) => onClickParams(va)} />
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, width: 300 }}>
                  {calculations.map((item) => (
                    <div
                      style={{
                        height: 30,
                        width: 30,
                        border: '1px solid black',
                        borderRadius: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => onClickParams(item, true)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Form.Item name='value'>
                    <Input placeholder='Input value' />
                  </Form.Item>
                  <Button onClick={() => onClickParams(form.getFieldValue('value'))}>Add</Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, width: 300 }}>
                  {calculations2.map((item) => (
                    <div
                      style={{
                        height: 30,
                        width: 50,
                        border: '1px solid black',
                        borderRadius: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => onClickParams(item, true)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <Form.Item>
                  <Space>
                    <Button type='primary' htmlType='submit'>
                      Submit
                    </Button>

                    <Button type='primary' onClick={() => form.resetFields()}>
                      Reset
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      </div>

      <Modal title='Config Printing Area' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1300} okText='Print Option'>
        <div style={{ display: 'flex', height: 1300, gap: 300 }}>
          <Print />
          <div style={{ width: 500, paddingTop: 20 }}>
            <Form
              form={form}
              onFinish={handlePrint}
              initialValues={{
                printer: 'pdf',
                pageLayout: 'portrait',
                pageSize: 'A4',
              }}
            >
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <h2>Print Options</h2>
                  <h2 style={{ marginBottom: 20 }}>Printing Area</h2>
                  <Form.Item name='type'>
                    <Radio.Group onChange={onChange} value={value}>
                      <Space direction='vertical'>
                        <Radio value={1}>Selected Area</Radio>
                        <Radio value={2}>
                          Range of Frame
                          {/* {value === 2 ? (
                            <div style={{ display: 'flex', gap: 20 }}>
                              <div>
                                Start: <Input style={{ width: 100, marginLeft: 10 }} />
                              </div>
                              <div>
                                End: <Input style={{ width: 100, marginLeft: 10 }} />
                              </div>
                            </div>
                          ) : null} */}
                        </Radio>

                        <Radio value={3}>Frames on Screen</Radio>
                        <Radio value={4}>All frames</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  <h2 style={{ marginBottom: 20 }}>Printing Area</h2>
                  <Checkbox value={checked} onChange={onChangeCheckBox}>
                    Override Auto Trance Scaling
                  </Checkbox>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 10 }}>
                    <Input style={{ width: 200 }} disabled={!checked} />
                    Page
                  </div>

                  <h3 style={{ position: 'absolute', bottom: 50, right: 20 }}>
                    Note: Ensure a perfect printout by choosing the correct printing area. Take a moment to verify before you proceed!
                  </h3>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
