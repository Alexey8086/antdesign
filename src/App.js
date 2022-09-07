import React, {useEffect, useState} from "react"
import "./App.css"
import { Table } from "antd"
import "antd/dist/antd.css"
import {getData} from './utils/getData'
import {columnsConfig} from './utils/columns'
import ReactDragListView from 'react-drag-listview'

const App = () => { 
const [datastate, setData] = useState([])
const [columns, setColomns] = useState(columnsConfig)
const [limit, setLimit] = useState(100)
const [offset, setOffset] = useState(0)





const dragProps = {

  onDragEnd(fromIndex, toIndex) {
      const customColumns = [...columns];
      const item = customColumns.splice(fromIndex, 1)[0]
      customColumns.splice(toIndex, 0, item)
      setColomns(customColumns)
  },
  nodeSelector: "th"
}


useEffect(() => {

  const func = async () => {
    const {data} = await getData(limit, offset)
    console.log('DATA ----p>>>', data.data)

    const formatedData = data.data.map((item) => {
      return {
        name: item.name,
        brand: item.brand.name,
        revenue: item.revenue,
        revenue_period: item.revenue_period,
        price: item.price,
        seller: item.seller.name,
        stoks: item.stocks
      }
    })

    const arr = formatedData.concat(datastate)
    setData(arr)
  }

  func()

}, [offset])


// useEffect(()=> {
//   const pagItem = document.querySelectorAll('.ant-pagination-item')
//   console.log('$$$$$$$$', pagItem)

//   pagItem[0].addEventListener('click', ()=> {
//   console.log('It is work !')
// })
//   console.log('$$$$$$$$')
// }, [])

let count = 0

const onChangeHandler = () => {
  const pagItem = document.querySelectorAll('.ant-pagination-item')
  count = count + limit

  console.log('$$$$$$$$', pagItem)

  pagItem[pagItem.length-1].addEventListener('click', () => {
    console.log('ITs work !!!!!!!!!!!!!!!!!!!!!11')
    setOffset(offset+100)
  })

  pagItem[pagItem.length-2].addEventListener('click', () => {
    console.log('ITs work !!!!!!!!!!!!!!!!!!!!!11')
    setOffset(offset+100)
  })


  
}

const onSizeHandler = () => {
}

return ( 
  <> 
    <div className="app"> 
      <div className="table">
      <ReactDragListView.DragColumn {...dragProps}>
      <Table
          dataSource={datastate}
          columns={columns}
          pagination={true}
          onChange={onChangeHandler}
          onShowSizeChange={onSizeHandler}
          bordered
        />
      </ReactDragListView.DragColumn>
      </div>
    </div> 

  </> 
)
} 

export default App