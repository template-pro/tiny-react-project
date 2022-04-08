import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, DatePicker, type DatePickerProps } from 'antd'
import React from 'react'
import moment, { HTML5_FMT, type Moment } from 'moment'

const CoumstomDatePicker: React.FC<DatePickerProps> = (props) => {
  const { onChange, value, defaultValue, children, open, ...restProps } = props
  const container = React.useRef<HTMLDivElement>(null)
  const isControlled = value !== undefined
  const [stateValue, setStateValue] = React.useState(isControlled ? value : defaultValue)
  const resultValue = isControlled ? value : stateValue

  const [visable, setVisable] = React.useState(open)

  const childrenNode = (function() {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick() {
          setVisable(prev => !prev)
        },
      })
    }
  }())

  function handleChange(value: Moment | null, dateString: string): void {
    setStateValue(value)
    onChange && onChange(value, dateString)
    setVisable(false)
  }

  return (
    <div
      className="flex items-center"
      ref={container}
    >
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={() => {
          const date = moment(resultValue).subtract(1, 'month')
          handleChange(date, date.format(HTML5_FMT.MONTH),
          )
        }}
      />
      {childrenNode}
      <DatePicker
        value={resultValue}
        style={childrenNode ? { position: 'absolute', zIndex: -1, opacity: 0 } : {}}
        open={visable}
        onChange={handleChange}
        getPopupContainer={node => container.current || node}
        {...restProps}
        picker="month"
      />
      <Button
        shape="circle"
        icon={<RightOutlined />}
        onClick={() => {
          const date = moment(resultValue).add(1, 'month')
          handleChange(date, date.format(HTML5_FMT.MONTH))
        }}
      />
    </div>
  )
}

const Dashboard: React.FC = () => {
  const [date, setDate] = React.useState(moment())
  return (
    <>
      <CoumstomDatePicker
        onChange={(value, dateString) => {
          window.console.log({ value, dateString })
          value && setDate(value)
        }}
      >
        <p>{moment(date).format(HTML5_FMT.DATE)}</p>
      </CoumstomDatePicker>
    </>
  )
}

Dashboard.displayName = 'Dashboard'

export default Dashboard
